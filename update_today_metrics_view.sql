-- today_metrics 뷰를 버튼 클릭 기준 시간으로 수정
CREATE OR REPLACE VIEW today_metrics AS
WITH today_sessions AS (
    SELECT 
        gs.*,
        st1.clicked_at as step1_completed_at,
        st6.clicked_at as step6_completed_at,
        CASE 
            WHEN st1.clicked_at IS NOT NULL AND st6.clicked_at IS NOT NULL 
            THEN EXTRACT(EPOCH FROM (st6.clicked_at - st1.clicked_at))
            ELSE gs.total_time_seconds
        END as actual_time_seconds
    FROM guide_sessions gs
    LEFT JOIN guide_step_tracking st1 
        ON gs.session_id = st1.session_id 
        AND st1.step_number = 1 
        AND st1.action_type = 'complete'
    LEFT JOIN guide_step_tracking st6 
        ON gs.session_id = st6.session_id 
        AND st6.step_number = 6 
        AND st6.action_type = 'complete'
    WHERE date(((gs.started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) = date((now() AT TIME ZONE 'Asia/Seoul'))
)
SELECT 
    COUNT(*) AS total_sessions,
    COUNT(CASE WHEN is_completed = true THEN 1 END) AS completed_sessions,
    ROUND(
        CASE
            WHEN COUNT(*) > 0 
            THEN COUNT(CASE WHEN is_completed = true THEN 1 END)::numeric / COUNT(*)::numeric * 100
            ELSE 0
        END, 1
    ) AS completion_rate,
    -- 버튼 클릭 기준 평균 시간 (분)
    AVG(
        CASE 
            WHEN is_completed = true 
            THEN actual_time_seconds::numeric / 60.0
            ELSE NULL 
        END
    ) AS avg_completion_minutes,
    COUNT(*) AS today_sessions,
    COUNT(
        CASE 
            WHEN current_step <= 1 AND NOT is_completed 
            THEN 1 
        END
    ) AS immediate_bounces
FROM today_sessions;