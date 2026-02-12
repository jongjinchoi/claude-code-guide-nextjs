import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'auto';
  actualTheme: 'light' | 'dark'; // 실제 적용된 테마
  fontSize: number;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;
const DEFAULT_FONT_SIZE = 16;

// 시스템 테마 감지 헬퍼 함수
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// 실제 적용할 테마 계산
const getActualTheme = (theme: 'light' | 'dark' | 'auto'): 'light' | 'dark' => {
  if (theme === 'auto') {
    return getSystemTheme();
  }
  return theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'auto',
      actualTheme: getSystemTheme(),
      fontSize: DEFAULT_FONT_SIZE,
      
      toggleTheme: () => 
        set((state) => {
          // auto -> light -> dark -> auto 순환
          let newTheme: 'light' | 'dark' | 'auto';
          if (state.theme === 'auto') {
            newTheme = 'light';
          } else if (state.theme === 'light') {
            newTheme = 'dark';
          } else {
            newTheme = 'auto';
          }
          
          const actualTheme = getActualTheme(newTheme);
          
          // DOM 업데이트
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', actualTheme);
          }
          
          return { theme: newTheme, actualTheme };
        }),
      
      setTheme: (theme) => 
        set(() => {
          const actualTheme = getActualTheme(theme);
          
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', actualTheme);
          }
          
          return { theme, actualTheme };
        }),
      
      increaseFontSize: () => 
        set((state) => {
          const newSize = Math.min(state.fontSize + 2, MAX_FONT_SIZE);
          if (typeof document !== 'undefined') {
            document.documentElement.style.fontSize = `${newSize}px`;
          }
          return { fontSize: newSize };
        }),
      
      decreaseFontSize: () => 
        set((state) => {
          const newSize = Math.max(state.fontSize - 2, MIN_FONT_SIZE);
          if (typeof document !== 'undefined') {
            document.documentElement.style.fontSize = `${newSize}px`;
          }
          return { fontSize: newSize };
        }),
      
      resetFontSize: () => 
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
          }
          return { fontSize: DEFAULT_FONT_SIZE };
        })
    }),
    {
      name: 'theme-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            ...persistedState,
            theme: persistedState?.theme || 'auto',
            fontSize: persistedState?.fontSize || DEFAULT_FONT_SIZE
          };
        }
        return persistedState as ThemeState;
      },
      onRehydrateStorage: () => (state) => {
        // 저장된 상태 복원 시 DOM 업데이트
        if (state && typeof document !== 'undefined') {
          const actualTheme = getActualTheme(state.theme);
          document.documentElement.setAttribute('data-theme', actualTheme);
          document.documentElement.style.fontSize = `${state.fontSize}px`;
          // actualTheme도 업데이트
          state.actualTheme = actualTheme;
        }
      }
    }
  )
);