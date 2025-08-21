'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  actions?: ToastAction[];
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number, actions?: ToastAction[]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000, actions?: ToastAction[]) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration, actions };
    
    setToasts(prev => [...prev, newToast]);

    // 자동 제거 (액션 버튼이 있으면 시간 연장)
    const autoCloseDuration = actions ? Math.max(duration, 10000) : duration;
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, autoCloseDuration + 300); // 애니메이션 시간 포함
  }, []);

  // 전역 함수로도 노출 (레거시 코드 호환성)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).showToast = showToast;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).showToast;
      }
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && createPortal(
        <ToastContainer toasts={toasts} />,
        document.body
      )}
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 애니메이션 트리거
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // 액션 버튼이 없을 때만 자동 페이드아웃
    if (!toast.actions) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
    
    // 액션 버튼이 있을 때는 cleanup 함수 필요 없음
    return undefined;
  }, [toast.duration, toast.actions]);

  const handleActionClick = (action: ToastAction) => {
    action.onClick();
    setIsVisible(false);
    setTimeout(onRemove, 300); // 애니메이션 후 제거
  };

  const className = `${styles.toast} ${styles[toast.type]} ${isVisible ? styles.isVisible : ''}`;

  return (
    <div className={className}>
      <div className={styles.toastMessage}>{toast.message}</div>
      {toast.actions && (
        <div className={styles.toastActions}>
          {toast.actions.map((action, index) => (
            <button
              key={index}
              className={`${styles.toastButton} ${index === 0 ? styles.primary : styles.secondary}`}
              onClick={() => handleActionClick(action)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
}

function ToastContainer({ toasts }: ToastContainerProps) {
  const [localToasts, setLocalToasts] = useState(toasts);

  useEffect(() => {
    setLocalToasts(toasts);
  }, [toasts]);

  const handleRemove = (id: string) => {
    setLocalToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className={styles.toastContainer}>
      {localToasts.map(toast => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onRemove={() => handleRemove(toast.id)}
        />
      ))}
    </div>
  );
}