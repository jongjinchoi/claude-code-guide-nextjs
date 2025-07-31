'use client';

import { useState, useEffect } from 'react';
import '../../styles/components/troubleshooting.css';

interface TroubleshootingProps {
  id: string;
  step: string;
  children: React.ReactNode;
  active?: boolean;
  onResolved?: () => void;
  isReadOnly?: boolean;
  isResolvedSelected?: boolean;
}

export default function Troubleshooting({ 
  id, 
  step, 
  children, 
  active = false, 
  onResolved,
  isReadOnly = false,
  isResolvedSelected = false 
}: TroubleshootingProps) {
  const [isResolved, setIsResolved] = useState(false);

  const handleResolution = () => {
    if (!isResolved && !isReadOnly) {
      setIsResolved(true);
      // 부모 컴포넌트에 문제 해결 알림
      if (onResolved) {
        onResolved();
      }
    }
  };
  
  // 문제가 해결된 상태로 표시할지 결정
  const shouldShowAsResolved = isResolved || (isReadOnly && isResolvedSelected);

  return (
    <div className={`troubleshooting ${active ? 'is-active' : ''}`} id={id}>
      <h3><i className="fas fa-wrench"></i> 문제 해결</h3>
      <div className="troubleshooting-content">
        {children}
        
        <div className="troubleshooting-resolution">
          <h4>문제가 해결되었다면:</h4>
          <button 
            className={`resolution-check ${shouldShowAsResolved ? 'is-resolved' : ''}`}
            onClick={handleResolution}
            disabled={isReadOnly || shouldShowAsResolved}
            type="button"
          >
            <div className="resolution-check-icon">
              {shouldShowAsResolved && <i className="fas fa-check"></i>}
            </div>
            <div className="resolution-check-content">
              <div className="resolution-check-title">문제 해결 완료!</div>
              <div className="resolution-check-desc">
                {step === 'homebrew' && 'Homebrew가 정상적으로 설치되었습니다'}
                {step === 'node' && 'Node.js가 정상적으로 설치되었습니다'}
                {step === 'claude' && 'Claude Code가 정상적으로 설치되었습니다'}
                {step === 'auth' && '계정이 정상적으로 연결되었습니다'}
                {step === 'project' && 'Claude Code가 정상적으로 시작되었습니다'}
                {step === 'git-windows' && 'Git for Windows가 정상적으로 설치되었습니다'}
                {step === 'node-windows' && 'Node.js가 정상적으로 설치되었습니다'}
                {step === 'claude-windows' && 'Claude Code가 정상적으로 설치되었습니다'}
                {step === 'auth-windows' && '계정 연결이 완료되었습니다'}
                {step === 'project-windows' && 'Claude Code가 정상적으로 시작되었습니다'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}