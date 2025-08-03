'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './Dashboard.module.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SessionData {
  session_id: string;
  os: string;
  browser: string;
  current_step: number;
  highest_step_reached: number;
  is_completed: boolean;
  errors: any[];
  created_at: string;
  total_time_seconds: number;
}

interface TodayMetrics {
  total_sessions: number;
  completed_sessions: number;
  completion_rate: number;
  avg_completion_minutes: number;
  immediate_bounces: number;
}

interface StepFunnel {
  step: number;
  users_reached: number;
  dropped_off: number;
  dropout_rate: number;
}

interface OSPerformance {
  os: string;
  total_attempts: number;
  completions: number;
  success_rate: number;
  avg_time_minutes: number;
}

interface PagePerformance {
  page_path: string;
  unique_sessions: number;
  total_views: number;
  avg_time_seconds: number;
  bounce_count: number;
}

interface ButtonUsage {
  button_category: string;
  button_name: string;
  click_count: number;
}

interface FeedbackSummary {
  total_feedback: number;
  avg_score: number;
  positive_count: number;
  negative_count: number;
  with_text_count: number;
  satisfaction_rate: number;
}

interface FeedbackByEmoji {
  emoji: string;
  count: number;
  avg_completion_time: number;
}

interface ActualGuideTime {
  session_id: string;
  os: string;
  browser: string;
  actual_minutes: number;
  recorded_minutes: number;
}

interface StepDurationAnalysis {
  step_number: number;
  sessions_count: number;
  avg_minutes_on_step: number;
  min_minutes: number;
  max_minutes: number;
}

interface OverallGuideStats {
  total_sessions: number;
  completed_sessions: number;
  completion_rate: number;
  avg_completion_minutes_actual: number;
  avg_completion_minutes_session: number;
  completed_with_click_data: number;
}

interface StepErrorRate {
  step_number: number;
  total_attempts: number;
  error_sessions: number;
  completed_sessions: number;
  error_rate: number;
  success_rate: number;
}

interface HourlyActivity {
  hour_of_day: number;
  total_sessions: number;
  completed_sessions: number;
  completion_rate: number;
}

interface DailyActivity {
  day_name: string;
  day_of_week: number;
  total_sessions: number;
  completed_sessions: number;
  completion_rate: number;
}


