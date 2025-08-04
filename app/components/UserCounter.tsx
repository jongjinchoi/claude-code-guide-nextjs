'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function UserCounter() {
  const t = useTranslations('landing.counter');
  const [actualCount, setActualCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<string>('✨');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Supabase에서 카운터 조회
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/counter');
        if (response.ok) {
          const data = await response.json();
          setActualCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch counter:', error);
        setActualCount(15238); // 폴백 값
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  // 카운터 애니메이션
  useEffect(() => {
    if (actualCount !== null && !isLoading) {
      let start = 0;
      const end = actualCount;
      const duration = 2000;
      const stepTime = 50;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;
      
      setDisplayCount('0'); // 애니메이션 시작
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setDisplayCount(Math.floor(start).toLocaleString());
      }, stepTime);
      
      return () => clearInterval(timer);
    }
    
    // 조건이 false인 경우에도 cleanup function 반환
    return () => {};
  }, [actualCount, isLoading]);

  return (
    <>
      <div className="counter-number">
        {displayCount}
      </div>
      <div className="counter-text">{t('text')}</div>
    </>
  );
}