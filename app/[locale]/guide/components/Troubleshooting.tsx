'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import '../../../styles/components/troubleshooting.css';

interface TroubleshootingProps {
  id: string;
  step: string;
  children: React.ReactNode;
  active?: boolean;
  onResolved?: () => void;
  isReadOnly?: boolean;
  isResolvedSelected?: boolean;
}

export default function Troubleshooting({ 
  id, 
  step, 
  children, 
  active = false, 
  onResolved,
  isReadOnly = false,
  isResolvedSelected = false 
}: TroubleshootingProps) {
  const [isResolved, setIsResolved] = useState(false);
  const t = useTranslations('guide');

  const handleResolution = () => {
    if (!isResolved && !isReadOnly) {
      setIsResolved(true);
      // 부모 컴포넌트에 문제 해결 알림
      if (onResolved) {
        onResolved();
      }
    }
  };
  
  // 문제가 해결된 상태로 표시할지 결정
  const shouldShowAsResolved = isResolved || (isReadOnly && isResolvedSelected);

  return (
    <div className={`troubleshooting ${active ? 'is-active' : ''}`} id={id}>
      <h3><i className="fas fa-wrench"></i> {t('troubleshooting.common.title')}</h3>
      <div className="troubleshooting-content">
        {children}
        
        <div className="troubleshooting-resolution">
          <h4>{t('troubleshooting.common.resolvedTitle')}</h4>
          <button 
            className={`resolution-check ${shouldShowAsResolved ? 'is-resolved' : ''}`}
            onClick={handleResolution}
            disabled={isReadOnly || shouldShowAsResolved}
            type="button"
          >
            <div className="resolution-check-icon">
              {shouldShowAsResolved && <i className="fas fa-check"></i>}
            </div>
            <div className="resolution-check-content">
              <div className="resolution-check-title">{t('troubleshooting.common.completedTitle')}</div>
              <div className="resolution-check-desc">
                {t(`troubleshooting.resolutions.${step}`)}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}