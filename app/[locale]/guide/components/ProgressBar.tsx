'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import '../../../styles/components/ProgressBar.css';

interface ProgressBarProps {
  currentStep: number;
  completedSteps: Set<string>;
  totalSteps: number;
  currentOS: 'mac' | 'windows';
}

// React.memo로 불필요한 리렌더링 방지
const ProgressBar = memo(function ProgressBar({ 
  currentStep, 
  completedSteps, 
  totalSteps, 
  currentOS 
}: ProgressBarProps) {
  const t = useTranslations('guide');
  const percentage = Math.round((completedSteps.size / totalSteps) * 100);
  
  const stepNames = {
    'start': t('intro.title'),
    'homebrew': t('steps.homebrew.title'),
    'node': t('steps.node.title'),
    'claude': t('steps.claude.title'),
    'auth': t('steps.auth.title'),
    'project': t('project.title'),
    'start-windows': t('intro.title'),
    'git-windows': t('steps.git-windows.title'),
    'node-windows': t('steps.node-windows.title'),
    'claude-windows': t('steps.claude-windows.title'),
    'auth-windows': t('steps.auth-windows.title'),
    'project-windows': t('project.title')
  };
  
  const currentStepId = currentOS === 'windows' 
    ? ['start-windows', 'git-windows', 'node-windows', 'claude-windows', 'auth-windows', 'project-windows'][currentStep]
    : ['start', 'homebrew', 'node', 'claude', 'auth', 'project'][currentStep];
  
  const currentStepName = stepNames[currentStepId as keyof typeof stepNames] || t('intro.title');

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          id="progressFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-info">
        <span id="progressText">{t('progress.completed', { percentage, completed: completedSteps.size, total: totalSteps })}</span>
        <span className="progress-separator">•</span>
        <span className="progress-time">{t('progress.current')}: {currentStepName}</span>
      </div>
    </div>
  );
});

export default ProgressBar;