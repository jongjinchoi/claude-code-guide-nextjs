declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
    showToast?: (message: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
  }
}

export {};