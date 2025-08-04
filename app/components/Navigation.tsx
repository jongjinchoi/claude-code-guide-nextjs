'use client';

import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { useLogo } from '@/app/hooks/useLogo';
import styles from './Navigation.module.css';

export default function Navigation() {
  const t = useTranslations('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const { handleLogoClick } = useLogo();
  
  // FAQ와 About 링크에 return 파라미터 추가 (Guide 페이지에서만)
  const [faqLink, setFaqLink] = useState('/faq');
  const [aboutLink, setAboutLink] = useState('/about');
  
  useEffect(() => {
    if (pathname.includes('/guide')) {
      // Guide 페이지에서만 return 파라미터 추가
      const updateLinks = () => {
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        
        // 현재 URL에서 완료 상태 확인
        const currentParam = url.searchParams.get('current');
        const doneParam = url.searchParams.get('done');
        
        // 6단계 완료 상태 체크
        // done=1-6이면 모든 단계 완료 (current는 없음)
        const isFullyCompleted = doneParam === '1-6';
        
        if (isFullyCompleted) {
          setFaqLink('/faq');
          setAboutLink('/about');
          return;
        }
        
        // URL에 current 파라미터가 없고 done 파라미터도 없으면 return 파라미터 추가하지 않음
        // (아직 아무것도 완료하지 않은 상태)
        if (!currentParam && !doneParam) {
          setFaqLink('/faq');
          setAboutLink('/about');
          return;
        }
        
        // Guide 페이지에서만 return 파라미터 추가 (완료되지 않은 경우에만)
        const updatedUrl = url.toString();
        setFaqLink(`/faq?return=${encodeURIComponent(updatedUrl)}`);
        setAboutLink('/about');
      };
      
      // 초기 실행
      updateLinks();
      
      // popstate 이벤트 리스너 추가 (브라우저 뒤로/앞으로 버튼)
      const handlePopState = () => updateLinks();
      window.addEventListener('popstate', handlePopState);
      
      // Guide 페이지의 URL 업데이트를 감지하기 위한 커스텀 이벤트 리스너
      const handleGuideUpdate = () => updateLinks();
      window.addEventListener('guideURLUpdated', handleGuideUpdate);
      
      // URL 변경을 주기적으로 체크 (실시간 감지가 안될 경우 대비)
      let lastUrl = window.location.href;
      const intervalId = setInterval(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== lastUrl) {
          lastUrl = currentUrl;
          updateLinks();
        }
      }, 500); // 0.5초마다 체크
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('guideURLUpdated', handleGuideUpdate);
        clearInterval(intervalId);
      };
    } else {
      // Guide 페이지가 아닌 경우 기본 링크 사용 (return 파라미터 없음)
      setFaqLink('/faq');
      setAboutLink('/about');
    }
    
    // cleanup 함수가 없으므로 undefined 반환
    return undefined;
  }, [pathname]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // 대시보드 페이지에서는 네비게이션 숨기기
  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  
  // 메인 페이지에서도 네비게이션 숨기기 (locale 포함)
  if (pathname === `/${locale}` || pathname === '/' || pathname === '/ko' || pathname === '/en') {
    return null;
  }

  return (
    <>
      <nav className={styles.navMinimal}>
        <Link 
          href="/" 
          className={styles.navLogo}
          onClick={handleLogoClick}
        >
          <i className="fas fa-robot"></i>
          <span>{t('navigation.logo')}</span>
        </Link>
        <div className={styles.navItems}>
          <Link href="/" className={isActive('/') ? styles.isActive : ''}>
            {t('navigation.home')}
          </Link>
          <Link href={aboutLink} className={isActive('/about') ? styles.isActive : ''}>
            {t('navigation.about')}
          </Link>
          <Link href="/guide" className={isActive('/guide') ? styles.isActive : ''}>
            {t('navigation.guide')}
          </Link>
          <Link href={faqLink} className={isActive('/faq') ? styles.isActive : ''}>
            {t('navigation.help')}
          </Link>
        </div>
        <button 
          className={styles.navHamburger} 
          aria-label={t('navigation.mobile_menu_open')}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.isActive : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.isActive : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <Link 
            href="/" 
            className={styles.navLogo}
            onClick={handleLogoClick}
          >
            <i className="fas fa-robot"></i>
            <span>{t('navigation.logo')}</span>
          </Link>
          <button 
            className={styles.mobileMenuClose} 
            aria-label={t('navigation.mobile_menu_close')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.mobileMenuItems}>
          <Link href="/" className={isActive('/') ? styles.isActive : ''}>
            {t('navigation.home')}
          </Link>
          <Link href={aboutLink} className={isActive('/about') ? styles.isActive : ''}>
            {t('navigation.about')}
          </Link>
          <Link href="/guide" className={isActive('/guide') ? styles.isActive : ''}>
            {t('navigation.guide')}
          </Link>
          <Link href={faqLink} className={isActive('/faq') ? styles.isActive : ''}>
            {t('navigation.help')}
          </Link>
        </div>
      </div>
    </>
  );
}