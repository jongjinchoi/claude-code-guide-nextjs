'use client';

import { useCallback } from 'react';

export function useLogo() {

  const handleLogoClick = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    // 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // GA4로 로고 클릭 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'button_click', {
        action_type: 'navigation',
        action_target: 'logo',
        action_value: 'scroll_to_top',
        page_path: window.location.pathname
      });
    }
  }, []);

  return {
    handleLogoClick
  };
}