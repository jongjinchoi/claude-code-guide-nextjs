'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// 브라우저 감지 유틸리티
function detectOS(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('mac')) return 'macOS';
  if (userAgent.includes('win')) return 'Windows';
  if (userAgent.includes('linux')) return 'Linux';
  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('ios') || userAgent.includes('iphone') || userAgent.includes('ipad')) return 'iOS';
  
  return 'Unknown';
}

function detectBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('edge')) return 'Edge';
  if (userAgent.includes('chrome') && !userAgent.includes('edge')) return 'Chrome';
  if (userAgent.includes('firefox')) return 'Firefox';
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
  
  return 'Other';
}

function detectDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('mobile')) return 'mobile';
  if (userAgent.includes('tablet')) return 'tablet';
  
  return 'desktop';
}

interface GuideTracker {
  sessionId: string;
  startTime: number;
  currentStep: number;
  stepStartTime: number;
  errors: Array<{step: number; error: string; timestamp: string}>;
}

export function useGuideTracking() {
  const [tracker] = useState<GuideTracker>(() => ({
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    currentStep: 0,
    stepStartTime: Date.now(),
    errors: []
  }));

  // 세션 시작
  useEffect(() => {
    const initSession = async () => {
      try {
        await fetch('/api/guide-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'start_session',
            session_id: tracker.sessionId,
            data: {
              os: detectOS(),
              browser: detectBrowser(),
              device_type: detectDeviceType(),
              referrer_source: document.referrer || 'direct',
              landing_page: window.location.pathname
            }
          })
        });
      } catch (error) {
        console.error('Failed to start tracking session:', error);
      }
    };
    
    initSession();
    
    // 페이지 떠날 때 시간 기록
    return () => {
      const totalTime = Math.floor((Date.now() - tracker.startTime) / 1000);
      
      // sendBeacon은 페이지 종료 시에도 요청 보장
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/guide-tracking', JSON.stringify({
          action: 'session_end',
          session_id: tracker.sessionId,
          total_time: totalTime
        }));
      }
    };
  }, [tracker]);

  // 단계 진행 추적
  const trackStepProgress = useCallback((stepNumber: number, stepName: string) => {
    const timeOnPreviousStep = Math.floor((Date.now() - tracker.stepStartTime) / 1000);
    
    fetch('/api/guide-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'step_progress',
        session_id: tracker.sessionId,
        data: {
          step_number: stepNumber,
          step_name: stepName,
          time_on_previous_step: timeOnPreviousStep
        }
      })
    }).catch(error => {
      console.error('Failed to track step progress:', error);
    });

    tracker.currentStep = stepNumber;
    tracker.stepStartTime = Date.now();
  }, [tracker]);

  // 단계 클릭 추적 (새로운 함수)
  const trackStepClick = useCallback((stepNumber: number, actionType: 'expand' | 'collapse' | 'complete' | 'error') => {
    fetch('/api/guide-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'step_click',
        session_id: tracker.sessionId,
        data: {
          step_number: stepNumber,
          action_type: actionType,
          os: detectOS(),
          browser: detectBrowser()
        }
      })
    }).catch(error => {
      console.error('Failed to track step click:', error);
    });
  }, [tracker]);

  // 에러 추적
  const trackError = useCallback((error: string, context?: any) => {
    const errorData = {
      step: tracker.currentStep,
      error: error,
      timestamp: new Date().toISOString(),
      context
    };

    tracker.errors.push(errorData);

    fetch('/api/guide-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'track_error',
        session_id: tracker.sessionId,
        data: errorData
      })
    }).catch(err => {
      console.error('Failed to track error:', err);
    });
  }, [tracker]);

  // 가이드 완료
  const trackCompletion = useCallback(() => {
    const totalTime = Math.floor((Date.now() - tracker.startTime) / 1000);
    
    fetch('/api/guide-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'complete_guide',
        session_id: tracker.sessionId,
        data: {
          total_time: totalTime,
          error_count: tracker.errors.length
        }
      })
    }).catch(error => {
      console.error('Failed to track completion:', error);
    });
  }, [tracker]);

  // 도움말 조회 추적
  const trackHelpView = useCallback((helpType: string) => {
    fetch('/api/guide-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'view_help',
        session_id: tracker.sessionId,
        data: {
          help_type: helpType,
          current_step: tracker.currentStep
        }
      })
    }).catch(error => {
      console.error('Failed to track help view:', error);
    });
  }, [tracker]);

  // 브라우저 핑거프린트 생성 (재시도 추적용)
  const generateFingerprint = useCallback((): string => {
    if (typeof window === 'undefined') return 'unknown';
    
    const screen = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    return `${detectOS()}_${detectBrowser()}_${screen}_${timezone}_${language}`;
  }, []);

  return {
    trackStepProgress,
    trackStepClick,
    trackError,
    trackCompletion,
    trackHelpView,
    sessionId: tracker.sessionId,
    fingerprint: generateFingerprint()
  };
}