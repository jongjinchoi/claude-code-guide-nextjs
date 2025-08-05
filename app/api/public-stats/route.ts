import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 공개용으로 필요한 핵심 데이터만 가져오기
    const [
      overallStatsResult,
      todayMetricsResult,
      stepFunnelResult,
      osPerformanceResult,
      i18nImpactResult,
      feedbackSummaryResult,
      totalVisitorsResult,
      todayVisitorsResult,
      hourlyActivityResult
    ] = await Promise.allSettled([
      // 1. 전체 통계
      supabaseAdmin.from('overall_guide_stats').select('*').single(),
      
      // 2. 오늘의 지표
      supabaseAdmin.from('today_metrics').select('*').single(),
      
      // 3. 단계별 퍼널
      supabaseAdmin.from('step_funnel').select('*'),
      
      // 4. OS별 성능
      supabaseAdmin.from('os_performance').select('*'),
      
      // 5. 국제화 영향
      supabaseAdmin.from('i18n_impact_analysis').select('*').single(),
      
      // 6. 피드백 요약
      supabaseAdmin.from('feedback_summary').select('*').single(),
      
      // 7. 전체 방문자 수
      supabaseAdmin.from('counters').select('value').eq('name', 'visitors').single(),
      
      // 8. 오늘 방문자 수
      supabaseAdmin.from('counters').select('value').eq('name', 'visitors_today').single(),
      
      // 9. 시간대별 활동
      supabaseAdmin.from('hourly_activity').select('*')
    ]);

    // 공개용 데이터 구성
    const publicStats = {
      success: true,
      data: {
        // 전체 성과
        overview: {
          totalSessions: overallStatsResult.status === 'fulfilled' && overallStatsResult.value.data 
            ? overallStatsResult.value.data.total_sessions : 0,
          completionRate: overallStatsResult.status === 'fulfilled' && overallStatsResult.value.data 
            ? overallStatsResult.value.data.completion_rate : 0,
          avgCompletionMinutes: overallStatsResult.status === 'fulfilled' && overallStatsResult.value.data 
            ? overallStatsResult.value.data.avg_completion_minutes : 0,
          totalVisitors: totalVisitorsResult.status === 'fulfilled' && totalVisitorsResult.value.data 
            ? parseInt(totalVisitorsResult.value.data.value) : 0
        },
        
        // 오늘의 현황
        today: todayMetricsResult.status === 'fulfilled' && todayMetricsResult.value.data ? {
          ...todayMetricsResult.value.data,
          today_total_visitors: todayVisitorsResult.status === 'fulfilled' && todayVisitorsResult.value.data 
            ? parseInt(todayVisitorsResult.value.data.value) : 0
        } : null,
        
        // 사용자 여정
        funnel: stepFunnelResult.status === 'fulfilled' ? stepFunnelResult.value.data || [] : [],
        
        // 기술 스택 정보
        platform: {
          launchDate: '2025-07-17',
          migrationDate: '2025-08-01',
          i18nLaunchDate: '2025-08-05',
          techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase'],
          performanceImprovement: '920x faster (92s → 100ms)'
        },
        
        // OS 선호도
        osStats: osPerformanceResult.status === 'fulfilled' ? osPerformanceResult.value.data || [] : [],
        
        // 다국어 현황
        i18nStats: i18nImpactResult.status === 'fulfilled' ? i18nImpactResult.value.data : null,
        
        // 사용자 만족도
        satisfaction: {
          averageScore: feedbackSummaryResult.status === 'fulfilled' && feedbackSummaryResult.value.data 
            ? feedbackSummaryResult.value.data.avg_score : 0,
          totalFeedback: feedbackSummaryResult.status === 'fulfilled' && feedbackSummaryResult.value.data 
            ? feedbackSummaryResult.value.data.total_feedback : 0,
          satisfactionRate: feedbackSummaryResult.status === 'fulfilled' && feedbackSummaryResult.value.data 
            ? feedbackSummaryResult.value.data.satisfaction_rate : 0
        },
        
        // 활동 패턴
        activity: {
          peakHours: hourlyActivityResult.status === 'fulfilled' ? 
            (hourlyActivityResult.value.data || [])
              .sort((a: any, b: any) => b.total_sessions - a.total_sessions)
              .slice(0, 3) : []
        }
      },
      timestamp: new Date().toISOString(),
      // 38일간의 발전 스토리
      story: {
        startDate: '2025-06-26',
        launchDate: '2025-07-17', 
        migrationDate: '2025-08-01',
        globalDate: '2025-08-05',
        totalDays: 40,
        phases: [
          { name: 'MVP 개발', duration: '20일', tech: 'HTML/CSS/JS' },
          { name: '런칭 & 최적화', duration: '8일', tech: 'Vite + Analytics' },
          { name: '현대화', duration: '3일', tech: 'Next.js + TypeScript' },
          { name: '글로벌화', duration: '진행중', tech: 'i18n Support' }
        ]
      }
    };

    return NextResponse.json(publicStats);

  } catch (error) {
    console.error('Public stats API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch public stats' },
      { status: 500 }
    );
  }
}