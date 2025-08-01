'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard-login.module.css';

export default function DashboardLoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<Array<{ text: string; type: 'normal' | 'success' | 'error' }>>([]);
  const router = useRouter();

  const addOutput = (text: string, type: 'normal' | 'success' | 'error' = 'normal') => {
    setOutput(prev => [...prev, { text, type }]);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    addOutput(`$ claude-auth send-code --email ${email}`, 'normal');
    
    try {
      const response = await fetch('/api/send-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('code');
        addOutput('✓ 인증 코드가 발송되었습니다', 'success');
        addOutput('→ 이메일을 확인하고 6자리 코드를 입력하세요', 'normal');
      } else {
        setError(data.error || '인증 코드 발송에 실패했습니다.');
        addOutput(`✗ Error: ${data.error || '인증 코드 발송 실패'}`, 'error');
      }
    } catch (err) {
      setError('인증 코드 발송 중 오류가 발생했습니다.');
      addOutput('✗ Error: 네트워크 오류', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    addOutput(`$ claude-auth verify --code ${code}`, 'normal');
    
    try {
      const response = await fetch('/api/verify-auth-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addOutput('✓ 인증 성공!', 'success');
        addOutput('→ 대시보드로 이동합니다...', 'normal');
        
        // 세션 저장
        sessionStorage.setItem('dashboardAuth', JSON.stringify({
          email,
          authenticated: true,
          timestamp: Date.now()
        }));
        
        // 약간의 딜레이 후 대시보드로 이동
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError(data.error || '인증에 실패했습니다.');
        addOutput(`✗ Error: ${data.error || '잘못된 인증 코드'}`, 'error');
      }
    } catch (err) {
      setError('인증 중 오류가 발생했습니다.');
      addOutput('✗ Error: 네트워크 오류', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <button className={`${styles.terminalButton} ${styles.red}`} />
            <button className={`${styles.terminalButton} ${styles.yellow}`} />
            <button className={`${styles.terminalButton} ${styles.green}`} />
          </div>
          <span className={styles.terminalTitle}>Dashboard Login — Terminal</span>
        </div>
        
        <div className={styles.terminalBody}>
          <div className={styles.prompt}>Welcome to Claude Code Dashboard</div>
          <div className={styles.command}>
            <span className={styles.commandPrefix}>$</span>
            <span className={styles.commandText}>claude-auth login</span>
          </div>

          <div className={styles.stepIndicator}>
            <span className={`${styles.step} ${step === 'email' ? styles.active : ''}`}>
              1. 이메일
            </span>
            <span className={styles.stepArrow}>→</span>
            <span className={`${styles.step} ${step === 'code' ? styles.active : ''}`}>
              2. 인증 코드
            </span>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSendCode} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  관리자 이메일 주소를 입력하세요:
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputPrefix}>📧</span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className={styles.input}
                    required
                    autoFocus
                  />
                  {email && <span className={styles.cursor} />}
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !email}
                className={styles.button}
              >
                {loading ? (
                  <>
                    <span className={styles.loading} />
                    발송 중...
                  </>
                ) : (
                  '인증 코드 받기'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="code" className={styles.label}>
                  이메일로 받은 6자리 코드를 입력하세요:
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputPrefix}>🔑</span>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className={styles.input}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                    autoFocus
                  />
                  {code && <span className={styles.cursor} />}
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || code.length !== 6}
                className={styles.button}
              >
                {loading ? (
                  <>
                    <span className={styles.loading} />
                    확인 중...
                  </>
                ) : (
                  '로그인'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError('');
                  addOutput('$ claude-auth restart', 'normal');
                }}
                className={`${styles.button} ${styles.secondary}`}
                style={{ marginTop: '0.5rem', backgroundColor: '#666' }}
              >
                다시 시작
              </button>
            </form>
          )}

          {output.length > 0 && (
            <div className={styles.output}>
              {output.map((line, index) => (
                <div key={index} className={`${styles.outputLine} ${styles[line.type]}`}>
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}