export default function DashboardPage() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayMetrics, setTodayMetrics] = useState<TodayMetrics | null>(null);
  const [stepFunnel, setStepFunnel] = useState<StepFunnel[]>([]);
  const [osPerformance, setOSPerformance] = useState<OSPerformance[]>([]);
  const [pagePerformance, setPagePerformance] = useState<PagePerformance[]>([]);
  const [buttonUsage, setButtonUsage] = useState<ButtonUsage[]>([]);
  const [feedbackSummary, setFeedbackSummary] = useState<FeedbackSummary | null>(null);
  const [feedbackByEmoji, setFeedbackByEmoji] = useState<FeedbackByEmoji[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRealtime, setIsRealtime] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    startedGuide: 0,
    reachedStep1: 0,
    reachedStep2: 0,
    reachedStep3: 0,
    reachedStep4: 0,
    reachedStep5: 0,
    reachedStep6: 0,
    completedSessions: 0,
    completionRate: 0,
    avgCompletionTime: 0,
    errorRate: 0
  });
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [actualGuideTimes, setActualGuideTimes] = useState<ActualGuideTime[]>([]);
  const [stepDurations, setStepDurations] = useState<StepDurationAnalysis[]>([]);
  const [overallStats, setOverallStats] = useState<OverallGuideStats | null>(null);
  const [stepErrorRates, setStepErrorRates] = useState<StepErrorRate[]>([]);
  const [hourlyActivity, setHourlyActivity] = useState<HourlyActivity[]>([]);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);

  useEffect(() => {
    const initializeDashboard = async () => {
      await fetchAllData();
      setLoading(false);
    };
    
    initializeDashboard();
    
    // Supabase Realtime 구독 설정
    const channel = supabase.channel('dashboard-updates');
    
    // guide_sessions 테이블 변경 감지
    channel
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'guide_sessions' 
        },
        (payload) => {
          // 새로운 세션이나 완료 시 데이터 새로고침
          fetchSessions();
          fetchTodayMetrics();
          fetchStepFunnel();
          fetchOSPerformance();
          setLastUpdate(new Date());
          setIsRealtime(true);
          setTimeout(() => setIsRealtime(false), 3000);
        }
      )
      // user_feedback 테이블 변경 감지
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_feedback' 
        },
        (payload) => {
          fetchFeedbackSummary();
          fetchFeedbackByEmoji();
        }
      )
      // page_analytics 테이블 변경 감지
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'page_analytics' 
        },
        (payload) => {
          fetchPagePerformance();
        }
      )
      // user_events 테이블 변경 감지 (버튼 클릭)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_events' 
        },
        (payload) => {
          if (payload.new && (payload.new as any).event_type === 'button_click') {
            fetchButtonUsage();
          }
        }
      )
      .subscribe();
    
    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchSessions(),
      fetchTodayMetrics(),
      fetchStepFunnel(),
      fetchOSPerformance(),
      fetchPagePerformance(),
      fetchButtonUsage(),
      fetchFeedbackSummary(),
      fetchFeedbackByEmoji(),
      fetchTotalVisitors(),
      fetchActualGuideTimes(),
      fetchStepDurations(),
      fetchOverallStats(),
      fetchStepErrorRates(),
      fetchHourlyActivity(),
      fetchDailyActivity()
    ]);
  };

  const fetchSessions = async () => {
    try {
      // Fetch recent sessions for display (limited to 15)
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('guide_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(15);

      if (sessionsError) throw sessionsError;

      setSessions(sessionsData || []);
      
      // Fetch all sessions for statistics (no limit)
      const { data: allSessionsData, error: statsError } = await supabase
        .from('guide_sessions')
        .select('*');
        
      if (statsError) throw statsError;
      
      // 통계 계산
      if (allSessionsData && allSessionsData.length > 0) {
        const completed = allSessionsData.filter(s => s.is_completed);
        // errors는 JSON 문자열로 저장되므로, 실제 에러가 있는지 확인
        const withErrors = allSessionsData.filter(s => {
          if (!s.errors) return false;
          try {
            const errors = typeof s.errors === 'string' ? JSON.parse(s.errors) : s.errors;
            return Array.isArray(errors) && errors.length > 0;
          } catch {
            return false;
          }
        });
        
        // 단계별 도달 인원 계산
        const reachedStep1 = allSessionsData.filter(s => s.highest_step_reached >= 1).length;
        const reachedStep2 = allSessionsData.filter(s => s.highest_step_reached >= 2).length;
        const reachedStep3 = allSessionsData.filter(s => s.highest_step_reached >= 3).length;
        const reachedStep4 = allSessionsData.filter(s => s.highest_step_reached >= 4).length;
        const reachedStep5 = allSessionsData.filter(s => s.highest_step_reached >= 5).length;
        const reachedStep6 = allSessionsData.filter(s => s.highest_step_reached >= 6).length;
        
        setStats({
          totalSessions: allSessionsData.length,
          startedGuide: reachedStep1,
          reachedStep1,
          reachedStep2,
          reachedStep3,
          reachedStep4,
          reachedStep5,
          reachedStep6,
          completedSessions: completed.length,
          completionRate: (completed.length / allSessionsData.length) * 100,
          avgCompletionTime: completed.length > 0 
            ? completed.reduce((sum, s) => sum + (s.total_time_seconds || 0), 0) / completed.length / 60
            : 0,
          errorRate: (withErrors.length / allSessionsData.length) * 100
        });
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchTodayMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('today_metrics')
        .select('*')
        .single();

      if (error) throw error;
      setTodayMetrics(data);
    } catch (error) {
      console.error('Error fetching today metrics:', error);
    }
  };

  const fetchStepFunnel = async () => {
    try {
      const { data, error } = await supabase
        .from('step_funnel')
        .select('*');

      if (error) throw error;
      setStepFunnel(data || []);
    } catch (error) {
      console.error('Error fetching step funnel:', error);
    }
  };

  const fetchOSPerformance = async () => {
    try {
      const { data, error } = await supabase
        .from('os_performance')
        .select('*');

      if (error) throw error;
      setOSPerformance(data || []);
    } catch (error) {
      console.error('Error fetching OS performance:', error);
      setOSPerformance([]); // 기본값 설정
    }
  };

  const fetchPagePerformance = async () => {
    try {
      const { data, error } = await supabase
        .from('page_performance')
        .select('*');

      if (error) throw error;
      console.log('Page performance data:', data); // 임시 디버깅
      setPagePerformance(data || []);
    } catch (error) {
      console.error('Error fetching page performance:', error);
      setPagePerformance([]); // 기본값 설정
    }
  };

  const fetchButtonUsage = async () => {
    try {
      const { data, error } = await supabase
        .from('button_usage')
        .select('*');

      if (error) throw error;
      setButtonUsage(data || []);
    } catch (error) {
      console.error('Error fetching button usage:', error);
    }
  };

  const fetchFeedbackSummary = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_summary')
        .select('*')
        .single();

      if (error) throw error;
      setFeedbackSummary(data);
    } catch (error) {
      console.error('Error fetching feedback summary:', error);
    }
  };

  const fetchFeedbackByEmoji = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_by_emoji')
        .select('*');

      if (error) throw error;
      setFeedbackByEmoji(data || []);
    } catch (error) {
      console.error('Error fetching feedback by emoji:', error);
    }
  };

  const fetchTotalVisitors = async () => {
    try {
      const { data, error } = await supabase
        .from('counters')
        .select('value')
        .eq('name', 'visitors')
        .single();

      if (error) throw error;
      const count = data?.value ? parseInt(data.value) : 0;
      setTotalVisitors(count);
    } catch (error) {
      console.error('Error fetching total visitors:', error);
      // 기본값 설정하지 않음 (0이 적절함)
    }
  };

  const fetchActualGuideTimes = async () => {
    try {
      const { data, error } = await supabase
        .from('actual_guide_times')
        .select('*')
        .order('actual_minutes', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActualGuideTimes(data || []);
    } catch (error) {
      console.error('Error fetching actual guide times:', error);
      setActualGuideTimes([]);
    }
  };

  const fetchStepDurations = async () => {
    try {
      const { data, error } = await supabase
        .from('step_duration_analysis')
        .select('*');

      if (error) throw error;
      setStepDurations(data || []);
    } catch (error) {
      console.error('Error fetching step durations:', error);
      setStepDurations([]);
    }
  };

  const fetchOverallStats = async () => {
    try {
      const { data, error } = await supabase
        .from('overall_guide_stats')
        .select('*')
        .single();

      if (error) throw error;
      setOverallStats(data);
    } catch (error) {
      console.error('Error fetching overall stats:', error);
      setOverallStats(null);
    }
  };

  const fetchStepErrorRates = async () => {
    try {
      const { data, error } = await supabase
        .from('step_error_rates')
        .select('*');

      if (error) throw error;
      setStepErrorRates(data || []);
    } catch (error) {
      console.error('Error fetching step error rates:', error);
      setStepErrorRates([]);
    }
  };

  const fetchHourlyActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('hourly_activity')
        .select('*');

      if (error) throw error;
      setHourlyActivity(data || []);
    } catch (error) {
      console.error('Error fetching hourly activity:', error);
      setHourlyActivity([]);
    }
  };

  const fetchDailyActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_activity')
        .select('*');

      if (error) throw error;
      setDailyActivity(data || []);
    } catch (error) {
      console.error('Error fetching daily activity:', error);
      setDailyActivity([]);
    }
  };

  if (loading) {
    return <div className={styles.loadingContainer}>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>대시보드</h1>
        <div className={styles.headerRight}>
          <div className={styles.totalVisitors}>
            <span className={styles.visitorLabel}>전체 방문자</span>
            <span className={styles.visitorCount}>{totalVisitors.toLocaleString()}</span>
          </div>
          {isRealtime && (
            <span className={styles.realtimeIndicator}>
              🔄 실시간 업데이트
            </span>
          )}
          <span className={styles.lastUpdate}>
            마지막 업데이트: {lastUpdate.toLocaleTimeString('ko-KR')}
          </span>
        </div>
      </div>
      
      {todayMetrics && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>오늘의 지표</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3>가이드 페이지 방문</h3>
              <p className={styles.metricValue}>{todayMetrics.total_sessions}명</p>
            </div>
            <div className={styles.metricCard}>
              <h3>가이드 시작한 사람</h3>
              <p className={styles.metricValue}>{(todayMetrics.total_sessions - todayMetrics.immediate_bounces) || 0}명</p>
              <p className={styles.metricSubtext}>1단계 이상 진행</p>
            </div>
            <div className={styles.metricCard}>
              <h3>가이드 완료자 수</h3>
              <p className={styles.metricValue}>{todayMetrics.completed_sessions || 0}명</p>
            </div>
            <div className={styles.metricCard}>
              <h3>가이드 완료율</h3>
              <p className={styles.metricValue}>{todayMetrics.completion_rate}%</p>
              <p className={styles.metricSubtext}>가이드 페이지 방문자 대비</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>전체 통계</h2>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <h3>가이드 페이지 방문</h3>
            <p className={styles.metricValue}>{overallStats?.total_sessions || stats.totalSessions}명</p>
            <p className={styles.metricSubtext}>전체 사이트 방문자 {totalVisitors}명 중</p>
          </div>
          <div className={styles.metricCard}>
            <h3>가이드 시작</h3>
            <p className={styles.metricValue}>{stats.startedGuide}명</p>
            <p className={styles.metricSubtext}>1단계 이상 진행</p>
          </div>
          <div className={styles.metricCard}>
            <h3>가이드 완료</h3>
            <p className={styles.metricValue}>{overallStats?.completed_sessions || stats.completedSessions}명</p>
            <p className={styles.metricSubtext}>완료율 {overallStats?.completion_rate?.toFixed(1) || stats.completionRate.toFixed(1)}%</p>
            <p className={styles.metricSubtext}>가이드 페이지 방문자 대비</p>
          </div>
          <div className={styles.metricCard}>
            <h3>평균 완료 시간</h3>
            <p className={styles.metricValue}>
              {overallStats?.avg_completion_minutes_actual?.toFixed(1) || stats.avgCompletionTime.toFixed(1)}분
            </p>
            {overallStats && overallStats.completed_with_click_data > 0 && (
              <p className={styles.metricSubtext}>
                버튼 클릭 기준 ({overallStats.completed_with_click_data}개 세션)
              </p>
            )}
          </div>
          <div className={styles.metricCard}>
            <h3>에러율</h3>
            <p className={styles.metricValue}>{stats.errorRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>단계별 진행 현황</h2>
        <div className={styles.funnelGrid}>
          <div className={styles.funnelStep}>
            <h4>1단계</h4>
            <p className={styles.funnelValue}>{stats.reachedStep1}명</p>
            <p className={styles.funnelPercent}>
              {stats.totalSessions > 0 ? ((stats.reachedStep1 / stats.totalSessions) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>방문자 대비</p>
          </div>
          <div className={styles.funnelStep}>
            <h4>2단계</h4>
            <p className={styles.funnelValue}>{stats.reachedStep2}명</p>
            <p className={styles.funnelPercent}>
              {stats.reachedStep1 > 0 ? ((stats.reachedStep2 / stats.reachedStep1) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>가이드 시작자 대비</p>
          </div>
          <div className={styles.funnelStep}>
            <h4>3단계</h4>
            <p className={styles.funnelValue}>{stats.reachedStep3}명</p>
            <p className={styles.funnelPercent}>
              {stats.reachedStep1 > 0 ? ((stats.reachedStep3 / stats.reachedStep1) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>가이드 시작자 대비</p>
          </div>
          <div className={styles.funnelStep}>
            <h4>4단계</h4>
            <p className={styles.funnelValue}>{stats.reachedStep4}명</p>
            <p className={styles.funnelPercent}>
              {stats.reachedStep1 > 0 ? ((stats.reachedStep4 / stats.reachedStep1) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>가이드 시작자 대비</p>
          </div>
          <div className={styles.funnelStep}>
            <h4>5단계</h4>
            <p className={styles.funnelValue}>{stats.reachedStep5}명</p>
            <p className={styles.funnelPercent}>
              {stats.reachedStep1 > 0 ? ((stats.reachedStep5 / stats.reachedStep1) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>가이드 시작자 대비</p>
          </div>
          <div className={styles.funnelStep}>
            <h4>6단계 (완료)</h4>
            <p className={styles.funnelValue}>{stats.reachedStep6}명</p>
            <p className={styles.funnelPercent}>
              {stats.reachedStep1 > 0 ? ((stats.reachedStep6 / stats.reachedStep1) * 100).toFixed(1) : 0}%
            </p>
            <p className={styles.funnelDescription}>가이드 시작자 대비</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>단계별 실제 소요 시간 (버튼 클릭 기준)</h2>
        {stepDurations.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>단계</th>
                <th>분석 세션 수</th>
                <th>평균 소요시간</th>
                <th>최소 시간</th>
                <th>최대 시간</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {stepDurations.map((step) => (
                <tr key={step.step_number} className={styles.tableRow}>
                  <td className={styles.tableCell}>단계 {step.step_number}</td>
                  <td className={styles.tableCell}>{step.sessions_count}</td>
                  <td className={styles.tableCell}>{step.avg_minutes_on_step?.toFixed(1) || '-'}분</td>
                  <td className={styles.tableCell}>{step.min_minutes?.toFixed(1) || '-'}분</td>
                  <td className={styles.tableCell}>{step.max_minutes?.toFixed(1) || '-'}분</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>아직 단계별 클릭 데이터가 없습니다. 가이드를 진행하면 데이터가 표시됩니다.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>실제 가이드 수행 시간 (1단계 완료 ~ 6단계 완료)</h2>
        {actualGuideTimes.length > 0 ? (
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <h3>평균 실제 시간</h3>
              <p className={styles.metricValue}>
                {actualGuideTimes.length > 0 
                  ? (actualGuideTimes.reduce((sum, t) => sum + t.actual_minutes, 0) / actualGuideTimes.length).toFixed(1)
                  : '-'}분
              </p>
              <p className={styles.metricSubtext}>버튼 클릭 기준</p>
            </div>
            <div className={styles.metricCard}>
              <h3>기록된 평균 시간</h3>
              <p className={styles.metricValue}>
                {actualGuideTimes.length > 0 
                  ? (actualGuideTimes.reduce((sum, t) => sum + t.recorded_minutes, 0) / actualGuideTimes.length).toFixed(1)
                  : '-'}분
              </p>
              <p className={styles.metricSubtext}>세션 시간 기준</p>
            </div>
          </div>
        ) : (
          <p className={styles.noData}>아직 실제 수행 시간 데이터가 없습니다. 가이드를 완료하면 데이터가 표시됩니다.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>시간대별 활동 분석 (최근 30일)</h2>
        {hourlyActivity.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>시간대</th>
                <th>방문자 수</th>
                <th>완료자 수</th>
                <th>완료율</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {hourlyActivity.map((hour) => (
                <tr key={hour.hour_of_day} className={styles.tableRow}>
                  <td className={styles.tableCell}>{hour.hour_of_day}시</td>
                  <td className={styles.tableCell}>{hour.total_sessions}명</td>
                  <td className={styles.tableCell}>{hour.completed_sessions}명</td>
                  <td className={styles.tableCell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '10px', 
                        backgroundColor: '#ecf0f1',
                        borderRadius: '5px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${hour.completion_rate || 0}%`,
                          height: '100%',
                          backgroundColor: '#27ae60'
                        }} />
                      </div>
                      <span>{hour.completion_rate || 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>시간대별 활동 데이터가 없습니다.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>요일별 활동 분석 (최근 30일)</h2>
        {dailyActivity.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>요일</th>
                <th>방문자 수</th>
                <th>완료자 수</th>
                <th>완료율</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {dailyActivity.map((day) => (
                <tr key={day.day_of_week} className={styles.tableRow}>
                  <td className={styles.tableCell}>{day.day_name}</td>
                  <td className={styles.tableCell}>{day.total_sessions}명</td>
                  <td className={styles.tableCell}>{day.completed_sessions}명</td>
                  <td className={styles.tableCell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '60px', 
                        height: '10px', 
                        backgroundColor: '#ecf0f1',
                        borderRadius: '5px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${day.completion_rate || 0}%`,
                          height: '100%',
                          backgroundColor: '#27ae60'
                        }} />
                      </div>
                      <span>{day.completion_rate || 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>요일별 활동 데이터가 없습니다.</p>
        )}
      </div>

      {osPerformance.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>OS별 성능</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>OS</th>
                <th>시도</th>
                <th>완료</th>
                <th>성공률</th>
                <th>평균 시간</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {osPerformance.map((os) => (
                <tr key={os.os} className={styles.tableRow}>
                  <td className={styles.tableCell}>{os.os}</td>
                  <td className={styles.tableCell}>{os.total_attempts}</td>
                  <td className={styles.tableCell}>{os.completions}</td>
                  <td className={styles.tableCell}>{os.success_rate}%</td>
                  <td className={styles.tableCell}>{os.avg_time_minutes?.toFixed(1) || '-'}분</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagePerformance.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>페이지별 성과</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>페이지</th>
                <th>고유 세션</th>
                <th>총 조회수</th>
                <th>평균 체류시간</th>
                <th>이탈 수</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {pagePerformance.map((page) => (
                <tr key={page.page_path} className={styles.tableRow}>
                  <td className={styles.tableCell}>{page.page_path}</td>
                  <td className={styles.tableCell}>{page.unique_sessions}</td>
                  <td className={styles.tableCell}>{page.total_views}</td>
                  <td className={styles.tableCell}>
                    {page.avg_time_seconds ? `${Math.round(page.avg_time_seconds)}초` : '-'}
                  </td>
                  <td className={styles.tableCell}>{page.bounce_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {buttonUsage.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>버튼 활용도 TOP 10</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>카테고리</th>
                <th>버튼 이름</th>
                <th>클릭 수</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {buttonUsage.slice(0, 10).map((button, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{button.button_category || '-'}</td>
                  <td className={styles.tableCell}>{button.button_name}</td>
                  <td className={styles.tableCell}>{button.click_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {feedbackSummary && (
        <div style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>사용자 만족도</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3>전체 피드백</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.total_feedback}</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3>평균 점수</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.avg_score?.toFixed(1) || 0}/5</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3>만족도</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.satisfaction_rate}%</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3>긍정적 피드백</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.positive_count}</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3>텍스트 포함</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.with_text_count}</p>
            </div>
          </div>
        </div>
      )}

      {feedbackByEmoji.length > 0 && (
        <div style={{ marginBottom: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>이모지별 피드백 분포</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
            {feedbackByEmoji.map((feedback) => (
              <div key={feedback.emoji} style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>
                  {feedback.emoji === 'love' && '😍'}
                  {feedback.emoji === 'good' && '😊'}
                  {feedback.emoji === 'neutral' && '😐'}
                  {feedback.emoji === 'sad' && '😢'}
                </div>
                <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>{feedback.count}명</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                  평균 {feedback.avg_completion_time?.toFixed(1) || 0}분
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stepErrorRates.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>단계별 에러 분석</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>단계</th>
                <th>시도</th>
                <th>에러 발생</th>
                <th>완료</th>
                <th>에러율</th>
                <th>성공률</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {stepErrorRates.map((step) => (
                <tr key={step.step_number} className={styles.tableRow}>
                  <td className={styles.tableCell}>단계 {step.step_number}</td>
                  <td className={styles.tableCell}>{step.total_attempts || 0}</td>
                  <td className={styles.tableCell}>
                    {step.error_sessions || 0}
                    {step.error_sessions > 0 && (
                      <span style={{ color: '#e74c3c', marginLeft: '5px' }}>
                        ({step.error_rate || 0}%)
                      </span>
                    )}
                  </td>
                  <td className={styles.tableCell}>
                    {step.completed_sessions || 0}
                    {step.completed_sessions > 0 && (
                      <span style={{ color: '#27ae60', marginLeft: '5px' }}>
                        ({step.success_rate || 0}%)
                      </span>
                    )}
                  </td>
                  <td className={styles.tableCell}>
                    <div style={{ 
                      width: '100px', 
                      height: '20px', 
                      backgroundColor: '#ecf0f1',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${step.error_rate || 0}%`,
                        height: '100%',
                        backgroundColor: '#e74c3c',
                        position: 'absolute',
                        left: 0
                      }} />
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div style={{ 
                      width: '100px', 
                      height: '20px', 
                      backgroundColor: '#ecf0f1',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${step.success_rate || 0}%`,
                        height: '100%',
                        backgroundColor: '#27ae60',
                        position: 'absolute',
                        left: 0
                      }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className={styles.insightBox} style={{ 
            marginTop: '1.5rem', 
            padding: '1.5rem', 
            backgroundColor: '#f0f8ff', 
            borderRadius: '8px', 
            border: '1px solid #d0e5ff' 
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#0066cc' }}>💡 에러 분석 인사이트</h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {stepErrorRates.filter(s => s.error_rate > 10).map(step => (
                <li key={step.step_number}>
                  <strong>단계 {step.step_number}</strong>: 에러율 {step.error_rate}% - 
                  {step.step_number === 2 && " Homebrew/Git 설치 가이드 강화 필요"}
                  {step.step_number === 3 && " Node.js 버전 호환성 체크 필요"}
                  {step.step_number === 4 && " Claude Code 설치 명령어 개선 필요"}
                  {step.step_number === 5 && " 인증 프로세스 설명 보강 필요"}
                  {step.step_number === 6 && " 첫 프로젝트 생성 예제 추가 필요"}
                </li>
              ))}
              <li>에러 발생 후 평균 해결 시간 분석으로 트러블슈팅 가이드 개선 가능</li>
            </ul>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>최근 세션 (최근 15개)</h2>
        <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>시간</th>
              <th>OS</th>
              <th>브라우저</th>
              <th>현재 단계</th>
              <th>최고 단계</th>
              <th>완료</th>
              <th>에러</th>
              <th>소요 시간</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {sessions.map((session) => (
              <tr key={session.session_id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  {new Date(session.created_at).toLocaleString('ko-KR')}
                </td>
                <td className={styles.tableCell}>{session.os}</td>
                <td className={styles.tableCell}>{session.browser}</td>
                <td className={styles.tableCell}>{session.current_step || 0}</td>
                <td className={styles.tableCell}>{session.highest_step_reached || 0}</td>
                <td className={styles.tableCell}>
                  {session.is_completed ? '✅' : '❌'}
                </td>
                <td className={styles.tableCell}>
                  {session.errors && session.errors.length > 0 ? `⚠️ ${session.errors.length}` : '-'}
                </td>
                <td className={styles.tableCell}>
                  {session.total_time_seconds 
                    ? `${Math.round(session.total_time_seconds / 60)}분`
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </>
  );
}