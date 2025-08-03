-- 오늘 세션 디버깅
-- 1. 오늘 날짜 확인
SELECT 
    NOW() AT TIME ZONE 'Asia/Seoul' as current_time_korea,
    date((NOW() AT TIME ZONE 'Asia/Seoul')) as today_korea;

-- 2. 오늘의 모든 세션 확인 (started_at 기준)
SELECT 
    session_id,
    started_at,
    date(((started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) as started_date_korea,
    is_completed,
    total_time_seconds,
    total_time_seconds / 60.0 as minutes
FROM guide_sessions
WHERE date(((started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) = date((NOW() AT TIME ZONE 'Asia/Seoul'))
ORDER BY started_at;

-- 3. 완료된 세션만 확인
SELECT 
    session_id,
    started_at,
    completed_at,
    is_completed,
    total_time_seconds,
    total_time_seconds / 60.0 as minutes
FROM guide_sessions
WHERE date(((started_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Seoul')) = date((NOW() AT TIME ZONE 'Asia/Seoul'))
    AND is_completed = true
ORDER BY started_at;