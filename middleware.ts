import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 1. 대시보드 인증 처리 (기존 로직)
  if (pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('dashboard-auth');
    const authEmail = request.cookies.get('dashboard-email');
    
    if (!authToken || !authEmail) {
      return NextResponse.redirect(new URL('/dashboard-login', request.url));
    }
    // 대시보드는 인증만 체크하고 i18n은 적용하지 않음
    return NextResponse.next();
  }
  
  // 2. i18n을 적용하지 않을 경로들
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/dashboard-login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname === '/favicon.svg' ||
    pathname === '/icon.svg' ||
    pathname.includes('.')  // 모든 정적 파일
  ) {
    return NextResponse.next();
  }
  
  // 3. 나머지 경로에는 i18n 미들웨어 적용
  return intlMiddleware(request);
}

export const config = {
  // 모든 경로에 대해 미들웨어 실행 (제외할 경로는 함수 내에서 처리)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};