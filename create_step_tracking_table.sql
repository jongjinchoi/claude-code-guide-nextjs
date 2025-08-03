-- 단계별 클릭 추적을 위한 새 테이블 생성
CREATE TABLE IF NOT EXISTS guide_step_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    step_number INTEGER NOT NULL,
    clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    action_type TEXT NOT NULL CHECK (action_type IN ('expand', 'collapse', 'complete')),
    os TEXT,
    browser TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- 복합 인덱스
    UNIQUE(session_id, step_number, action_type)
);

-- 인덱스 생성
CREATE INDEX idx_step_tracking_session ON guide_step_tracking(session_id);
CREATE INDEX idx_step_tracking_clicked_at ON guide_step_tracking(clicked_at);
CREATE INDEX idx_step_tracking_step ON guide_step_tracking(step_number);

-- RLS 정책
ALTER TABLE guide_step_tracking ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 삽입 가능
CREATE POLICY "Anyone can insert step tracking" ON guide_step_tracking
    FOR INSERT WITH CHECK (true);

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can view step tracking" ON guide_step_tracking
    FOR SELECT USING (true);

-- 뷰: 세션별 단계 진행 시간 계산
CREATE OR REPLACE VIEW session_step_times AS
SELECT 
    s.session_id,
    s.os,
    s.browser,
    MIN(CASE WHEN st.step_number = 1 THEN st.clicked_at END) as step1_started_at,
    MAX(CASE WHEN st.step_number = 6 AND st.action_type = 'complete' THEN st.clicked_at END) as step6_completed_at,
    CASE 
        WHEN MIN(CASE WHEN st.step_number = 1 THEN st.clicked_at END) IS NOT NULL 
        AND MAX(CASE WHEN st.step_number = 6 AND st.action_type = 'complete' THEN st.clicked_at END) IS NOT NULL
        THEN EXTRACT(EPOCH FROM (
            MAX(CASE WHEN st.step_number = 6 AND st.action_type = 'complete' THEN st.clicked_at END) - 
            MIN(CASE WHEN st.step_number = 1 THEN st.clicked_at END)
        ))
        ELSE NULL
    END as actual_completion_seconds,
    COUNT(DISTINCT st.step_number) as steps_clicked
FROM guide_sessions s
LEFT JOIN guide_step_tracking st ON s.session_id = st.session_id
GROUP BY s.session_id, s.os, s.browser;

-- 뷰: 단계별 평균 소요 시간
CREATE OR REPLACE VIEW step_progression_times AS
WITH step_times AS (
    SELECT 
        session_id,
        step_number,
        clicked_at,
        LAG(clicked_at) OVER (PARTITION BY session_id ORDER BY clicked_at) as previous_clicked_at,
        EXTRACT(EPOCH FROM (
            clicked_at - LAG(clicked_at) OVER (PARTITION BY session_id ORDER BY clicked_at)
        )) as seconds_from_previous
    FROM guide_step_tracking
    WHERE action_type = 'expand'
)
SELECT 
    step_number,
    COUNT(DISTINCT session_id) as unique_sessions,
    AVG(seconds_from_previous) as avg_seconds_from_previous_step
FROM step_times
WHERE seconds_from_previous IS NOT NULL
GROUP BY step_number
ORDER BY step_number;