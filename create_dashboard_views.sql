-- 대시보드용 추가 뷰: 실제 가이드 수행 시간 (1단계 시작 ~ 6단계 완료)
CREATE OR REPLACE VIEW actual_guide_times AS
SELECT 
    gs.session_id,
    gs.os,
    gs.browser,
    gs.created_at as session_created_at,
    st1.clicked_at as step1_started,
    st6.clicked_at as step6_completed,
    EXTRACT(EPOCH FROM (st6.clicked_at - st1.clicked_at)) as actual_seconds,
    EXTRACT(EPOCH FROM (st6.clicked_at - st1.clicked_at)) / 60 as actual_minutes,
    gs.total_time_seconds as recorded_seconds,
    gs.total_time_seconds / 60 as recorded_minutes
FROM guide_sessions gs
LEFT JOIN guide_step_tracking st1 
    ON gs.session_id = st1.session_id 
    AND st1.step_number = 1 
    AND st1.action_type = 'complete'
LEFT JOIN guide_step_tracking st6 
    ON gs.session_id = st6.session_id 
    AND st6.step_number = 6 
    AND st6.action_type = 'complete'
WHERE gs.is_completed = true
    AND st1.clicked_at IS NOT NULL
    AND st6.clicked_at IS NOT NULL;

-- 대시보드용 뷰: 단계별 평균 체류 시간
CREATE OR REPLACE VIEW step_duration_analysis AS
WITH step_transitions AS (
    SELECT 
        session_id,
        step_number,
        action_type,
        clicked_at,
        LEAD(clicked_at) OVER (PARTITION BY session_id ORDER BY clicked_at) as next_clicked_at,
        LEAD(step_number) OVER (PARTITION BY session_id ORDER BY clicked_at) as next_step_number
    FROM guide_step_tracking
    WHERE action_type IN ('expand', 'complete')
)
SELECT 
    step_number,
    COUNT(DISTINCT session_id) as sessions_count,
    AVG(EXTRACT(EPOCH FROM (next_clicked_at - clicked_at))) as avg_seconds_on_step,
    AVG(EXTRACT(EPOCH FROM (next_clicked_at - clicked_at))) / 60 as avg_minutes_on_step,
    MIN(EXTRACT(EPOCH FROM (next_clicked_at - clicked_at))) / 60 as min_minutes,
    MAX(EXTRACT(EPOCH FROM (next_clicked_at - clicked_at))) / 60 as max_minutes
FROM step_transitions
WHERE action_type = 'expand'
    AND next_clicked_at IS NOT NULL
GROUP BY step_number
ORDER BY step_number;

-- 대시보드용 뷰: 단계별 이탈률
CREATE OR REPLACE VIEW step_dropout_analysis AS
WITH step_reaches AS (
    SELECT 
        step_number,
        COUNT(DISTINCT session_id) as reached_count
    FROM guide_step_tracking
    WHERE action_type = 'expand'
    GROUP BY step_number
),
step_completes AS (
    SELECT 
        step_number,
        COUNT(DISTINCT session_id) as completed_count
    FROM guide_step_tracking
    WHERE action_type = 'complete'
    GROUP BY step_number
)
SELECT 
    r.step_number,
    r.reached_count as users_started,
    COALESCE(c.completed_count, 0) as users_completed,
    r.reached_count - COALESCE(c.completed_count, 0) as users_dropped,
    CASE 
        WHEN r.reached_count > 0 
        THEN ROUND(((r.reached_count - COALESCE(c.completed_count, 0))::numeric / r.reached_count) * 100, 1)
        ELSE 0
    END as dropout_rate
FROM step_reaches r
LEFT JOIN step_completes c ON r.step_number = c.step_number
ORDER BY r.step_number;