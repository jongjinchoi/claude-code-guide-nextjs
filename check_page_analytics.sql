-- page_analytics 테이블 디버깅 SQL

-- 1. 테이블 구조 확인
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'page_analytics'
ORDER BY ordinal_position;

-- 2. 테이블 권한 확인
SELECT 
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'page_analytics';

-- 3. RLS (Row Level Security) 정책 확인
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'page_analytics';

-- 4. 테이블에 데이터가 있는지 확인
SELECT COUNT(*) as total_records FROM page_analytics;

-- 5. 최근 데이터 확인 (있다면)
SELECT * FROM page_analytics 
ORDER BY timestamp DESC 
LIMIT 10;

-- 6. 테스트 삽입 (RLS가 비활성화된 경우)
INSERT INTO page_analytics (
    session_id,
    page_path,
    page_title,
    page_url,
    referrer,
    user_agent,
    screen_resolution,
    viewport_size,
    timestamp
) VALUES (
    'manual_test_' || NOW()::text,
    '/test',
    'Manual Test',
    'https://getclaudecode.com/test',
    null,
    'Manual Test User Agent',
    '1920x1080',
    '1920x1080',
    NOW()
);

-- 7. RLS 활성화 여부 확인
SELECT 
    relname as table_name,
    relrowsecurity as rls_enabled,
    relforcerowsecurity as rls_forced
FROM pg_class
WHERE relname = 'page_analytics';