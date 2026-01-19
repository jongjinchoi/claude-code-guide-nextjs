'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import styles from './dashboard-login.module.css';

export default function DashboardLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setError('허용되지 않은 이메일입니다. me@jongjinchoi.com으로 로그인해주세요.');
    } else if (errorParam === 'auth_failed') {
      setError('인증에 실패했습니다. 다시 시도해주세요.');
    }
  }, [searchParams]);

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
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
            <span className={styles.commandText}>claude-auth login --provider github</span>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <p className={styles.label}>
                GitHub 계정으로 로그인하세요.
              </p>
              <p className={styles.subLabel}>
                허용된 이메일: me@jongjinchoi.com
              </p>
            </div>

            <button
              onClick={handleGitHubLogin}
              disabled={loading}
              className={styles.githubButton}
            >
              {loading ? (
                <>
                  <span className={styles.loading} />
                  로그인 중...
                </>
              ) : (
                <>
                  <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub으로 로그인
                </>
              )}
            </button>
          </div>

          <div className={styles.output}>
            <div className={styles.outputLine}>
              → GitHub 계정의 이메일이 허용 목록에 있어야 합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
