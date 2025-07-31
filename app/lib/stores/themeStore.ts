import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  fontSize: number;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 20;
const DEFAULT_FONT_SIZE = 16;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: DEFAULT_FONT_SIZE,
      
      toggleTheme: () => 
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // DOM 업데이트
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
          }
          return { theme: newTheme };
        }),
      
      setTheme: (theme) => 
        set(() => {
          if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
          }
          return { theme };
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
      onRehydrateStorage: () => (state) => {
        // 저장된 상태 복원 시 DOM 업데이트
        if (state && typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', state.theme);
          document.documentElement.style.fontSize = `${state.fontSize}px`;
        }
      }
    }
  )
);