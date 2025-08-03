-- page_analytics 테이블 스키마 확인 및 수정

-- 1. 현재 테이블 구조 확인
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'page_analytics'
ORDER BY ordinal_position;

-- 2. 누락된 컬럼들 추가
ALTER TABLE page_analytics 
ADD COLUMN IF NOT EXISTS page_title TEXT,
ADD COLUMN IF NOT EXISTS page_url TEXT,
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT,
ADD COLUMN IF NOT EXISTS screen_resolution TEXT,
ADD COLUMN IF NOT EXISTS viewport_size TEXT;

-- 3. 테이블 구조 재확인
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'page_analytics'
ORDER BY ordinal_position;