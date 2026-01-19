import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = '/dashboard';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 세션에서 사용자 정보 가져오기
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email) {
        // 허용된 이메일 목록 확인
        const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(e => e.trim()) || [];

        if (allowedEmails.includes(user.email.toLowerCase())) {
          // 허용된 이메일 - 대시보드로 이동
          const forwardedHost = request.headers.get('x-forwarded-host');
          const isLocalEnv = process.env.NODE_ENV === 'development';

          if (isLocalEnv) {
            return NextResponse.redirect(`${origin}${next}`);
          } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}${next}`);
          } else {
            return NextResponse.redirect(`${origin}${next}`);
          }
        } else {
          // 허용되지 않은 이메일 - 로그아웃 후 에러 페이지로 이동
          await supabase.auth.signOut();
          return NextResponse.redirect(`${origin}/dashboard-login?error=unauthorized`);
        }
      }
    }
  }

  // 에러 발생 시 로그인 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/dashboard-login?error=auth_failed`);
}
