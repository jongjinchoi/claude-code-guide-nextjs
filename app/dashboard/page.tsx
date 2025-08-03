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
  completions: number;
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
    completedSessions: 0,
    completionRate: 0,
    avgCompletionTime: 0,
    errorRate: 0
  });
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

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
      fetchTotalVisitors()
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
        
        setStats({
          totalSessions: allSessionsData.length,
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

  if (loading) {
    return <div className={styles.loadingContainer}>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>가이드 추적 대시보드</h1>
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
              <h3>오늘 세션</h3>
              <p className={styles.metricValue}>{todayMetrics.total_sessions}</p>
            </div>
            <div className={styles.metricCard}>
              <h3>오늘 완료</h3>
              <p className={styles.metricValue}>{todayMetrics.completions}</p>
            </div>
            <div className={styles.metricCard}>
              <h3>오늘 완료율</h3>
              <p className={styles.metricValue}>{todayMetrics.completion_rate}%</p>
            </div>
            <div className={styles.metricCard}>
              <h3>평균 소요시간</h3>
              <p className={styles.metricValue}>{todayMetrics.avg_completion_minutes?.toFixed(1) || 0}분</p>
            </div>
            <div className={styles.metricCard}>
              <h3>즉시 이탈</h3>
              <p className={styles.metricValue}>{todayMetrics.immediate_bounces}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>전체 통계</h2>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <h3>가이드 시작한 사람</h3>
            <p className={styles.metricValue}>{stats.totalSessions}</p>
          </div>
          <div className={styles.metricCard}>
            <h3>가이드 완료한 사람</h3>
            <p className={styles.metricValue}>{stats.completedSessions}</p>
          </div>
          <div className={styles.metricCard}>
            <h3>완료율</h3>
            <p className={styles.metricValue}>{stats.completionRate.toFixed(1)}%</p>
          </div>
          <div className={styles.metricCard}>
            <h3>평균 완료 시간</h3>
            <p className={styles.metricValue}>{stats.avgCompletionTime.toFixed(1)}분</p>
          </div>
          <div className={styles.metricCard}>
            <h3>에러율</h3>
            <p className={styles.metricValue}>{stats.errorRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {stepFunnel.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>단계별 퍼널 (최근 7일)</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>단계</th>
                <th>도달 사용자</th>
                <th>이탈자</th>
                <th>이탈률</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {stepFunnel.map((step) => (
                <tr key={step.step} className={styles.tableRow}>
                  <td className={styles.tableCell}>단계 {step.step}</td>
                  <td className={styles.tableCell}>{step.users_reached}</td>
                  <td className={styles.tableCell}>{step.dropped_off || '-'}</td>
                  <td className={styles.tableCell}>{step.dropout_rate || '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {osPerformance.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>OS별 성능 (최근 7일)</h2>
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
          <h2 className={styles.sectionTitle}>페이지별 성과 (최근 7일)</h2>
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
          <h2 className={styles.sectionTitle}>버튼 활용도 TOP 10 (최근 7일)</h2>
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
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>사용자 만족도 (최근 7일)</h2>
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