'use client';

import { useRef } from 'react';
import '../../styles/components/guide/step-buttons.css';

interface ResultButtonProps {
  step: string;
  result: 'success' | 'error';
  icon: string;
  title: string;
  description: string;
  disabled?: boolean;
  selected?: boolean;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
}

export default function ResultButton({ 
  step, 
  result, 
  icon, 
  title, 
  description,
  disabled = false,
  selected = false,
  onButtonClick
}: ResultButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleClick = () => {
    if (!disabled) {
      // 버튼 선택 저장 - 주석 처리
      // setSelectedButton(step, result);
      
      // 부모 컴포넌트로 버튼 클릭 알림
      if (onButtonClick) {
        onButtonClick(result, title);
      }
      
      // React 방식으로 처리 - 주석 처리
      // const event = new CustomEvent('guide-step-result', {
      //   detail: { step, result }
      // });
      // window.dispatchEvent(event);
      
      if (result === 'success') {
        // 성공 시 진행 상태 업데이트 - 주석 처리
        // completeStep(step);
        
        const stepNumber = getStepNumber(step);
        
        // GA4로 버튼 클릭 추적
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'button_click', {
            button_name: title,
            button_category: 'guide_progress',
            button_purpose: 'confirm_step_success',
            step: step,
            is_useful: true
          });
        }
      } else {
        // 에러 시 처리 - 주석 처리
        // addErrorStep(step);
        const stepNumber = getStepNumber(step);
        
        // GA4로 에러 추적
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'error_occurred', {
            error_message: `Step ${stepNumber} error: ${description}`,
            step_name: step,
            step_number: stepNumber,
            os: 'unknown'
          });
        }
        
        // GA4로 버튼 클릭 추적
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'button_click', {
            button_name: title,
            button_category: 'guide_progress',
            button_purpose: 'report_step_error',
            step: step,
            is_useful: true
          });
        }
      }
    }
  };
  
  // 헬퍼 함수
  const getStepNumber = (stepName: string): number => {
    const stepMap: Record<string, number> = {
      'start': 1, 'start-windows': 1,
      'homebrew': 2, 'git-windows': 2,
      'node': 3, 'node-windows': 3,
      'claude': 4, 'claude-windows': 4,
      'auth': 5, 'auth-windows': 5,
      'project': 6, 'project-windows': 6
    };
    return stepMap[stepName] || 0;
  };

  return (
    <button 
      ref={buttonRef}
      className={`result-btn ${result} ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
      data-step={step}
      data-result={result}
      onClick={handleClick}
      disabled={disabled}
    >
      <i className={`fas ${icon} icon`}></i>
      <div className="btn-text">
        <div className="main-text">{title}</div>
        <div className="sub-text">{description}</div>
      </div>
      {selected && (
        <>
          <div className="selected-indicator">✓</div>
          <span className="selected-label">선택됨</span>
        </>
      )}
    </button>
  );
}