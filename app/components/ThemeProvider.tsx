'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/app/lib/stores/themeStore';
import { useToast } from '@/app/components/Toast';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, actualTheme } = useThemeStore();
  const { showToast } = useToast();

  // 시스템 테마 변경 감지
  useEffect(() => {
    // auto 모드일 때만 시스템 테마 변경 감지
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        // actualTheme 업데이트를 위해 setTheme 호출
        setTheme('auto');
      }
    };

    // 이벤트 리스너 등록
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // 구형 브라우저 대응
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, setTheme]);

  // 레거시 코드 호환성을 위한 전역 함수 등록
  // (Zustand persist 미들웨어가 localStorage에서 자동으로 테마 복원)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ThemeManager 전역 객체
      (window as any).ThemeManager = {
        toggle: () => {
          // Zustand store 업데이트
          useThemeStore.getState().toggleTheme();
          
          const newTheme = useThemeStore.getState().theme;
          let message = '';
          
          if (newTheme === 'auto') {
            message = '시스템 설정을 따르도록 변경되었습니다.';
          } else if (newTheme === 'dark') {
            message = '다크 모드로 전환되었습니다.';
          } else {
            message = '라이트 모드로 전환되었습니다.';
          }
          
          // 토스트 알림
          showToast(message, 'info');
        },
        getCurrentTheme: () => useThemeStore.getState().actualTheme
      };
      
      // FontController를 위한 useThemeStore 참조
      (window as any).useThemeStore = useThemeStore;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).ThemeManager;
        delete (window as any).useThemeStore;
      }
    };
  }, [showToast]);

  return <>{children}</>;
}