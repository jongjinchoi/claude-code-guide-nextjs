'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { guideSteps } from '@/app/data/guide';
import GuideStep from './components/GuideStep';
import PageHeader from '../components/PageHeader';
import HeaderControls from '../components/HeaderControls';
import ProgressBar from './components/ProgressBar';
import CompletionModal from './components/CompletionModal';
import { useState, useEffect } from 'react';
import { useGuideTracking } from '@/app/hooks/useGuideTracking';

// 스타일 imports
import '../styles/pages/guide.css';
import '../styles/components/guide-step-imports.css';

export default function GuidePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
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
    // 페이지 진입은 추적하지 않음 - 실제 단계 진행 시에만 추적
    // Step 0 에러 방지를 위해 제거
  }, []);
  
  // 임시: localStorage 완전히 제거
  if (typeof window !== 'undefined') {
    localStorage.removeItem('guide-storage');
  }
  
  // URL에서 상태 읽기
  const os = (searchParams.get('os') || 'mac') as 'mac' | 'windows';
  const current = parseInt(searchParams.get('current') || '1');
  const doneParam = searchParams.get('done') || '';
  
  // 사용 가능한 단계 가져오기
  const steps = guideSteps[os];
  
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
  
  // 클라이언트에서만 sessionStorage 확인
  useEffect(() => {
    if (isCompleted) {
      const modalClosed = sessionStorage.getItem('completion-modal-closed') === 'true';
      if (!modalClosed) {
        setShowCompletionModal(true);
      }
    }
    
    // sessionStorage에서 선택한 버튼 상태 복원
    const savedButtons = sessionStorage.getItem('guide-selected-buttons');
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
    }
    
    // done=1-6이고 current가 없으면 모든 단계를 닫은 상태로 유지
    if (doneParam === '1-6' && !searchParams.get('current')) {
      setExpandedStep(0);
      // 6단계 모두 완료 시 스크롤
      const modalClosed = sessionStorage.getItem('completion-modal-closed') === 'true';
      if (!modalClosed) {
        // 먼저 스크롤하여 전체 여정 보여주기
        const firstStep = document.querySelector('.step-section');
        if (firstStep) {
          const headerOffset = 20; // 헤더 아래 약간의 여백
          const elementPosition = firstStep.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
      // 약간의 지연을 주어 DOM 업데이트가 완료된 후 스크롤
      const timer = setTimeout(() => {
        const currentSteps = guideSteps[os];
        const stepElement = document.getElementById(`step-${currentSteps[expandedStep - 1].id}`);
        if (stepElement) {
          // 헤더 높이를 고려한 오프셋
          const headerOffset = 80; // 헤더 높이
          const elementPosition = stepElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // DOM 업데이트를 위한 짧은 지연

      return () => clearTimeout(timer);
    }
    
    // 조건이 false인 경우에도 cleanup function 반환
    return () => {};
  }, [expandedStep, os]);
  
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
    
    // 완료된 단계를 추가하고 다음 단계로 이동
    const newCompleted = [...completedSteps];
    if (!newCompleted.includes(completedStepNumber)) {
      newCompleted.push(completedStepNumber);
    }
    newCompleted.sort((a, b) => a - b);
    
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
          const headerOffset = 20; // 헤더 아래 약간의 여백
          const elementPosition = firstStep.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        
        // 스크롤 완료 후 모달 표시
        setTimeout(() => {
          setShowCompletionModal(true);
        }, 700); // 스크롤 애니메이션 완료 후 모달 표시
      }, 100); // URL 업데이트 후 약간의 지연
    }
  };
  
  const handleCodeCopy = (stepId: string, codeType: string) => {
    // 코드 복사 추적 (analytics.js에서 처리)
  };
  
  return (
    <div className="page-wrapper page-wrapper--guide">
      <div className="container">
        <PageHeader
          variant="hero"
          title="Claude Code Guide"
          subtitle="6단계만 따라하면 AI와 함께 코딩을 시작할 수 있어요"
          badge="설치 가이드"
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
                onToggleExpand={() => {
                  const newExpandedStep = isExpanded ? 0 : stepNumber;
                  setExpandedStep(newExpandedStep);
                  
                  // 단계 클릭 추적
                  if (isExpanded) {
                    // 닫기
                    trackStepClick(stepNumber, 'collapse');
                  } else {
                    // 열기
                    trackStepClick(stepNumber, 'expand');
                    // 단계를 펼칠 때 진행 추적 (이미 완료된 단계는 제외)
                    if (!isCompleted) {
                      trackStepProgress(stepNumber, step.id);
                    }
                  }
                }}
                onButtonClick={(buttonType, buttonText) => {
                  // 버튼 선택 상태 저장
                  const newSelectedButtons = {
                    ...selectedButtons,
                    [step.id]: buttonType
                  };
                  setSelectedButtons(newSelectedButtons);
                  
                  // sessionStorage에 저장
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('guide-selected-buttons', JSON.stringify(newSelectedButtons));
                  }
                  
                  if (buttonType === 'success' || buttonType === 'resolved') {
                    handleStepComplete(stepNumber);
                  } else if (buttonType === 'error') {
                    // 에러 버튼 클릭 추적
                    trackStepClick(stepNumber, 'error');
                    
                    // 에러 발생 추적 - 버튼 텍스트를 에러 메시지로 사용
                    trackError(buttonText, {
                      step: stepNumber,
                      stepId: step.id,
                      error_type: buttonText,
                      button: 'error'
                    });
                  }
                }}
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
      
      {showCompletionModal && (
        <CompletionModal
          onClose={() => {
            setShowCompletionModal(false);
            // 세션에 모달 닫힘 상태 저장
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('completion-modal-closed', 'true');
            }
          }}
          onEmojiSelect={(emoji) => {
            // 이모지 선택 처리
          }}
          onFeedbackSubmit={(feedback) => {
            // 피드백 제출 처리
          }}
          totalTime={Math.round((Date.now() - (typeof window !== 'undefined' && sessionStorage.getItem('guide-start-time') ? parseInt(sessionStorage.getItem('guide-start-time')!) : Date.now())) / 60000) || 10}
        />
      )}
    </div>
  );
}