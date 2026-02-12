'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 설정 타입
interface SimplifiedConfig {
  measurementId: string;
  minTimeOnPage?: number; // 최소 체류 시간 (초)
  enableSupabase?: boolean; // Supabase 통합 활성화
}

// 간소화된 분석 클래스
export class SimplifiedAnalytics {
  private config: SimplifiedConfig;
  private pageStartTime: number = 0;
  private currentPath: string = '';
  private sessionId: string = '';

  constructor(config: SimplifiedConfig) {
    this.config = {
      minTimeOnPage: 3, // 기본 3초
      enableSupabase: true, // 기본적으로 Supabase 활성화
      ...config
    };
    this.sessionId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.initialize();
  }

  private initialize() {
    // GA4가 이미 로드되어 있는지 확인
    if (typeof window !== 'undefined' && window.gtag) {
      // 페이지뷰는 자동으로 전송되지 않도록 설정
      window.gtag('config', this.config.measurementId, {
        send_page_view: false
      });
    }
  }

  // 페이지뷰 추적
  async trackPageView(pathname: string) {
    // 이전 페이지 이탈 추적
    if (this.currentPath && this.pageStartTime) {
      await this.trackPageExit();
    }

    // 새 페이지 추적
    this.currentPath = pathname;
    this.pageStartTime = Date.now();

    // GA4 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title
      });
    }

    // Supabase 추적
    if (this.config.enableSupabase) {
      try {
        const insertData = {
          session_id: this.sessionId,
          page_path: pathname,
          page_title: document.title,
          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          timestamp: new Date().toISOString()
        };
        
        console.log('[Analytics] Tracking pageview:', insertData);
        
        const { data, error } = await supabase.from('page_analytics').insert(insertData);
        
        if (error) {
          console.error('[Analytics] Supabase insert error:', error);
        } else {
          console.log('[Analytics] Pageview tracked successfully:', data);
        }
      } catch (error) {
        console.error('Failed to track pageview in Supabase:', error);
      }
    }
  }

  // 페이지 이탈 추적
  async trackPageExit() {
    if (!this.pageStartTime) return;

    const timeOnPage = Math.round((Date.now() - this.pageStartTime) / 1000);
    
    // 최소 시간 체크
    if (timeOnPage >= (this.config?.minTimeOnPage || 3)) {
      // GA4 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_exit', {
          page_path: this.currentPath,
          time_on_page: timeOnPage
        });
      }

      // Supabase 추적
      if (this.config.enableSupabase) {
        try {
          await supabase.from('page_analytics').update({
            time_on_page_seconds: timeOnPage,
            exit_timestamp: new Date().toISOString()
          })
          .eq('session_id', this.sessionId)
          .eq('page_path', this.currentPath)
          .order('timestamp', { ascending: false })
          .limit(1);
        } catch (error) {
          console.error('Failed to track page exit in Supabase:', error);
        }
      }
    }
  }

  // 버튼 클릭 추적 (컴포넌트에서 직접 gtag 호출하므로 여기서는 헬퍼만 제공)
  static async trackButtonClick(buttonName: string, category: string, metadata?: any) {
    // GA4 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'button_click', {
        button_name: buttonName,
        button_category: category,
        ...metadata
      });
    }

    // Supabase 추적 (정적 메서드이므로 직접 supabase 사용)
    try {
      await supabase.from('user_events').insert({
        event_type: 'button_click',
        event_data: {
          button_name: buttonName,
          button_category: category,
          ...metadata
        },
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to track button click in Supabase:', error);
    }
  }

  // 코드 복사 추적
  static async trackCodeCopy(codeType: string, metadata?: any) {
    // GA4 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'code_copy', {
        code_type: codeType,
        ...metadata
      });
    }

    // Supabase 추적
    try {
      await supabase.from('user_events').insert({
        event_type: 'code_copy',
        event_data: {
          code_type: codeType,
          ...metadata
        },
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to track code copy in Supabase:', error);
    }
  }

  // 정리
  async cleanup() {
    await this.trackPageExit();
    this.pageStartTime = 0;
    this.currentPath = '';
    this.sessionId = '';
  }
}

// React Hook
export function useSimplifiedAnalytics(config?: Partial<SimplifiedConfig>) {
  const pathname = usePathname();
  const analyticsRef = useRef<SimplifiedAnalytics | null>(null);

  // 초기화
  useEffect(() => {
    if (!analyticsRef.current) {
      analyticsRef.current = new SimplifiedAnalytics({
        measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2XGK1CF366',
        ...config
      });
    }
  }, []);

  // 페이지 변경 추적
  useEffect(() => {
    if (analyticsRef.current) {
      analyticsRef.current.trackPageView(pathname);
    }
  }, [pathname]);

  // 언마운트 시 정리
  useEffect(() => {
    const analytics = analyticsRef.current;
    
    // 페이지 언로드 시
    const handleUnload = () => {
      if (analytics) {
        analytics.cleanup();
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
      if (analytics) {
        analytics.cleanup();
      }
    };
  }, []);

  return analyticsRef.current;
}

// Provider 컴포넌트
export function SimplifiedAnalyticsProvider({ 
  children,
  config 
}: { 
  children: React.ReactNode;
  config?: Partial<SimplifiedConfig>;
}) {
  useSimplifiedAnalytics(config);
  return <>{children}</>;
}