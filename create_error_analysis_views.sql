-- 에러 분석을 위한 뷰들
-- guide_step_tracking 테이블의 action_type='error' 데이터 활용

-- 1. 단계별 에러 발생률
CREATE OR REPLACE VIEW step_error_rates AS
WITH step_stats AS (
  SELECT 
    step_number,
    COUNT(DISTINCT CASE WHEN action_type = 'expand' THEN session_id END) as expanded_sessions,
    COUNT(DISTINCT CASE WHEN action_type = 'error' THEN session_id END) as error_sessions,
    COUNT(DISTINCT CASE WHEN action_type = 'complete' THEN session_id END) as completed_sessions
  FROM guide_step_tracking
  GROUP BY step_number
)
SELECT 
  step_number,
  expanded_sessions as total_attempts,
  error_sessions,
  completed_sessions,
  ROUND(error_sessions::numeric / NULLIF(expanded_sessions, 0) * 100, 1) as error_rate,
  ROUND(completed_sessions::numeric / NULLIF(expanded_sessions, 0) * 100, 1) as success_rate
FROM step_stats
ORDER BY step_number;

-- 2. 에러 후 해결 시간 분석
CREATE OR REPLACE VIEW error_resolution_times AS
WITH error_clicks AS (
  SELECT 
    session_id,
    step_number,
    clicked_at as error_time
  FROM guide_step_tracking
  WHERE action_type = 'error'
),
complete_clicks AS (
  SELECT 
    session_id,
    step_number,
    clicked_at as complete_time
  FROM guide_step_tracking
  WHERE action_type = 'complete'
)
SELECT 
  ec.session_id,
  ec.step_number,
  ec.error_time,
  cc.complete_time,
  EXTRACT(EPOCH FROM (cc.complete_time - ec.error_time)) / 60.0 as resolution_minutes
FROM error_clicks ec
INNER JOIN complete_clicks cc 
  ON ec.session_id = cc.session_id 
  AND ec.step_number = cc.step_number
  AND cc.complete_time > ec.error_time
ORDER BY ec.step_number, resolution_minutes;

-- 3. OS별 에러 발생 패턴
CREATE OR REPLACE VIEW os_error_patterns AS
SELECT 
  os,
  step_number,
  COUNT(DISTINCT CASE WHEN action_type = 'error' THEN session_id END) as error_count,
  COUNT(DISTINCT CASE WHEN action_type = 'complete' THEN session_id END) as success_count,
  ROUND(
    COUNT(DISTINCT CASE WHEN action_type = 'error' THEN session_id END)::numeric / 
    NULLIF(COUNT(DISTINCT session_id), 0) * 100, 
  1) as error_rate
FROM guide_step_tracking
WHERE action_type IN ('error', 'complete', 'expand')
GROUP BY os, step_number
ORDER BY os, step_number;

-- 4. 에러 발생 시간대 분석
CREATE OR REPLACE VIEW error_time_distribution AS
SELECT 
  EXTRACT(HOUR FROM clicked_at AT TIME ZONE 'Asia/Seoul') as hour_of_day,
  COUNT(*) as error_count,
  COUNT(DISTINCT session_id) as unique_sessions
FROM guide_step_tracking
WHERE action_type = 'error'
GROUP BY EXTRACT(HOUR FROM clicked_at AT TIME ZONE 'Asia/Seoul')
ORDER BY hour_of_day;

-- 5. 최근 에러 트렌드 (최근 7일)
CREATE OR REPLACE VIEW recent_error_trends AS
WITH daily_stats AS (
  SELECT 
    DATE(clicked_at AT TIME ZONE 'Asia/Seoul') as date,
    step_number,
    COUNT(DISTINCT CASE WHEN action_type = 'expand' THEN session_id END) as attempts,
    COUNT(DISTINCT CASE WHEN action_type = 'error' THEN session_id END) as errors,
    COUNT(DISTINCT CASE WHEN action_type = 'complete' THEN session_id END) as completions
  FROM guide_step_tracking
  WHERE clicked_at >= CURRENT_TIMESTAMP - INTERVAL '7 days'
  GROUP BY DATE(clicked_at AT TIME ZONE 'Asia/Seoul'), step_number
)
SELECT 
  date,
  step_number,
  attempts,
  errors,
  completions,
  ROUND(errors::numeric / NULLIF(attempts, 0) * 100, 1) as error_rate
FROM daily_stats
ORDER BY date DESC, step_number;