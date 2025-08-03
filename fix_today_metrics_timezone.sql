-- today_metrics 뷰 타임존 문제 수정
-- started_at이 이미 타임존 정보를 포함하고 있으므로 중복 변환하지 않음

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
                AND DATE(gs2.started_at) = CURRENT_DATE
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
            WHEN gs.highest_step_reached = 0 AND NOT gs.is_completed 
            THEN 1 
        END
    ) AS immediate_bounces
FROM guide_sessions gs
WHERE DATE(gs.started_at) = CURRENT_DATE;

-- 확인용 쿼리
-- 오늘의 모든 세션 확인
SELECT 
    session_id,
    started_at,
    DATE(started_at) as start_date,
    is_completed,
    total_time_seconds,
    total_time_seconds / 60.0 as minutes
FROM guide_sessions
WHERE DATE(started_at) = CURRENT_DATE
ORDER BY started_at;

-- 뷰 결과 확인
SELECT * FROM today_metrics;