'use client';

import { useState, useEffect } from 'react';
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

export default function GuideStep({ 
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
    const summaries: Record<string, string> = {
      'start': '터미널 사용법 숙지 완료 • 기본 명령어 이해',
      'start-windows': '터미널 사용법 숙지 완료 • 기본 명령어 이해',
      'homebrew': 'Homebrew 패키지 관리자 설치 완료',
      'git-windows': 'Git for Windows 설치 완료',
      'node': 'Node.js 및 npm 설치 완료',
      'node-windows': 'Node.js 및 npm 설치 완료',
      'claude': 'Claude Code CLI 설치 완료',
      'claude-windows': 'Claude Code CLI 설치 완료',
      'auth': 'Anthropic API 키 설정 완료',
      'auth-windows': 'Anthropic API 키 설정 완료',
      'project': '첫 프로젝트 생성 및 실행 완료',
      'project-windows': '첫 프로젝트 생성 및 실행 완료'
    };
    
    return summaries[step.id] || '';
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
          <span className="step-tag progress-tag">현재 진행 중</span>
        )}
        <h2>
          {step.title}
          {isCompleted && <span className="completed-text">(완료)</span>}
        </h2>
        <span className="time-estimate">
          {isCompleted ? (
            <button type="button" className="btn-read-only">읽기전용</button>
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
            전체 내용 다시 보기
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
              요약으로 돌아가기
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
}