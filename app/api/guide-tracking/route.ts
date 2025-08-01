import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 브라우저 핑거프린트 생성
function generateFingerprint(request: NextRequest): string {
  const headers = request.headers;
  const userAgent = headers.get('user-agent') || 'unknown';
  const acceptLanguage = headers.get('accept-language') || 'unknown';
  
  // 간단한 핑거프린트 (IP는 제외)
  return `${userAgent}_${acceptLanguage}`.substring(0, 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, session_id, data, total_time } = body;

    switch (action) {
      case 'start_session':
        const fingerprint = generateFingerprint(request);
        
        await supabase.from('guide_sessions').insert({
          session_id,
          os: data.os,
          browser: data.browser,
          device_type: data.device_type,
          referrer_source: data.referrer_source,
          landing_page: data.landing_page,
          user_fingerprint: fingerprint
        });
        
        // 상세 이벤트 로깅 (선택사항)
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
          await supabase.from('guide_events').insert({
            session_id,
            event_type: 'session_start',
            event_data: data
          });
        }
        break;

      case 'step_progress':
        // 이전 step_times 가져오기
        const { data: session } = await supabase
          .from('guide_sessions')
          .select('step_times, highest_step_reached')
          .eq('session_id', session_id)
          .single();

        const stepTimes = session?.step_times || {};
        
        // 이전 단계 시간 기록
        if (data.time_on_previous_step && data.step_number > 1) {
          stepTimes[`step${data.step_number - 1}`] = data.time_on_previous_step;
        }

        await supabase
          .from('guide_sessions')
          .update({
            current_step: data.step_number,
            highest_step_reached: Math.max(data.step_number, session?.highest_step_reached || 0),
            step_times: stepTimes,
            last_activity_at: new Date().toISOString()
          })
          .eq('session_id', session_id);
        
        // 상세 이벤트 로깅
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
          await supabase.from('guide_events').insert({
            session_id,
            event_type: 'step_progress',
            event_data: data
          });
        }
        break;

      case 'track_error':
        // 기존 에러 가져오기
        const { data: errorSession } = await supabase
          .from('guide_sessions')
          .select('errors')
          .eq('session_id', session_id)
          .single();

        const errors = errorSession?.errors || [];
        errors.push(data);

        await supabase
          .from('guide_sessions')
          .update({ 
            errors,
            last_activity_at: new Date().toISOString()
          })
          .eq('session_id', session_id);
        
        // 상세 이벤트 로깅
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
          await supabase.from('guide_events').insert({
            session_id,
            event_type: 'error',
            event_data: data
          });
        }
        break;

      case 'complete_guide':
        // 마지막 단계 시간 추가
        const { data: completeSession } = await supabase
          .from('guide_sessions')
          .select('step_times, current_step')
          .eq('session_id', session_id)
          .single();

        const finalStepTimes: Record<string, number> = completeSession?.step_times || {};
        if (completeSession?.current_step) {
          finalStepTimes[`step${completeSession.current_step}`] = 
            data.total_time - Object.values(finalStepTimes).reduce((a, b) => a + b, 0);
        }

        await supabase
          .from('guide_sessions')
          .update({
            is_completed: true,
            completed_at: new Date().toISOString(),
            total_time_seconds: data.total_time,
            current_step: 6, // 마지막 단계
            highest_step_reached: 6,
            step_times: finalStepTimes,
            last_activity_at: new Date().toISOString()
          })
          .eq('session_id', session_id);
        
        // 상세 이벤트 로깅
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
          await supabase.from('guide_events').insert({
            session_id,
            event_type: 'guide_complete',
            event_data: data
          });
        }
        break;

      case 'session_end':
        await supabase
          .from('guide_sessions')
          .update({
            total_time_seconds: total_time,
            last_activity_at: new Date().toISOString()
          })
          .eq('session_id', session_id);
        break;

      case 'view_help':
        // 상세 이벤트만 로깅
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
          await supabase.from('guide_events').insert({
            session_id,
            event_type: 'help_view',
            event_data: data
          });
        }
        break;

      default:
        // Unknown tracking action - ignore silently
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}