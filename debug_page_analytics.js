// page_analytics 디버깅 스크립트
// 브라우저 콘솔에서 실행하세요

// 1. SimplifiedAnalytics가 로드되었는지 확인
console.log('Window gtag:', typeof window.gtag);

// 2. Supabase 클라이언트 확인
const supabase = window.supabase || window._supabase;
console.log('Supabase client:', supabase ? 'Loaded' : 'Not loaded');

// 3. 수동으로 페이지 추적 테스트
async function testPageTracking() {
  const supabase = window.supabase.createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const testData = {
    session_id: `test_${Date.now()}`,
    page_path: '/test',
    page_title: 'Test Page',
    page_url: window.location.href,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString()
  };

  console.log('Attempting to insert:', testData);

  const { data, error } = await supabase
    .from('page_analytics')
    .insert(testData);

  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Success:', data);
  }
}

// 4. 테이블 스키마 확인
async function checkTableSchema() {
  const supabase = window.supabase.createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from('page_analytics')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Table check error:', error);
  } else {
    console.log('Table accessible:', data);
  }
}

// 5. SimplifiedAnalytics 인스턴스 찾기
function findAnalyticsInstance() {
  // React DevTools가 있다면 사용
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    console.log('React DevTools available - check components for SimplifiedAnalytics');
  }

  // 글로벌 객체 확인
  console.log('Checking for analytics in window:', Object.keys(window).filter(k => k.includes('analytics')));
}

console.log('=== Page Analytics Debugging ===');
console.log('Run these functions:');
console.log('- testPageTracking() : 수동 삽입 테스트');
console.log('- checkTableSchema() : 테이블 접근 테스트');
console.log('- findAnalyticsInstance() : Analytics 인스턴스 찾기');