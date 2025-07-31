'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/app/lib/stores/themeStore';
import { useToast } from '@/app/components/Toast';

interface Theme {
  name: string;
  theme: 'light' | 'dark';
  icon: string;
  hours: number[];
}

interface ThemeConfig extends Theme {
  key: 'day' | 'night';
}

interface ManualTheme {
  date: string;
  themeKey: 'day' | 'night';
  theme: 'light' | 'dark';
}

const themes = {
  day: {
    name: '밝은',
    theme: 'light' as const,
    icon: 'fas fa-sun',
    hours: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]  // 오전 5시 ~ 오후 7시
  },
  night: {
    name: '어두운',
    theme: 'dark' as const,
    icon: 'fas fa-moon',
    hours: [20, 21, 22, 23, 0, 1, 2, 3, 4]  // 오후 8시 ~ 오전 4시
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();
  const { showToast } = useToast();

  // 시간 기반 테마 가져오기
  const getTimeBasedTheme = (): ThemeConfig => {
    const hour = new Date().getHours();
    
    for (const [key, theme] of Object.entries(themes) as [keyof typeof themes, Theme][]) {
      if (theme.hours.includes(hour)) {
        return { key, ...theme };
      }
    }
    
    return { key: 'day', ...themes.day };
  };

  // 테마 초기화
  useEffect(() => {
    // 수동 테마 확인
    const manualThemeStr = localStorage.getItem('claude-code-guide-manual-theme');
    if (manualThemeStr) {
      try {
        const { date, theme: savedTheme }: ManualTheme = JSON.parse(manualThemeStr);
        const today = new Date().toDateString();
        
        // 오늘 수동으로 변경한 경우 유지
        if (date === today && savedTheme) {
          setTheme(savedTheme);
          return;
        }
      } catch (e) {
        console.error('Error parsing manual theme:', e);
      }
    }
    
    // Zustand에 저장된 테마가 있으면 사용
    const storedTheme = localStorage.getItem('theme-storage');
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme);
        if (parsed.state?.theme) {
          setTheme(parsed.state.theme);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored theme:', e);
      }
    }
    
    // 시간 기반 테마 적용
    const currentTheme = getTimeBasedTheme();
    setTheme(currentTheme.theme);
  }, [setTheme]);

  // 레거시 코드 호환성을 위한 전역 함수 등록
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ThemeManager 전역 객체
      (window as any).ThemeManager = {
        toggle: () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newThemeKey = currentTheme === 'dark' ? 'day' : 'night';
          const newTheme = themes[newThemeKey];
          
          // Zustand store 업데이트
          useThemeStore.getState().toggleTheme();
          
          // 수동 변경 저장
          localStorage.setItem('claude-code-guide-manual-theme', JSON.stringify({
            date: new Date().toDateString(),
            themeKey: newThemeKey,
            theme: newTheme.theme
          }));
          
          // 토스트 알림
          showToast(`${newTheme.name} 모드로 전환되었습니다. 오늘 하루 동안 유지됩니다.`, 'info');
        },
        getCurrentTheme: () => useThemeStore.getState().theme
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