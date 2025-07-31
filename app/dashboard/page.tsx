'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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

  useEffect(() => {
    fetchAllData();
    
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
          console.log('Guide session 변경:', payload);
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
          console.log('새 피드백:', payload);
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
          console.log('새 페이지뷰:', payload);
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
          console.log('새 이벤트:', payload);
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
      fetchFeedbackByEmoji()
    ]);
  };

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('guide_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setSessions(data || []);
      
      // 통계 계산
      if (data && data.length > 0) {
        const completed = data.filter(s => s.is_completed);
        const withErrors = data.filter(s => s.errors && s.errors.length > 0);
        
        setStats({
          totalSessions: data.length,
          completedSessions: completed.length,
          completionRate: (completed.length / data.length) * 100,
          avgCompletionTime: completed.length > 0 
            ? completed.reduce((sum, s) => sum + (s.total_time_seconds || 0), 0) / completed.length / 60
            : 0,
          errorRate: (withErrors.length / data.length) * 100
        });
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
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
    }
  };

  const fetchPagePerformance = async () => {
    try {
      const { data, error } = await supabase
        .from('page_performance')
        .select('*');

      if (error) throw error;
      setPagePerformance(data || []);
    } catch (error) {
      console.error('Error fetching page performance:', error);
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

  if (loading) {
    return <div className="container">로딩 중...</div>;
  }

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
      <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>가이드 추적 대시보드</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isRealtime && (
            <span style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '4px',
              fontSize: '0.875rem',
              animation: 'pulse 1s ease-in-out'
            }}>
              🔄 실시간 업데이트
            </span>
          )}
          <span style={{ color: '#666', fontSize: '0.875rem' }}>
            마지막 업데이트: {lastUpdate.toLocaleTimeString('ko-KR')}
          </span>
        </div>
      </div>
      
      {todayMetrics && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>오늘의 지표</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>오늘 세션</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{todayMetrics.total_sessions}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>오늘 완료</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{todayMetrics.completions}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>오늘 완료율</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{todayMetrics.completion_rate}%</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>평균 소요시간</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{todayMetrics.avg_completion_minutes?.toFixed(1) || 0}분</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>즉시 이탈</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{todayMetrics.immediate_bounces}</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h2>전체 통계</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>총 세션</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{stats.totalSessions}</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>완료된 세션</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{stats.completedSessions}</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>완료율</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{stats.completionRate.toFixed(1)}%</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>평균 완료 시간</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{stats.avgCompletionTime.toFixed(1)}분</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>에러율</h3>
            <p style={{ fontSize: '2rem', margin: 0 }}>{stats.errorRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {stepFunnel.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>단계별 퍼널 (최근 7일)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>단계</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>도달 사용자</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>이탈자</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>이탈률</th>
              </tr>
            </thead>
            <tbody>
              {stepFunnel.map((step) => (
                <tr key={step.step} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>단계 {step.step}</td>
                  <td style={{ padding: '0.5rem' }}>{step.users_reached}</td>
                  <td style={{ padding: '0.5rem' }}>{step.dropped_off || '-'}</td>
                  <td style={{ padding: '0.5rem' }}>{step.dropout_rate || '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {osPerformance.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>OS별 성능 (최근 7일)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>OS</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>시도</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>완료</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>성공률</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>평균 시간</th>
              </tr>
            </thead>
            <tbody>
              {osPerformance.map((os) => (
                <tr key={os.os} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{os.os}</td>
                  <td style={{ padding: '0.5rem' }}>{os.total_attempts}</td>
                  <td style={{ padding: '0.5rem' }}>{os.completions}</td>
                  <td style={{ padding: '0.5rem' }}>{os.success_rate}%</td>
                  <td style={{ padding: '0.5rem' }}>{os.avg_time_minutes?.toFixed(1) || '-'}분</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagePerformance.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>페이지별 성과 (최근 7일)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>페이지</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>고유 세션</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>총 조회수</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>평균 체류시간</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>이탈 수</th>
              </tr>
            </thead>
            <tbody>
              {pagePerformance.map((page) => (
                <tr key={page.page_path} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{page.page_path}</td>
                  <td style={{ padding: '0.5rem' }}>{page.unique_sessions}</td>
                  <td style={{ padding: '0.5rem' }}>{page.total_views}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {page.avg_time_seconds ? `${Math.round(page.avg_time_seconds)}초` : '-'}
                  </td>
                  <td style={{ padding: '0.5rem' }}>{page.bounce_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {buttonUsage.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>버튼 활용도 TOP 10 (최근 7일)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>카테고리</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>버튼 이름</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>클릭 수</th>
              </tr>
            </thead>
            <tbody>
              {buttonUsage.slice(0, 10).map((button, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{button.button_category || '-'}</td>
                  <td style={{ padding: '0.5rem' }}>{button.button_name}</td>
                  <td style={{ padding: '0.5rem' }}>{button.click_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {feedbackSummary && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>사용자 만족도 (최근 7일)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>전체 피드백</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.total_feedback}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>평균 점수</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.avg_score?.toFixed(1) || 0}/5</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>만족도</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.satisfaction_rate}%</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>긍정적 피드백</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.positive_count}</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>텍스트 포함</h3>
              <p style={{ fontSize: '2rem', margin: 0 }}>{feedbackSummary.with_text_count}</p>
            </div>
          </div>
        </div>
      )}

      {feedbackByEmoji.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>이모지별 피드백 분포</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
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

      <h2>최근 세션</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>시간</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>OS</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>브라우저</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>현재 단계</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>최고 단계</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>완료</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>에러</th>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>소요 시간</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.session_id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem' }}>
                  {new Date(session.created_at).toLocaleString('ko-KR')}
                </td>
                <td style={{ padding: '0.5rem' }}>{session.os}</td>
                <td style={{ padding: '0.5rem' }}>{session.browser}</td>
                <td style={{ padding: '0.5rem' }}>{session.current_step || 0}</td>
                <td style={{ padding: '0.5rem' }}>{session.highest_step_reached || 0}</td>
                <td style={{ padding: '0.5rem' }}>
                  {session.is_completed ? '✅' : '❌'}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  {session.errors && session.errors.length > 0 ? `⚠️ ${session.errors.length}` : '-'}
                </td>
                <td style={{ padding: '0.5rem' }}>
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
    </>
  );
}