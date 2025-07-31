'use client';

import '../../styles/components/ProgressBar.css';

interface ProgressBarProps {
  currentStep: number;
  completedSteps: Set<string>;
  totalSteps: number;
  currentOS: 'mac' | 'windows';
}

export default function ProgressBar({ 
  currentStep, 
  completedSteps, 
  totalSteps, 
  currentOS 
}: ProgressBarProps) {
  const percentage = Math.round((completedSteps.size / totalSteps) * 100);
  
  const stepNames = {
    'start': '시작하기 전에',
    'homebrew': 'Homebrew 설치',
    'node': 'Node.js 설치',
    'claude': 'Claude Code 설치',
    'auth': '인증 설정',
    'project': '첫 프로젝트',
    'start-windows': '시작하기 전에',
    'git-windows': 'Git for Windows 설치',
    'node-windows': 'Node.js 설치',
    'claude-windows': 'Claude Code 설치',
    'auth-windows': '인증 설정',
    'project-windows': '첫 프로젝트'
  };
  
  const currentStepId = currentOS === 'windows' 
    ? ['start-windows', 'git-windows', 'node-windows', 'claude-windows', 'auth-windows', 'project-windows'][currentStep]
    : ['start', 'homebrew', 'node', 'claude', 'auth', 'project'][currentStep];
  
  const currentStepName = stepNames[currentStepId as keyof typeof stepNames] || '시작하기 전에';

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
        <span id="progressText">{percentage}% 완료 ({completedSteps.size}/{totalSteps})</span>
        <span className="progress-separator">•</span>
        <span className="progress-time">현재: {currentStepName}</span>
      </div>
    </div>
  );
}