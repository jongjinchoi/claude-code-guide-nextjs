'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('guide');
  
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
        <h3>{t('projectStep.createSection.title')}</h3>
        <p>{t('projectStep.createSection.description')}</p>
        
        <div className={styles.commandGroup}>
          <div className={styles.commandBlock}>
            <span className={styles.commandLabel}>{t('projectStep.createSection.step1')}</span>
            <CodeBlock 
              onCopy={() => handleCodeCopy('project_creation', 'create_directory')}
            >
              mkdir my-first-project
            </CodeBlock>
          </div>
          
          <div className={styles.commandBlock}>
            <span className={styles.commandLabel}>{t('projectStep.createSection.step2')}</span>
            <CodeBlock 
              onCopy={() => handleCodeCopy('navigation', 'change_directory')}
            >
              cd my-first-project
            </CodeBlock>
          </div>
        </div>

        <p className={styles.tip} dangerouslySetInnerHTML={{ __html: t.raw('projectStep.createSection.tip') }} />
      </div>
      
      {/* Claude Code 시작 섹션 */}
      <div className={styles.startSection}>
        <h3>{t('projectStep.startSection.title')}</h3>
        <p>{t('projectStep.startSection.description')}</p>
        
        <CodeBlock 
          onCopy={() => handleCodeCopy('claude_start', 'start_claude')}
        >
          claude
        </CodeBlock>
        
        <p className={styles.securityNote} dangerouslySetInnerHTML={{ __html: t.raw('projectStep.startSection.securityNote') }} />
        
        <ProjectStepTerminal os={os} />
        
      </div>
      
      {/* 결과 버튼 섹션 */}
      <div className="result-buttons">
        <p><strong>{t('projectStep.resultSection.question')}</strong></p>
        <ResultButton 
          step={stepId} 
          result="success"
          icon="fa-check-circle"
          title={t('projectStep.resultSection.successTitle')}
          description={t('projectStep.resultSection.successDescription')}
          selected={isReadOnly && selectedButton === 'success'}
          disabled={isReadOnly && selectedButton !== 'success'}
          onButtonClick={handleButtonClick}
        />
        
        <ResultButton 
          step={stepId} 
          result="error"
          icon="fa-times-circle"
          title={t('projectStep.resultSection.errorTitle')}
          description={t('projectStep.resultSection.errorDescription')}
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
          handleButtonClick('resolved', t('troubleshooting.common.completedTitle'));
        }}
      >
        <TroubleshootingContent stepId={stepId} />
      </Troubleshooting>
    </div>
  );
}