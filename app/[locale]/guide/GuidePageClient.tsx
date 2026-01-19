'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createStepId } from '@/app/types/guide';
import GuideStep from './components/GuideStep';
import PageHeader from '../../components/PageHeader';
import HeaderControls from '../../components/HeaderControls';
import ProgressBar from './components/ProgressBar';
import CompletionModal from './components/CompletionModal';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useGuideTracking } from '@/app/hooks/useGuideTracking';
import { scrollToElement } from '@/app/utils/smoothScroll';
import { useToast } from '@/app/components/Toast';

// 스타일 imports
import '../../styles/pages/guide.css';
import '../../styles/components/guide-step-imports.css';

// sessionStorage 키 상수
const STORAGE_KEYS = {
  MODAL_CLOSED: 'completion-modal-closed',
  SELECTED_BUTTONS: 'guide-selected-buttons',
  START_TIME: 'guide-start-time',
} as const;

// sessionStorage 캐시 헬퍼 (js-cache-storage)
const storageCache = {
  _cache: new Map<string, string | null>(),

  get(key: string): string | null {
    if (!this._cache.has(key)) {
      this._cache.set(key, typeof window !== 'undefined' ? sessionStorage.getItem(key) : null);
    }
    return this._cache.get(key) ?? null;
  },

  set(key: string, value: string): void {
    this._cache.set(key, value);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  },

  invalidate(key: string): void {
    this._cache.delete(key);
  }
};

