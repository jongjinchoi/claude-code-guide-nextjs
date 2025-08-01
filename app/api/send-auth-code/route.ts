import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 6자리 랜덤 코드 생성
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

import { Resend } from 'resend';

// 이메일 발송 함수
async function sendEmail(email: string, code: string): Promise<boolean> {
  // Resend API가 있으면 실제 이메일 발송 (개발 환경에서도 테스트 가능)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `Claude Code Guide <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Claude Code Guide 대시보드 인증 코드',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Claude Code Guide 대시보드</h2>
            <p>안녕하세요!</p>
            <p>요청하신 인증 코드는 다음과 같습니다:</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; letter-spacing: 8px; margin: 0;">${code}</h1>
            </div>
            <p>이 코드는 10분 동안 유효합니다.</p>
            <p style="color: #666; font-size: 14px;">이 이메일을 요청하지 않으셨다면 무시해 주세요.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2025 Claude Code Guide. All rights reserved.
            </p>
          </div>
        `
      });
      return true;
    } catch (error) {
      console.error('이메일 발송 실패:', error);
      return false;
    }
  } else {
    // 개발 환경 - 인증 코드 발송 성공
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // 허용된 이메일 확인 (보안을 위해)
    const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(e => e.trim()) || ['me@jongjinchoi.com'];
    if (!allowedEmails.includes(email.toLowerCase().trim())) {
      return NextResponse.json(
        { success: false, error: '허용되지 않은 이메일입니다.' },
        { status: 403 }
      );
    }
    
    // Rate limiting: 같은 이메일로 1분에 1번만 요청 가능
    const { data: recentCodes } = await supabase
      .from('auth_codes')
      .select('created_at')
      .eq('email', email)
      .gte('created_at', new Date(Date.now() - 60000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1);
      
    if (recentCodes && recentCodes.length > 0) {
      return NextResponse.json(
        { success: false, error: '잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }
    
    // 인증 코드 생성
    const code = generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10분 후 만료
    
    // 기존 미사용 코드 무효화
    await supabase
      .from('auth_codes')
      .update({ used: true })
      .eq('email', email)
      .eq('used', false);
    
    // 새 코드 저장
    const { error: insertError } = await supabase
      .from('auth_codes')
      .insert({
        email,
        code,
        expires_at: expiresAt.toISOString()
      });
    
    if (insertError) {
      throw insertError;
    }
    
    // 이메일 발송
    const emailSent = await sendEmail(email, code);
    
    if (!emailSent) {
      throw new Error('이메일 발송 실패');
    }
    
    return NextResponse.json({ 
      success: true,
      message: '인증 코드가 이메일로 발송되었습니다.',
      // 개발 환경에서만 코드 표시
      ...(process.env.NODE_ENV === 'development' && { code })
    });
    
  } catch (error) {
    console.error('Auth code error:', error);
    return NextResponse.json(
      { success: false, error: '인증 코드 발송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}