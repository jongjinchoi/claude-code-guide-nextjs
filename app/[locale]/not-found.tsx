'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('404');
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
          <div className={styles.terminalTitle}>{t('terminal_title')}</div>
        </div>
        <div className={styles.terminalBody}>
          <p className={styles.lastLogin}>{t('last_login', { time: currentTime })}</p>
          
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{t('prompt')}</span>
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
            <span className={styles.errorPrefix}>{t('error_prefix')}</span> {t('error_message')}
          </p>
          
          <div className={styles.suggestions}>
            <p className={styles.suggestionTitle}>{t('suggestions.title')}</p>
            <div className={styles.suggestionList}>
              {['item1', 'item2', 'item3', 'item4'].map((itemKey, index) => {
                const item = t.raw(`suggestions.${itemKey}`);
                return (
                  <div key={itemKey} className={styles.suggestionItem}>
                    <code className={styles.code}>{item.command}</code>
                    <span className={styles.arrow}>{t('arrow')}</span>
                    <Link href={item.command === 'cd /' ? '/' : item.command.replace('cd ', '')} className={styles.link}>
                      {item.link}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.helpText}>
            <p>{t('help.moved_or_missing')}</p>
            <p dangerouslySetInnerHTML={{ 
              __html: t('help.contact', { email: `<a href="mailto:me@jongjinchoi.com" class="${styles.emailLink}">me@jongjinchoi.com</a>` })
            }} />
          </div>
          
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{t('prompt')}</span>
            <span className={styles.cursor}>▊</span>
          </div>
        </div>
      </div>
    </div>
  );
}