export default function GuidePageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('guide');
  const { showToast } = useToast();

  // 단계 진입 시간 추적
  const stepStartTimeRef = useRef<number>(Date.now());
  
  // 추적 시스템 초기화
  const { 
    trackStepProgress, 
    trackStepClick,
    trackError, 
    trackCompletion,
    trackHelpView 
  } = useGuideTracking();
  
  // 페이지 첫 로드 시 가이드 페이지 진입 추적
  useEffect(() => {
    // 가이드 페이지 첫 진입 시 1단계로 추적
    const timer = setTimeout(() => {
      if (current === 1 || (!searchParams.get('current') && !doneParam)) {
        console.log('Tracking initial guide page visit - step 1');
        trackStepProgress(1, 'step1');
      }
    }, 100); // 약간의 지연을 주어 세션이 먼저 생성되도록 함
    
    return () => clearTimeout(timer);
  }, []);
  
  // 임시: localStorage 완전히 제거
  if (typeof window !== 'undefined') {
    localStorage.removeItem('guide-storage');
  }
  
  // URL에서 상태 읽기
  const os = (searchParams.get('os') || 'mac') as 'mac' | 'windows';
  const current = parseInt(searchParams.get('current') || '1');
  const doneParam = searchParams.get('done') || '';
  
  // 번역된 단계 데이터 생성 - 메모이제이션으로 불필요한 재생성 방지
  const steps = useMemo(() => {
    if (os === 'mac') {
      return [
        {
          id: createStepId('start'),
          number: 1,
          title: t('intro.title'),
          startTag: t('intro.title'),
          timeEstimate: t('intro.timeEstimate.mac'),
          content: 'start'
        },
        {
          id: createStepId('homebrew'),
          number: 2,
          title: t('steps.homebrew.title'),
          timeEstimate: t('steps.homebrew.timeEstimate'),
          content: 'homebrew'
        },
        {
          id: createStepId('node'),
          number: 3,
          title: t('steps.node.title'),
          timeEstimate: t('steps.node.timeEstimate'),
          content: 'node'
        },
        {
          id: createStepId('claude'),
          number: 4,
          title: t('steps.claude.title'),
          timeEstimate: t('steps.claude.timeEstimate'),
          content: 'claude'
        },
        {
          id: createStepId('auth'),
          number: 5,
          title: t('steps.auth.title'),
          timeEstimate: t('steps.auth.timeEstimate'),
          content: 'auth'
        },
        {
          id: createStepId('project'),
          number: 6,
          title: t('project.title'),
          timeEstimate: t('project.timeEstimate'),
          content: 'project'
        }
      ];
    } else {
      return [
        {
          id: createStepId('start-windows'),
          number: 1,
          title: t('intro.title'),
          startTag: t('intro.title'),
          timeEstimate: t('intro.timeEstimate.windows'),
          content: 'start-windows'
        },
        {
          id: createStepId('git-windows'),
          number: 2,
          title: t('steps.git-windows.title'),
          timeEstimate: t('steps.git-windows.timeEstimate'),
          content: 'git-windows'
        },
        {
          id: createStepId('node-windows'),
          number: 3,
          title: t('steps.node-windows.title'),
          timeEstimate: t('steps.node-windows.timeEstimate'),
          content: 'node-windows'
        },
        {
          id: createStepId('claude-windows'),
          number: 4,
          title: t('steps.claude-windows.title'),
          timeEstimate: t('steps.claude-windows.timeEstimate'),
          content: 'claude-windows'
        },
        {
          id: createStepId('auth-windows'),
          number: 5,
          title: t('steps.auth-windows.title'),
          timeEstimate: t('steps.auth-windows.timeEstimate'),
          content: 'auth-windows'
        },
        {
          id: createStepId('project-windows'),
          number: 6,
          title: t('project.title'),
          timeEstimate: t('project.timeEstimate'),
          content: 'project-windows'
        }
      ];
    }
  }, [os, t]);
  
  // 잘못된 단계 접근 시 404 페이지로
  if (current < 1 || current > steps.length) {
    notFound();
  }
  
  // 로컬 상태 (UI 전용)
  // done=1-6이고 current가 없으면 완료 모달을 표시
  const isCompleted = doneParam === '1-6' && !searchParams.get('current');
  // 초기 상태는 서버와 클라이언트가 동일하게 false로 설정
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  // done=1-6이고 current가 없으면 모든 단계를 닫은 상태로 시작
  const initialExpandedStep = isCompleted ? 0 : current;
  const [expandedStep, setExpandedStep] = useState(initialExpandedStep);
  
  // 각 단계별로 선택한 버튼을 추적하는 state
  const [selectedButtons, setSelectedButtons] = useState<Record<string, string>>({});
  
  // 클라이언트에서만 sessionStorage 확인 (캐시된 접근 사용)
  useEffect(() => {
    if (isCompleted) {
      const modalClosed = storageCache.get(STORAGE_KEYS.MODAL_CLOSED) === 'true';
      if (!modalClosed) {
        setShowCompletionModal(true);
      }
    }

    // sessionStorage에서 선택한 버튼 상태 복원 (캐시된 접근)
    const savedButtons = storageCache.get(STORAGE_KEYS.SELECTED_BUTTONS);
    if (savedButtons) {
      try {
        setSelectedButtons(JSON.parse(savedButtons));
      } catch (e) {
        console.error('Failed to restore button states:', e);
      }
    }
  }, [isCompleted]);

  // URL 변경 시 단계 추적 및 expandedStep 업데이트
  useEffect(() => {
    // 현재 단계가 1 이상이면 추적 (URL 직접 접근 또는 새로고침 대응)
    if (current > 0 && current <= 6) {
      const currentStepInfo = steps[current - 1];
      trackStepProgress(current, currentStepInfo?.id || `step${current}`);
      
      // 단계 진입 시간 초기화
      stepStartTimeRef.current = Date.now();
    }
    
    // done=1-6이고 current가 없으면 모든 단계를 닫은 상태로 유지
    if (doneParam === '1-6' && !searchParams.get('current')) {
      setExpandedStep(0);
      // 6단계 모두 완료 시 스크롤 (캐시된 접근)
      const modalClosed = storageCache.get(STORAGE_KEYS.MODAL_CLOSED) === 'true';
      if (!modalClosed) {
        // 먼저 스크롤하여 전체 여정 보여주기
        const firstStep = document.querySelector('.step-section');
        if (firstStep) {
          scrollToElement(firstStep as HTMLElement, 20, 1200); // 1.2초 동안 천천히 스크롤
        }
        
        // 스크롤 완료 후 모달 표시
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 800); // 스크롤 애니메이션 완료 후 모달 표시
      }
    } else {
      setExpandedStep(current);
    }
  }, [current, doneParam, searchParams]);

  // OS 변경 시 body에 data-current-os 속성 설정
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-current-os', os);
    }
  }, [os]);

  // 단계 변경 시 스크롤
  useEffect(() => {
    if (expandedStep > 0 && typeof window !== 'undefined') {
      // DOM 업데이트를 위한 지연 (프로덕션 환경 고려)
      const timer = setTimeout(() => {
        // steps는 메모이제이션되어 있으므로 안전하게 참조 가능
        const currentStep = steps[expandedStep - 1];
        if (currentStep) {
          const stepElement = document.getElementById(`step-${currentStep.id}`);
          if (stepElement) {
            // 헤더 높이를 고려하여 부드럽게 스크롤
            scrollToElement(stepElement, 80, 800); // 0.8초 동안 스크롤
          }
        }
      }, 300); // 프로덕션 환경에서 DOM 렌더링 완료를 위한 충분한 지연

      return () => clearTimeout(timer);
    }
    
    // 조건이 false인 경우에도 cleanup function 반환
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedStep]); // steps는 메모이제이션되어 있고 변경되지 않으므로 의존성에서 제외
  
  // done 파라미터 파싱 (예: "1-5" → [1,2,3,4,5])
  const getCompletedSteps = (done: string): number[] => {
    if (!done) return [];
    
    const parts = done.split('-');
    if (parts.length === 2) {
      const start = parseInt(parts[0]);
      const end = parseInt(parts[1]);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return [parseInt(done)];
  };
  
  const completedSteps = getCompletedSteps(doneParam);
  
  
  // OS 전환
  const handleOSChange = (newOS: 'mac' | 'windows') => {
    router.push(`/guide?os=${newOS}&current=1`);
    
    // URL 업데이트 이벤트 발생
    setTimeout(() => {
      window.dispatchEvent(new Event('guideURLUpdated'));
    }, 100);
  };
  
  // 단계별 핸들러
  const handleStepComplete = (completedStepNumber: number) => {
    // 현재 단계 정보 가져오기
    const currentStepInfo = steps[completedStepNumber - 1];
    
    // 단계 완료 클릭 추적
    trackStepClick(completedStepNumber, 'complete');
    
    // 단계 진행 추적
    trackStepProgress(completedStepNumber, currentStepInfo?.id || `step${completedStepNumber}`);
    
    // 현재 단계에서 보낸 시간 계산
    const timeSpentOnStep = Date.now() - stepStartTimeRef.current;
    
    // 완료된 단계를 추가하고 다음 단계로 이동
    let newCompleted = [...completedSteps];
    if (!newCompleted.includes(completedStepNumber)) {
      newCompleted.push(completedStepNumber);
    }
    // 규칙 7.5: toSorted()를 사용하여 원본 배열을 변경하지 않음
    newCompleted = newCompleted.toSorted((a, b) => a - b);
    
    // done 파라미터 생성
    let doneStr = '';
    if (newCompleted.length === 1) {
      doneStr = `${newCompleted[0]}`;
    } else if (newCompleted.length > 1) {
      doneStr = `${newCompleted[0]}-${newCompleted[newCompleted.length - 1]}`;
    }
    
    const nextStep = completedStepNumber + 1;
    if (nextStep <= 6) {
      router.push(`/guide?os=${os}&current=${nextStep}&done=${doneStr}`);
      setExpandedStep(nextStep);
      
      // 빠른 클릭(10초 이내) 감지 및 토스트 표시
      // 2단계 이상 완료 시 표시 (1단계는 버튼이 없으므로 제외)
      if (timeSpentOnStep < 10000 && completedStepNumber >= 2 && nextStep <= 6) {
        setTimeout(() => {
          const message = t('reviewToast.message', { step: String(completedStepNumber) });
          const prevDoneStr = completedStepNumber > 1 ? `1-${completedStepNumber - 1}` : '';
          
          showToast(
            message, 
            'info', 
            10000,
            [
              {
                label: t('reviewToast.reviewButton'),
                onClick: () => {
                  // 이전 단계로 돌아가기 (다시 활성화)
                  router.push(`/guide?os=${os}&current=${completedStepNumber}&done=${prevDoneStr}`);
                }
              },
              {
                label: t('reviewToast.continueButton'),
                onClick: () => {
                  // 토스트 닫기 (자동 처리됨)
                }
              }
            ]
          );
        }, 500); // 페이지 전환 후 표시
      }
      
      // 다음 단계 시작 시간 초기화
      stepStartTimeRef.current = Date.now();
      
      // URL 업데이트 이벤트 발생
      setTimeout(() => {
        window.dispatchEvent(new Event('guideURLUpdated'));
      }, 100);
    } else {
      // 6단계 완료 시 추적
      trackCompletion();
      
      // 6단계 완료 시 URL 업데이트
      router.push(`/guide?os=${os}&done=1-6`);
      
      // URL 업데이트 이벤트 발생
      setTimeout(() => {
        window.dispatchEvent(new Event('guideURLUpdated'));
      }, 100);
      
      // 먼저 스크롤하여 전체 여정 보여주기
      setTimeout(() => {
        const firstStep = document.querySelector('.step-section');
        if (firstStep) {
          scrollToElement(firstStep as HTMLElement, 20, 1000); // 1초 동안 천천히 스크롤
        }
        
        // 스크롤 완료 후 모달 표시
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 1100); // 스크롤 애니메이션 완료 후 모달 표시
      }, 100); // URL 업데이트 후 약간의 지연
    }
  };
  
  const handleCodeCopy = useCallback((stepId: string, codeType: string) => {
    // 코드 복사 추적 (analytics.js에서 처리)
  }, []);

  // useCallback으로 핸들러 최적화 - 매 렌더링마다 새 함수 생성 방지
  const handleToggleExpand = useCallback((
    stepNumber: number,
    isExpanded: boolean,
    isCompleted: boolean,
    stepId: string
  ) => {
    const newExpandedStep = isExpanded ? 0 : stepNumber;
    setExpandedStep(newExpandedStep);

    // 단계 클릭 추적
    if (isExpanded) {
      trackStepClick(stepNumber, 'collapse');
    } else {
      trackStepClick(stepNumber, 'expand');
      if (!isCompleted) {
        trackStepProgress(stepNumber, stepId);
      }
    }
  }, [trackStepClick, trackStepProgress]);

  const handleGuideButtonClick = useCallback((
    stepNumber: number,
    stepId: string,
    buttonType: string,
    buttonText: string
  ) => {
    // 버튼 선택 상태 저장 (캐시된 접근)
    setSelectedButtons(prev => {
      const newSelectedButtons = { ...prev, [stepId]: buttonType };
      storageCache.set(STORAGE_KEYS.SELECTED_BUTTONS, JSON.stringify(newSelectedButtons));
      return newSelectedButtons;
    });

    if (buttonType === 'success' || buttonType === 'resolved') {
      handleStepComplete(stepNumber);
    } else if (buttonType === 'error') {
      trackStepClick(stepNumber, 'error');
      trackError(buttonText, {
        step: stepNumber,
        stepId: stepId,
        error_type: buttonText,
        button: 'error'
      });
    }
  }, [handleStepComplete, trackStepClick, trackError]);

  const handleModalClose = useCallback(() => {
    setShowCompletionModal(false);
    storageCache.set(STORAGE_KEYS.MODAL_CLOSED, 'true');
  }, []);

  const handleEmojiSelect = useCallback((emoji: string) => {
    // 이모지 선택 처리
  }, []);

  const handleFeedbackSubmit = useCallback((feedback: { emoji: string; text?: string; completionTime: number }) => {
    // 피드백 제출 처리
  }, []);

  return (
    <div className="page-wrapper page-wrapper--guide">
      <div className="container">
        <PageHeader
          variant="hero"
          title={t('header.title')}
          subtitle={t('header.subtitle')}
          badge={t('header.badge')}
        >
          <HeaderControls 
            currentOS={os}
            onOSChange={handleOSChange}
          />
        </PageHeader>
        
        <main className="main-content">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isExpanded = stepNumber === expandedStep;
            
            return (
              <GuideStep
                key={`${os}-${step.id}`}
                step={step}
                os={os}
                isActive={stepNumber === current}
                isCompleted={isCompleted}
                isExpanded={isExpanded}
                isReadOnly={isCompleted}
                selectedButton={selectedButtons[step.id]}
                onToggleExpand={() => handleToggleExpand(stepNumber, isExpanded, isCompleted, step.id)}
                onButtonClick={(buttonType, buttonText) => handleGuideButtonClick(stepNumber, step.id, buttonType, buttonText)}
                onCodeCopy={handleCodeCopy}
              />
            );
          })}
        </main>
        
        <ProgressBar
          currentStep={isCompleted ? steps.length - 1 : current - 1}
          completedSteps={new Set(completedSteps.map(n => steps[n - 1]?.id).filter(Boolean))}
          totalSteps={steps.length}
          currentOS={os}
        />
      </div>
      
      {showCompletionModal ? (
        <CompletionModal
          onClose={handleModalClose}
          onEmojiSelect={handleEmojiSelect}
          onFeedbackSubmit={handleFeedbackSubmit}
          totalTime={(() => {
            const startTime = storageCache.get(STORAGE_KEYS.START_TIME);
            return Math.round((Date.now() - (startTime ? parseInt(startTime) : Date.now())) / 60000) || 10;
          })()}
        />
      ) : null}
    </div>
  );
}