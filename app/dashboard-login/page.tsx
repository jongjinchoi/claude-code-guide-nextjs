'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('code');
        // 개발 환경에서는 코드를 콘솔에 표시
        if (data.code) {
          console.log('인증 코드:', data.code);
        }
      } else {
        setError(data.error || '인증 코드 발송에 실패했습니다.');
      }
    } catch (err) {
      setError('인증 코드 발송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/verify-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || '인증에 실패했습니다.');
      }
    } catch (err) {
      setError('인증 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          대시보드 로그인
        </h1>
        
        {step === 'email' ? (
          <form onSubmit={handleSendCode}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                이메일 주소
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                required
                disabled={loading}
              />
            </div>
            
            {error && (
              <div style={{
                color: 'red',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '발송 중...' : '인증 코드 받기'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <p style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <strong>{email}</strong>로 발송된<br />
              6자리 인증 코드를 입력하세요
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="code" style={{ display: 'block', marginBottom: '0.5rem' }}>
                인증 코드
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.2em'
                }}
                required
                disabled={loading}
                autoFocus
              />
            </div>
            
            {error && (
              <div style={{
                color: 'red',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: loading || code.length !== 6 ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: loading || code.length !== 6 ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: '#6c757d',
                border: '1px solid #6c757d',
                borderRadius: '4px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              이메일 다시 입력
            </button>
          </form>
        )}
      </div>
    </div>
  );
}