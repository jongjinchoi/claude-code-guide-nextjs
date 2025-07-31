// UI 컴포넌트 관련 공통 타입 정의

// Badge 관련 타입
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  icon?: string;
  className?: string;
}

// Toast 관련 타입
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContainerProps {
  toasts: Toast[];
}

// Theme 관련 타입
export interface Theme {
  mode: 'light' | 'dark';
  isSystemPreference: boolean;
  manualThemeExpiry: number | null;
  fontSize: 'small' | 'medium' | 'large';
}

export interface ThemeConfig extends Theme {
  systemPrefersDark: boolean;
}

export interface ManualTheme {
  mode: 'light' | 'dark';
  expiryTime: number;
}

// Error Boundary 타입
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}