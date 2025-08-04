'use client';

import dynamic from 'next/dynamic';
import IntroStep from '../IntroStep';
import GuideStepComponent from '../GuideStepComponent';
import ProjectStep from '../ProjectStep';

interface StepContentProps {
  stepId: string;
  isReadOnly?: boolean;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
  onCodeCopy?: (codeType: string, codeAction: string) => void;
  selectedButton?: string;
  hasError?: boolean;
}

export default function StepContent({ 
  stepId, 
  isReadOnly = false,
  onButtonClick,
  onCodeCopy,
  selectedButton,
  hasError = false
}: StepContentProps) {
  const os = stepId.includes('windows') ? 'windows' : 'mac';
  
  // 1단계인지 확인
  const isIntroStep = stepId === 'start' || stepId === 'start-windows';
  
  // 6단계인지 확인
  const isProjectStep = stepId === 'project' || stepId === 'project-windows';
  
  if (isIntroStep) {
    // 1단계는 IntroStep 컴포넌트 사용
    return (
      <IntroStep
        os={os}
        isReadOnly={isReadOnly}
        onButtonClick={onButtonClick}
        selectedButton={selectedButton}
      />
    );
  }
  
  if (isProjectStep) {
    // 6단계는 ProjectStep 컴포넌트 사용
    return (
      <ProjectStep
        os={os}
        isReadOnly={isReadOnly}
        onButtonClick={onButtonClick}
        onCodeCopy={onCodeCopy}
        selectedButton={selectedButton}
        hasError={hasError}
      />
    );
  }
  
  // 2~5단계는 GuideStepComponent 사용
  // stepId에서 단계 번호 추출
  const stepNumberMap: Record<string, number> = {
    'homebrew': 2,
    'git-windows': 2,
    'node': 3,
    'node-windows': 3,
    'claude': 4,
    'claude-windows': 4,
    'auth': 5,
    'auth-windows': 5
  };
  
  const stepNumber = stepNumberMap[stepId] || 2;
  
  return (
    <GuideStepComponent
      stepNumber={stepNumber}
      stepId={stepId}
      os={os}
      isReadOnly={isReadOnly}
      onButtonClick={onButtonClick}
      onCodeCopy={onCodeCopy}
      selectedButton={selectedButton}
      hasError={hasError}
    />
  );
}