'use client';

import { useState, useEffect, memo } from 'react';
import { useTranslations } from 'next-intl';
import StepContent from './steps/StepContent';

interface GuideStepProps {
  step: {
    id: string;
    number: number;
    title: string;
    startTag?: string;
    timeEstimate: string;
    content: string;
  };
  os: 'mac' | 'windows';
  isActive: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  isReadOnly?: boolean;
  onToggleExpand: () => void;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
  onCodeCopy?: (codeType: string, codeAction: string) => void;
  selectedButton?: string;
  hasError?: boolean;
}

// React.memo로 불필요한 리렌더링 방지
const GuideStep = memo(function GuideStep({ 
  step, 
  os, 
  isActive, 
  isCompleted, 
  isExpanded,
  isReadOnly = false,
  onToggleExpand,
  onButtonClick,
  onCodeCopy,
  selectedButton,
  hasError = false
}: GuideStepProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('guide');
  
  // 클라이언트에서만 실행
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 완료 상태가 변경되면 showFullContent를 리셋
  useEffect(() => {
    if (isCompleted && !isExpanded) {
      setShowFullContent(false);
    }
  }, [isCompleted, isExpanded]);
  

  const handleHeaderClick = () => {
    if (isActive || isCompleted) {
      onToggleExpand();
    }
  };

  const getSummaryText = () => {
    return t(`summaries.${step.id}` as any) || '';
  };

  const sectionClasses = [
    'step-section',
    'os-specific',
    isActive && 'is-active',
    isCompleted && 'is-completed',
    isExpanded && 'is-expanded',
    showFullContent && 'is-show-full'
  ].filter(Boolean).join(' ');

  // 서버 사이드에서는 기본 상태로 렌더링
  if (!mounted) {
    return (
      <section 
        className="step-section os-specific"
        data-os={os}
        data-step={step.number}
        id={`step-${step.id}`}
        suppressHydrationWarning
      >
        <div className="step-header">
          <div className="step-number">{step.number}</div>
          <h2>{step.title}</h2>
          <span className="time-estimate">
            <i className="fas fa-clock"></i> {step.timeEstimate}
          </span>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={sectionClasses}
      data-os={os}
      data-step={step.number}
      id={`step-${step.id}`}
    >
      <div className="step-header" onClick={handleHeaderClick}>
        <div className="step-number">{step.number}</div>
        {step.startTag && !isCompleted && (
          <span className="step-tag">{step.startTag}</span>
        )}
        {isActive && step.number > 1 && !isCompleted && (
          <span className="step-tag progress-tag">{t('stepTags.inProgress')}</span>
        )}
        <h2>
          {step.title}
          {isCompleted && <span className="completed-text">{t('stepTags.completed')}</span>}
        </h2>
        <span className="time-estimate">
          {isCompleted ? (
            <button type="button" className="btn-read-only">{t('stepTags.readOnly')}</button>
          ) : (
            <>
              <i className="fas fa-clock"></i> {step.timeEstimate}
            </>
          )}
        </span>
      </div>

      {isCompleted && isExpanded && !showFullContent && (
        <div className="step-summary">
          <div className="step-summary-content">
            <i className="fas fa-check-circle step-summary-icon"></i>
            <div className="step-summary-text">{getSummaryText()}</div>
          </div>
          <button 
            className="btn-view-full-content"
            onClick={(e) => {
              e.stopPropagation();
              setShowFullContent(true);
            }}
          >
            <i className="fas fa-expand"></i>
            {t('summaryButtons.viewFullContent')}
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="step-content">
          {isCompleted && showFullContent && (
            <button 
              className="btn-back-to-summary"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullContent(false);
              }}
            >
              <i className="fas fa-compress"></i>
              {t('summaryButtons.backToSummary')}
            </button>
          )}
          {(!isCompleted || showFullContent) && (
            <StepContent 
              stepId={step.content} 
              isReadOnly={isReadOnly}
              onButtonClick={onButtonClick}
              onCodeCopy={onCodeCopy}
              selectedButton={selectedButton}
              hasError={hasError}
            />
          )}
        </div>
      )}
    </section>
  );
});

export default GuideStep;