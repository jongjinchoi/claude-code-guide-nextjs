-- page_analytics 테이블 RLS 수정
-- 익명 사용자도 INSERT할 수 있도록 설정

-- 1. RLS 비활성화 (임시)
ALTER TABLE page_analytics DISABLE ROW LEVEL SECURITY;

-- 또는

-- 2. RLS 정책 추가 (권장)
-- 모든 사용자가 INSERT 가능
CREATE POLICY "Enable insert for all users" ON page_analytics
FOR INSERT TO public
WITH CHECK (true);

-- 본인 세션만 SELECT 가능
CREATE POLICY "Users can view own sessions" ON page_analytics
FOR SELECT USING (session_id = current_setting('request.session_id', true));

-- 3. RLS 활성화
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;