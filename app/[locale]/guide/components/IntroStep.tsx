'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ResultButton from './ResultButton';
import TerminalExample, { createTerminalLines } from './TerminalExample';
import styles from './IntroStep.module.css';

interface IntroStepProps {
  os: 'mac' | 'windows';
  isReadOnly?: boolean;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
  selectedButton?: string;
}

export default function IntroStep({ 
  os,
  isReadOnly = false,
  onButtonClick,
  selectedButton
}: IntroStepProps) {
  const isMac = os === 'mac';
  const t = useTranslations('guide');

  return (
    <div className={styles.introStep}>
      <div className={styles.checkSection}>
        <h3>{t('intro.title')}</h3>
        <p>{t('intro.subtitle')}</p>
        
        <div className={styles.checkList}>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: t.raw('intro.requirements.claudePro') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('intro.requirements.time') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('intro.requirements.internet') }} />
          </ul>
        </div>
      </div>
      
      <div className={styles.terminalGuide}>
        <h3>{t(`intro.terminalGuide.${os}.title`)}</h3>
        <p>{t(`intro.terminalGuide.${os}.description`)}</p>
        
        <div className={styles.terminalGuideBox}>
          <h4>{t(`intro.terminalGuide.${os}.howToOpen`)}</h4>
          
          <div className={styles.openMethodList}>
            <ul>
              {t.raw(`intro.terminalGuide.${os}.methods`).split(';').map((method: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: method }} />
              ))}
            </ul>
          </div>
          
          <TerminalExample 
            title={t(`intro.terminalExample.${os}`)}
            os={os}
            lines={createTerminalLines(os, 'initial')}
          />
          
          <div className={styles.terminalSeparator}></div>
          
          <h4>{t(`intro.closeTerminal.${os}`)}</h4>
          
          <div className={styles.closeMethodList}>
            <ul>
              {t.raw(`intro.closeMethods.${os}`).split(';').map((method: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: method }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.singleButton}>
        <p><strong>{t('intro.confirmPrompt')}</strong></p>
        <ResultButton 
          step={isMac ? "start" : "start-windows"} 
          result="success"
          icon="fa-check-circle"
          title={t('intro.successButton.title')}
          description={t(`intro.successButton.${os}`)}
          selected={isReadOnly && selectedButton === 'success'}
          disabled={isReadOnly && selectedButton !== 'success'}
          onButtonClick={onButtonClick}
        />
      </div>
    </div>
  );
}