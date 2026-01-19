import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { updateSession } from './lib/supabase/middleware';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. 정적 파일 및 API는 바로 통과
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.svg' ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.svg' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. 대시보드 로그인 페이지는 바로 통과
  if (pathname.startsWith('/dashboard-login')) {
    return NextResponse.next();
  }

  // 3. 대시보드 인증 처리 (Supabase Auth)
  if (pathname.startsWith('/dashboard')) {
    try {
      const { user, supabaseResponse } = await updateSession(request);

      if (!user) {
        return NextResponse.redirect(new URL('/dashboard-login', request.url));
      }

      // 이메일 확인
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(e => e.trim()) || [];
      if (!user.email || !allowedEmails.includes(user.email.toLowerCase())) {
        return NextResponse.redirect(new URL('/dashboard-login?error=unauthorized', request.url));
      }

      return supabaseResponse;
    } catch (error) {
      console.error('Dashboard auth error:', error);
      return NextResponse.redirect(new URL('/dashboard-login', request.url));
    }
  }

  // 4. 나머지 경로에는 i18n 미들웨어 적용
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
