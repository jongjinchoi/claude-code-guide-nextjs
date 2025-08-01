'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ReturnToGuide.module.css';

export default function ReturnToGuide() {
  const [returnUrl, setReturnUrl] = useState('/guide');
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [shouldShow, setShouldShow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // return 파라미터가 있는지 확인
    const returnParam = searchParams.get('return');
    
    if (returnParam) {
      const decodedUrl = decodeURIComponent(returnParam);
      
      // Extract current step and done parameters from the URL
      let current: number | null = null;
      let done: string | null = null;
      
      try {
        const url = new URL(decodedUrl);
        const currentParam = url.searchParams.get('current');
        const doneParam = url.searchParams.get('done');
        
        if (currentParam) {
          current = parseInt(currentParam);
        }
        done = doneParam;
      } catch (e) {
        // If it's not a full URL, try to parse as relative URL
        const currentMatch = decodedUrl.match(/[?&]current=(\d+)/);
        const doneMatch = decodedUrl.match(/[?&]done=([^&]+)/);
        
        if (currentMatch && currentMatch[1]) {
          current = parseInt(currentMatch[1]);
        }
        if (doneMatch && doneMatch[1]) {
          done = doneMatch[1];
        }
      }
      
      // 6단계 모두 완료된 경우 버튼 숨김
      // done=1-6이면 모든 단계 완료
      const isFullyCompleted = done === '1-6';
      
      if (isFullyCompleted) {
        setShouldShow(false);
      } else {
        // 진행 중인 가이드가 있으면 버튼 표시
        setShouldShow(true);
        setReturnUrl(decodedUrl);
        setCurrentStep(current);
      }
    } else {
      // return 파라미터가 없으면 버튼 숨김
      setShouldShow(false);
    }
  }, [searchParams]);

  // return 파라미터가 없으면 버튼을 렌더링하지 않음
  if (!shouldShow) {
    return null;
  }

  const handleReturnToGuide = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(returnUrl);
  };

  return (
    <button onClick={handleReturnToGuide} className={styles.returnToGuide}>
      <div className={styles.returnToGuideContent}>
        <div className={styles.returnToGuideMain}>
          <svg className={styles.returnToGuideIcon} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className={styles.returnToGuideText}>가이드로 돌아가기</span>
        </div>
        {currentStep && (
          <div className={styles.currentStepInfo}>
            현재 {currentStep}단계 진행 중
          </div>
        )}
      </div>
    </button>
  );
}