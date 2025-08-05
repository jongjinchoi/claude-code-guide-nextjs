import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 브라우저 핑거프린트 생성
function generateFingerprint(request: NextRequest): string {
  const headers = request.headers;
  const userAgent = headers.get('user-agent') || 'unknown';
  const acceptLanguage = headers.get('accept-language') || 'unknown';
  
  // 간단한 핑거프린트 (IP는 제외)
  return `${userAgent}_${acceptLanguage}`.substring(0, 100);
}

// OS 이름 정규화
function normalizeOS(os: string): string {
  const osLower = os.toLowerCase();
  
  // macOS 관련
  if (osLower === 'mac' || osLower === 'macos') return 'macOS';
  
  // Windows 관련  
  if (osLower === 'windows' || osLower === 'win') return 'Windows';
  
  // Linux 관련
  if (osLower === 'linux') return 'Linux';
  
  // 모바일 OS
  if (osLower === 'android') return 'Android';
  if (osLower === 'ios') return 'iOS';
  
  return os; // 알 수 없는 경우 원본 유지
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, session_id, data, total_time } = body;

    switch (action) {
      case 'start_session':
        console.log('Starting session:', session_id);
        const fingerprint = generateFingerprint(request);
        
        const insertResult = await supabase.from('guide_sessions').insert({
          session_id,
          locale: data.locale || 'en',
          os: normalizeOS(data.os),
          browser: data.browser,
          device_type: data.device_type,
          referrer_source: data.referrer_source,
          landing_page: data.landing_page,
          browser_language: data.browser_language,
          browser_languages: JSON.stringify(data.browser_languages || []),
          user_fingerprint: fingerprint
        });
        
        if (insertResult.error) {
          console.error('Failed to insert session:', insertResult.error);
          return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }
        
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
        console.log('Step progress tracking:', { session_id, step_number: data.step_number });
        
        // 이전 step_times 가져오기
        const { data: session, error: sessionError } = await supabase
          .from('guide_sessions')
          .select('step_times, highest_step_reached')
          .eq('session_id', session_id)
          .single();
          
        if (sessionError) {
          console.error('Failed to fetch session:', sessionError);
          return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const stepTimes = session?.step_times || {};
        
        // 이전 단계 시간 기록
        if (data.time_on_previous_step && data.step_number > 1) {
          stepTimes[`step${data.step_number - 1}`] = data.time_on_previous_step;
        }

        const updateResult = await supabase
          .from('guide_sessions')
          .update({
            current_step: data.step_number,
            highest_step_reached: Math.max(data.step_number, session?.highest_step_reached || 0),
            step_times: stepTimes,
            last_activity_at: new Date().toISOString()
          })
          .eq('session_id', session_id);
          
        if (updateResult.error) {
          console.error('Failed to update step progress:', updateResult.error);
        }
        
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

      case 'step_click':
        // 단계 클릭 추적 (새로운 테이블에 저장)
        await supabase.from('guide_step_tracking').insert({
          session_id,
          step_number: data.step_number,
          action_type: data.action_type,
          os: normalizeOS(data.os),
          browser: data.browser
        });
        
        // 6단계 완료 시 started_at 업데이트
        if (data.step_number === 1 && data.action_type === 'expand') {
          await supabase
            .from('guide_sessions')
            .update({
              started_at: new Date().toISOString()
            })
            .eq('session_id', session_id);
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