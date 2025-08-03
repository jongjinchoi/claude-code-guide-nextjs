'use client';

import { useState } from 'react';
import styles from './ProjectStep.module.css';
import CodeBlock from './CodeBlock';
import ProjectStepTerminal from './ProjectStepTerminal';
import ResultButton from './ResultButton';
import Troubleshooting from './Troubleshooting';
import TroubleshootingContent from './TroubleshootingContent';

interface ProjectStepProps {
  os: 'mac' | 'windows';
  isReadOnly?: boolean;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
  onCodeCopy?: (codeType: string, codeAction: string) => void;
  selectedButton?: string;
  hasError?: boolean;
}

export default function ProjectStep({ 
  os,
  isReadOnly = false,
  onButtonClick,
  onCodeCopy,
  selectedButton,
  hasError = false
}: ProjectStepProps) {
  const [showTroubleshooting, setShowTroubleshooting] = useState(hasError || (isReadOnly && selectedButton === 'resolved'));
  
  const handleButtonClick = (buttonType: string, buttonText: string) => {
    if (buttonType === 'error') {
      setShowTroubleshooting(true);
    }
    if (onButtonClick) {
      onButtonClick(buttonType, buttonText);
    }
  };

  const handleCodeCopy = (codeType: string, codeAction: string) => {
    if (onCodeCopy) {
      onCodeCopy(codeType, codeAction);
    }
  };

  const stepId = os === 'windows' ? 'project-windows' : 'project';

  return (
    <div className={`${styles.projectStep} ${showTroubleshooting ? styles.hasError : ''}`} data-os={os}>
      {/* 프로젝트 생성 섹션 */}
      <div className={styles.createSection}>
        <h3>첫 프로젝트 폴더 만들기</h3>
        <p>Claude Code를 사용할 프로젝트 폴더를 만들어보세요:</p>
        
        <div className={styles.commandGroup}>
          <div className={styles.commandBlock}>
            <span className={styles.commandLabel}>1. 프로젝트 폴더 생성</span>
            <CodeBlock 
              onCopy={() => handleCodeCopy('project_creation', 'create_directory')}
            >
              mkdir my-first-project
            </CodeBlock>
          </div>
          
          <div className={styles.commandBlock}>
            <span className={styles.commandLabel}>2. 폴더로 이동</span>
            <CodeBlock 
              onCopy={() => handleCodeCopy('navigation', 'change_directory')}
            >
              cd my-first-project
            </CodeBlock>
          </div>
        </div>

        <p className={styles.tip}>
          💡 폴더 이름은 원하는 대로 바꿀 수 있어요. 예: <code>my-website</code>, <code>todo-app</code>
        </p>
      </div>
      
      {/* Claude Code 시작 섹션 */}
      <div className={styles.startSection}>
        <h3>Claude Code 시작하기</h3>
        <p>프로젝트 폴더에서 Claude Code를 시작해보세요:</p>
        
        <CodeBlock 
          onCopy={() => handleCodeCopy('claude_start', 'start_claude')}
        >
          claude
        </CodeBlock>
        
        <p className={styles.securityNote}>
          처음 실행하면 보안 확인 질문이 나타납니다. <kbd>1</kbd>을 입력하고 <kbd>Enter</kbd>를 눌러 계속 진행하세요:
        </p>
        
        <ProjectStepTerminal os={os} />
        
      </div>
      
      {/* 결과 버튼 섹션 */}
      <div className="result-buttons">
        <p><strong>Claude Code가 시작되었나요?</strong></p>
        <ResultButton 
          step={stepId} 
          result="success"
          icon="fa-check-circle"
          title="Claude Code가 시작됨"
          description="대화를 시작할 수 있습니다!"
          selected={isReadOnly && selectedButton === 'success'}
          disabled={isReadOnly && selectedButton !== 'success'}
          onButtonClick={handleButtonClick}
        />
        
        <ResultButton 
          step={stepId} 
          result="error"
          icon="fa-times-circle"
          title="시작되지 않음 또는 오류"
          description="아래 해결 방법을 확인하세요"
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