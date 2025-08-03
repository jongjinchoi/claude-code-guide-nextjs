-- overall_guide_stats 뷰 타임존 문제 수정
CREATE OR REPLACE VIEW overall_guide_stats AS
WITH all_sessions AS (
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
            WHEN is_completed = true AND step1_completed_at IS NOT NULL AND step6_completed_at IS NOT NULL
            THEN actual_time_seconds::numeric / 60.0
            WHEN is_completed = true AND (step1_completed_at IS NULL OR step6_completed_at IS NULL)
            THEN total_time_seconds::numeric / 60.0
            ELSE NULL 
        END
    ) AS avg_completion_minutes_actual,
    -- 기존 세션 기준 평균 시간 (분)
    AVG(
        CASE 
            WHEN is_completed = true 
            THEN total_time_seconds::numeric / 60.0
            ELSE NULL 
        END
    ) AS avg_completion_minutes_session,
    -- 버튼 클릭 데이터가 있는 완료 세션 수
    COUNT(
        CASE 
            WHEN is_completed = true AND step1_completed_at IS NOT NULL AND step6_completed_at IS NOT NULL
            THEN 1 
        END
    ) AS completed_with_click_data
FROM all_sessions;