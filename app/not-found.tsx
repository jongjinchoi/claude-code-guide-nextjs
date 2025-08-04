'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './not-found.module.css';

export default function NotFound() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [pathname, setPathname] = useState<string>('/404');
  
  useEffect(() => {
    // 클라이언트에서만 실행
    setCurrentTime(new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }));
    
    // 현재 경로 설정
    setPathname(window.location.pathname);
    
    // 404 페이지에서 네비게이션과 다른 요소들 숨기기
    const navigation = document.querySelector('nav') as HTMLElement;
    const copyright = document.querySelector('.copyright-sidebar') as HTMLElement;
    const logo = document.querySelector('.logo-wrapper') as HTMLElement;
    
    if (navigation) navigation.style.display = 'none';
    if (copyright) copyright.style.display = 'none';
    if (logo) logo.style.display = 'none';
    
    // cleanup: 페이지 이동 시 다시 보이게
    return () => {
      if (navigation) navigation.style.display = '';
      if (copyright) copyright.style.display = '';
      if (logo) logo.style.display = '';
    };
  }, []);

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.red}`}></span>
            <span className={`${styles.dot} ${styles.yellow}`}></span>
            <span className={`${styles.dot} ${styles.green}`}></span>
          </div>
          <div className={styles.terminalTitle}>404 — Terminal</div>
        </div>
        <div className={styles.terminalBody}>
          <p className={styles.lastLogin}>Last login: {currentTime} on ttys404</p>
          
          <div className={styles.commandLine}>
            <span className={styles.prompt}>whereiam@getclaudecode.com ~ %</span>
            <span className={styles.command}> ls {pathname}</span>
          </div>
          
          <pre className={styles.errorAscii}>
{`  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═████╗██║  ██║
  ███████║██║██╔██║███████║
  ╚════██║████╔╝██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝`}
          </pre>
          
          <p className={styles.errorMsg}>
            <span className={styles.errorPrefix}>zsh: no such file or directory:</span> 페이지를 찾을 수 없습니다
          </p>
          
          <div className={styles.suggestions}>
            <p className={styles.suggestionTitle}>💡 다음을 시도해보세요:</p>
            <div className={styles.suggestionList}>
              <div className={styles.suggestionItem}>
                <code className={styles.code}>cd /</code>
                <span className={styles.arrow}>→</span>
                <Link href="/" className={styles.link}>홈으로 돌아가기</Link>
              </div>
              <div className={styles.suggestionItem}>
                <code className={styles.code}>cd /guide</code>
                <span className={styles.arrow}>→</span>
                <Link href="/guide" className={styles.link}>가이드 시작하기</Link>
              </div>
              <div className={styles.suggestionItem}>
                <code className={styles.code}>cd /about</code>
                <span className={styles.arrow}>→</span>
                <Link href="/about" className={styles.link}>프로젝트 소개</Link>
              </div>
              <div className={styles.suggestionItem}>
                <code className={styles.code}>cd /faq</code>
                <span className={styles.arrow}>→</span>
                <Link href="/faq" className={styles.link}>자주 묻는 질문</Link>
              </div>
            </div>
          </div>

          <div className={styles.helpText}>
            <p>🔍 찾으시는 페이지가 이동되었거나 존재하지 않습니다.</p>
            <p>📧 문제가 계속되면 <a href="mailto:me@jongjinchoi.com" className={styles.emailLink}>me@jongjinchoi.com</a>으로 알려주세요.</p>
          </div>
          
          <div className={styles.commandLine}>
            <span className={styles.prompt}>whereiam@getclaudecode.com ~ %</span>
            <span className={styles.cursor}>▊</span>
          </div>
        </div>
      </div>
    </div>
  );
}