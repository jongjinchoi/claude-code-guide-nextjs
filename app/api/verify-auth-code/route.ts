import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    
    // 유효한 코드 찾기
    const { data: authCode, error } = await supabase
      .from('auth_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .single();
    
    if (error || !authCode) {
      return NextResponse.json(
        { success: false, error: '잘못된 인증 코드이거나 만료되었습니다.' },
        { status: 401 }
      );
    }
    
    // 코드를 사용됨으로 표시
    await supabase
      .from('auth_codes')
      .update({ used: true })
      .eq('id', authCode.id);
    
    // 인증 성공 - 쿠키 설정
    const response = NextResponse.json({ 
      success: true,
      message: '인증 성공'
    });
    
    // 이메일 기반 인증 토큰 생성
    const authToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    response.cookies.set('dashboard-auth', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: '/'
    });
    
    response.cookies.set('dashboard-email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: '/'
    });
    
    // API Route에서 확인하는 쿠키 설정
    response.cookies.set('auth_code_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { success: false, error: '인증 코드 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}