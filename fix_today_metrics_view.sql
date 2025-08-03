-- today_metrics 뷰 수정 - 더 간단하고 명확하게
CREATE OR REPLACE VIEW today_metrics AS
SELECT 
    COUNT(*) AS total_sessions,
    COUNT(CASE WHEN gs.is_completed = true THEN 1 END) AS completed_sessions,
    ROUND(
        CASE
            WHEN COUNT(*) > 0 
            THEN COUNT(CASE WHEN gs.is_completed = true THEN 1 END)::numeric / COUNT(*)::numeric * 100
            ELSE 0
        END, 1
    ) AS completion_rate,
    -- 클릭 데이터가 있으면 사용, 없으면 기존 세션 시간 사용
    COALESCE(
        -- 버튼 클릭 기준 평균 (분)
        (
            SELECT AVG(EXTRACT(EPOCH FROM (st6.clicked_at - st1.clicked_at)) / 60.0)
            FROM guide_sessions gs2
            INNER JOIN guide_step_tracking st1 
                ON gs2.session_id = st1.session_id 
                AND st1.step_number = 1 
                AND st1.action_type = 'complete'
            INNER JOIN guide_step_tracking st6 
                ON gs2.session_id = st6.session_id 
                AND st6.step_number = 6 
                AND st6.action_type = 'complete'
            WHERE gs2.is_completed = true
                AND date(((gs2.started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) = date((now() AT TIME ZONE 'Asia/Seoul'))
        ),
        -- 클릭 데이터가 없으면 기존 세션 시간 사용 (분)
        AVG(
            CASE 
                WHEN gs.is_completed = true AND gs.total_time_seconds > 0
                THEN gs.total_time_seconds::numeric / 60.0
                ELSE NULL 
            END
        )
    ) AS avg_completion_minutes,
    COUNT(*) AS today_sessions,
    COUNT(
        CASE 
            WHEN gs.current_step <= 1 AND NOT gs.is_completed 
            THEN 1 
        END
    ) AS immediate_bounces
FROM guide_sessions gs
WHERE date(((gs.started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) = date((now() AT TIME ZONE 'Asia/Seoul'));