'use client';

import { useState } from 'react';
import styles from './GuideStepComponent.module.css';
import { stepContentMap } from '../utils/stepContentData';
import CodeBlock from './CodeBlock';
import TerminalExample, { createTerminalLines } from './TerminalExample';
import ResultButton from './ResultButton';
import Troubleshooting from './Troubleshooting';
import TroubleshootingContent from './TroubleshootingContent';

interface GuideStepComponentProps {
  stepNumber: number;
  stepId: string;
  os: 'mac' | 'windows';
  isReadOnly?: boolean;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
  onCodeCopy?: (codeType: string, codeAction: string) => void;
  selectedButton?: string;
  hasError?: boolean;
}

export default function GuideStepComponent({ 
  stepNumber,
  stepId,
  os,
  isReadOnly = false,
  onButtonClick,
  onCodeCopy,
  selectedButton,
  hasError = false
}: GuideStepComponentProps) {
  // resolved가 선택된 경우에도 Troubleshooting 섹션을 표시해야 함
  const [showTroubleshooting, setShowTroubleshooting] = useState(hasError || (isReadOnly && selectedButton === 'resolved'));
  const [macType, setMacType] = useState<'apple-silicon' | 'intel'>('apple-silicon');
  
  // stepContentData에서 콘텐츠 가져오기
  const content = stepContentMap[stepId];
  
  if (!content) {
    return <div>콘텐츠를 찾을 수 없습니다: {stepId}</div>;
  }
  
  const handleButtonClick = (buttonType: string, buttonText: string) => {
    if (buttonType === 'error') {
      setShowTroubleshooting(true);
    }
    if (onButtonClick) {
      onButtonClick(buttonType, buttonText);
    }
  };

  const handleCodeCopy = (code: string) => {
    if (onCodeCopy && content.codeBlocks?.[0]) {
      onCodeCopy(content.codeBlocks[0].type, content.codeBlocks[0].action);
    }
  };

  return (
    <div className={`${styles.guideStep} ${showTroubleshooting ? styles.hasError : ''}`} data-os={os}>
      {/* 설치/설정 섹션 */}
      <div className={styles.installSection}>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
        
        {content.preCodeText && <p>{content.preCodeText}</p>}
        
        {content.codeBlocks?.map((block, index) => (
          <CodeBlock key={index} onCopy={handleCodeCopy}>
            {block.code}
          </CodeBlock>
        ))}
        
        {content.postCodeText && (
          <p className={styles.installNote}>{content.postCodeText}</p>
        )}
      </div>
      
      {/* 확인 섹션 */}
      <div className={styles.verifySection}>
        <h3>설치 완료 확인</h3>
        <p>{content.verifyText}</p>
        
        <CodeBlock onCopy={handleCodeCopy}>
          {content.verifyCommand}
        </CodeBlock>
        
        <p>성공하면 이런 메시지가 나타납니다:</p>
        
        <TerminalExample 
          variant="success"
          os={os}
          lines={createTerminalLines(os, content.terminalExample)}
        />
      </div>
      
      {/* 결과 버튼 섹션 */}
      <div className={styles.resultButtons}>
        <p><strong>결과를 선택하세요:</strong></p>
        <ResultButton 
          step={stepId} 
          result="success"
          icon="fa-check-circle"
          title={content.successButton.title}
          description={content.successButton.description}
          selected={isReadOnly && selectedButton === 'success'}
          disabled={isReadOnly && selectedButton !== 'success'}
          onButtonClick={handleButtonClick}
        />
        
        <ResultButton 
          step={stepId} 
          result="error"
          icon="fa-times-circle"
          title={content.errorButton.title}
          description={content.errorButton.description}
          selected={isReadOnly && (selectedButton === 'error' || selectedButton === 'resolved')}
          disabled={isReadOnly && selectedButton !== 'error' && selectedButton !== 'resolved'}
          onButtonClick={handleButtonClick}
        />
      </div>
      
      {/* 문제 해결 섹션 */}
      <Troubleshooting 
        id={`troubleshooting-${stepId}`} 
        step={stepId} 
        active={showTroubleshooting}
        isReadOnly={isReadOnly}
        isResolvedSelected={selectedButton === 'resolved'}
        onResolved={() => {
          handleButtonClick('resolved', '문제 해결 완료!');
        }}
      >
        <TroubleshootingContent stepId={stepId} />
      </Troubleshooting>
    </div>
  );
}