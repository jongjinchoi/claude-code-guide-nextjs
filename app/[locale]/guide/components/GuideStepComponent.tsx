'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './GuideStepComponent.module.css';
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
  const t = useTranslations('guide');
  const locale = useLocale();
  
  // 번역에서 콘텐츠 가져오기
  const getContent = () => {
    const stepKey = stepId;
    
    // 터미널 시나리오 매핑
    const getTerminalScenario = (stepId: string) => {
      switch (stepId) {
        case 'homebrew':
          return 'homebrew-version';
        case 'node':
          return 'node-version';
        case 'claude':
          return 'claude-version';
        case 'auth':
          return 'auth-status';
        case 'git-windows':
          return 'git-version';
        case 'node-windows':
          return 'node-version';
        case 'claude-windows':
          return 'claude-version';
        case 'auth-windows':
          return 'auth-status';
        default:
          return 'initial';
      }
    };

    // 코드 블록 정의 (stepId에 따라)
    const getCodeBlocks = () => {
      switch (stepId) {
        case 'homebrew':
          return [{
            code: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
            type: 'installation',
            action: 'install_homebrew'
          }];
        case 'node':
          return [{
            code: 'brew install node',
            type: 'installation', 
            action: 'install_node'
          }];
        case 'claude':
          return [{
            code: 'npm install -g @anthropic-ai/claude-code',
            type: 'installation',
            action: 'install_claude'
          }];
        case 'auth':
          return [{
            code: 'claude auth login',
            type: 'authentication',
            action: 'auth_login'
          }];
        case 'git-windows':
          return []; // Windows Git는 다운로드 링크
        case 'node-windows':
          return []; // Windows Node.js는 다운로드 링크
        case 'claude-windows':
          return [{
            code: 'npm install -g @anthropic-ai/claude-code',
            type: 'installation',
            action: 'install_claude'
          }];
        case 'auth-windows':
          return [{
            code: 'claude auth login',
            type: 'authentication',
            action: 'auth_login'
          }];
        default:
          return [];
      }
    };
    
    return {
      title: t(`steps.${stepKey}.title`),
      description: t(`steps.${stepKey}.description`),
      preCodeText: t(`steps.${stepKey}.preCodeText`),
      postCodeText: t(`steps.${stepKey}.postCodeText`),
      verifyText: t(`steps.${stepKey}.verifyText`),
      verifyCommand: t(`steps.${stepKey}.verifyCommand`),
      codeBlocks: getCodeBlocks(),
      terminalExample: getTerminalScenario(stepId),
      successButton: {
        title: t(`steps.${stepKey}.successButton.title`),
        description: t(`steps.${stepKey}.successButton.description`)
      },
      errorButton: {
        title: t(`steps.${stepKey}.errorButton.title`),
        description: t(`steps.${stepKey}.errorButton.description`)
      }
    };
  };
  
  const content = getContent();
  
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
        
        {/* Windows 다운로드 링크 처리 */}
        {(stepId === 'git-windows' || stepId === 'node-windows') ? (
          <div className={styles.downloadSection}>
            {stepId === 'git-windows' && (
              <a 
                href="https://git-scm.com/download/win" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.downloadButton}
              >
                <i className="fas fa-download"></i>
                {t('steps.git-windows.downloadText') || 'Git for Windows 다운로드'}
              </a>
            )}
            {stepId === 'node-windows' && (
              <a 
                href="https://nodejs.org/en/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.downloadButton}
              >
                <i className="fas fa-download"></i>
                {t('steps.node-windows.downloadText') || 'Node.js LTS 다운로드'}
              </a>
            )}
          </div>
        ) : (
          content.codeBlocks?.map((block, index) => (
            <CodeBlock key={index} onCopy={handleCodeCopy}>
              {block.code}
            </CodeBlock>
          ))
        )}
        
        {content.postCodeText && (
          <p className={styles.installNote} dangerouslySetInnerHTML={{ __html: t.raw(`steps.${stepId}.postCodeText`) }} />
        )}
      </div>
      
      {/* 확인 섹션 */}
      <div className={styles.verifySection}>
        {stepId === 'project' || stepId === 'project-windows' ? (
          <>
            <h3>{t('project.title')}</h3>
            <p>{t('project.description')}</p>
            
            <CodeBlock onCopy={handleCodeCopy}>
              {t('project.preCodeText')}
            </CodeBlock>
            
            <p dangerouslySetInnerHTML={{ __html: t.raw('project.securityPrompt') }} />
            
            <TerminalExample 
              variant="success"
              os={os}
              lines={createTerminalLines(os, 'project-created', locale)}
            />
            
            <p className={styles.installNote} dangerouslySetInnerHTML={{ __html: t.raw('project.postCodeText') }} />
          </>
        ) : (
          <>
            <h3>{t('common.verifyInstallation')}</h3>
            <p>{content.verifyText}</p>
            
            <CodeBlock onCopy={handleCodeCopy}>
              {content.verifyCommand}
            </CodeBlock>
            
            <TerminalExample 
              variant="success"
              os={os}
              lines={createTerminalLines(os, content.terminalExample, locale)}
            />
          </>
        )}
      </div>
      
      {/* 결과 버튼 섹션 */}
      <div className={styles.resultButtons}>
        <p><strong>{t('common.selectResult')}</strong></p>
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
          handleButtonClick('resolved', t('troubleshooting.resolved'));
        }}
      >
        <TroubleshootingContent stepId={stepId} />
      </Troubleshooting>
    </div>
  );
}