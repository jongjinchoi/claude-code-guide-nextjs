import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Service Role 클라이언트 생성 (RLS 우회)
const getSupabaseAdmin = () => {
  // Service Role Key가 있으면 사용, 없으면 Anon Key 사용
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// 인증 확인 함수
async function checkAuthorization() {
  const cookieStore = await cookies();
  const authCodeCookie = cookieStore.get('auth_code_verified');
  
  // 쿠키가 있고 'true' 값이면 인증된 것으로 간주
  return authCodeCookie?.value === 'true';
}

export async function GET(request: Request) {
  try {
    // 인증 확인 (임시 비활성화)
    // const isAuthorized = await checkAuthorization();
    // if (!isAuthorized) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const supabaseAdmin = getSupabaseAdmin();

    // 병렬로 모든 데이터 가져오기
    const [
      sessionsResult,
      todayMetricsResult,
      stepFunnelResult,
      osPerformanceResult,
      pagePerformanceResult,
      buttonUsageResult,
      feedbackSummaryResult,
      feedbackByEmojiResult,
      totalVisitorsResult,
      actualGuideTimesResult,
      stepDurationsResult,
      overallStatsResult,
      stepErrorRatesResult,
      hourlyActivityResult,
      dailyActivityResult
    ] = await Promise.allSettled([
      // 1. 전체 세션 데이터
      supabaseAdmin.from('guide_sessions').select('*'),
      
      // 2. 오늘의 지표
      supabaseAdmin.from('today_metrics').select('*').single(),
      
      // 3. 단계별 퍼널
      supabaseAdmin.from('step_funnel').select('*'),
      
      // 4. OS별 성능
      supabaseAdmin.from('os_performance').select('*'),
      
      // 5. 페이지별 성과
      supabaseAdmin.from('page_performance').select('*'),
      
      // 6. 버튼 사용량
      supabaseAdmin.from('button_usage').select('*'),
      
      // 7. 피드백 요약
      supabaseAdmin.from('feedback_summary').select('*').single(),
      
      // 8. 이모지별 피드백
      supabaseAdmin.from('feedback_by_emoji').select('*'),
      
      // 9. 전체 방문자 수
      supabaseAdmin.from('counters').select('value').eq('name', 'visitors').single(),
      
      // 10. 실제 가이드 시간
      supabaseAdmin.from('actual_guide_times').select('*').order('actual_minutes', { ascending: false }).limit(20),
      
      // 11. 단계별 소요 시간
      supabaseAdmin.from('step_duration_analysis').select('*'),
      
      // 12. 전체 가이드 통계
      supabaseAdmin.from('overall_guide_stats').select('*').single(),
      
      // 13. 단계별 에러율
      supabaseAdmin.from('step_error_rates').select('*'),
      
      // 14. 시간대별 활동
      supabaseAdmin.from('hourly_activity').select('*'),
      
      // 15. 요일별 활동
      supabaseAdmin.from('daily_activity').select('*')
    ]);

    // 결과 처리
    const sessions = sessionsResult.status === 'fulfilled' ? sessionsResult.value.data || [] : [];
    const recentSessions = sessions.slice(0, 15);

    // 통계 계산
    const stats = calculateStats(sessions);

    // 응답 데이터 구성
    const responseData = {
      success: true,
      data: {
        sessions: recentSessions,
        stats,
        todayMetrics: todayMetricsResult.status === 'fulfilled' ? todayMetricsResult.value.data : null,
        stepFunnel: stepFunnelResult.status === 'fulfilled' ? stepFunnelResult.value.data || [] : [],
        osPerformance: osPerformanceResult.status === 'fulfilled' ? osPerformanceResult.value.data || [] : [],
        pagePerformance: pagePerformanceResult.status === 'fulfilled' ? pagePerformanceResult.value.data || [] : [],
        buttonUsage: buttonUsageResult.status === 'fulfilled' ? buttonUsageResult.value.data || [] : [],
        feedbackSummary: feedbackSummaryResult.status === 'fulfilled' ? feedbackSummaryResult.value.data : null,
        feedbackByEmoji: feedbackByEmojiResult.status === 'fulfilled' ? feedbackByEmojiResult.value.data || [] : [],
        totalVisitors: totalVisitorsResult.status === 'fulfilled' && totalVisitorsResult.value.data 
          ? parseInt(totalVisitorsResult.value.data.value) : 0,
        actualGuideTimes: actualGuideTimesResult.status === 'fulfilled' ? actualGuideTimesResult.value.data || [] : [],
        stepDurations: stepDurationsResult.status === 'fulfilled' ? stepDurationsResult.value.data || [] : [],
        overallStats: overallStatsResult.status === 'fulfilled' ? overallStatsResult.value.data : null,
        stepErrorRates: stepErrorRatesResult.status === 'fulfilled' ? stepErrorRatesResult.value.data || [] : [],
        hourlyActivity: hourlyActivityResult.status === 'fulfilled' ? hourlyActivityResult.value.data || [] : [],
        dailyActivity: dailyActivityResult.status === 'fulfilled' ? dailyActivityResult.value.data || [] : []
      },
      timestamp: new Date().toISOString()
    };

    // 캐시 헤더 설정 (60초)
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'private, max-age=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', success: false }, 
      { status: 500 }
    );
  }
}

// 통계 계산 함수
function calculateStats(sessions: any[]) {
  if (!sessions || sessions.length === 0) {
    return {
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
    };
  }

  const completed = sessions.filter(s => s.is_completed);
  const withErrors = sessions.filter(s => {
    if (!s.errors) return false;
    try {
      const errors = typeof s.errors === 'string' ? JSON.parse(s.errors) : s.errors;
      return Array.isArray(errors) && errors.length > 0;
    } catch {
      return false;
    }
  });
  
  // 단계별 도달 인원 계산
  const reachedStep1 = sessions.filter(s => s.highest_step_reached >= 1).length;
  const reachedStep2 = sessions.filter(s => s.highest_step_reached >= 2).length;
  const reachedStep3 = sessions.filter(s => s.highest_step_reached >= 3).length;
  const reachedStep4 = sessions.filter(s => s.highest_step_reached >= 4).length;
  const reachedStep5 = sessions.filter(s => s.highest_step_reached >= 5).length;
  const reachedStep6 = sessions.filter(s => s.highest_step_reached >= 6).length;
  
  return {
    totalSessions: sessions.length,
    startedGuide: reachedStep1,
    reachedStep1,
    reachedStep2,
    reachedStep3,
    reachedStep4,
    reachedStep5,
    reachedStep6,
    completedSessions: completed.length,
    completionRate: (completed.length / sessions.length) * 100,
    avgCompletionTime: completed.length > 0 
      ? completed.reduce((sum, s) => sum + (s.total_time_seconds || 0), 0) / completed.length / 60
      : 0,
    errorRate: (withErrors.length / sessions.length) * 100
  };
}