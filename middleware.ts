import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 대시보드 경로 체크
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // 쿠키에서 인증 토큰과 이메일 확인
    const authToken = request.cookies.get('dashboard-auth');
    const authEmail = request.cookies.get('dashboard-email');
    
    // 둘 다 있어야 인증된 것으로 간주
    if (!authToken || !authEmail) {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard-login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*'
};