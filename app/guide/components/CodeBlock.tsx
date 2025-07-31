'use client';

import { useState } from 'react';
import '../../styles/components/CodeBlock.css';
import { useToast } from '@/app/components/Toast';

interface CodeBlockProps {
  children: string;
  onCodeCopy?: (codeType: string, codeAction: string) => void;
  onCopy?: (code: string) => void;
}

export default function CodeBlock({ children, onCodeCopy, onCopy }: CodeBlockProps) {
  const [isCopying, setIsCopying] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (isCopying) return;
    
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(children);
      
      // Get current guide step info
      const button = document.activeElement as HTMLElement;
      const guideStep = button?.closest('.guide-step') as HTMLElement;
      let stepNumber = 0;
      let stepId = '';
      let stepTitle = '';
      let codeImportance = 'optional';
      
      if (guideStep) {
        stepId = guideStep.id || '';
        stepNumber = parseInt(guideStep.dataset.step || '0');
        stepTitle = guideStep.querySelector('h2')?.textContent || '';
        
        // Check if required command
        const isRequired = guideStep.classList.contains('required') || 
                         children.includes('npm install') || 
                         children.includes('claude auth') ||
                         children.includes('brew install');
        codeImportance = isRequired ? 'required' : 'optional';
      }
      
      // Categorize code type
      let codeCategory = 'other';
      let codeAction = 'unknown';
      
      if (children.startsWith('npm install')) {
        codeCategory = 'installation';
        codeAction = 'install_claude_cli';
      } else if (children.startsWith('brew')) {
        codeCategory = 'installation';
        codeAction = 'install_homebrew_package';
      } else if (children.startsWith('claude auth')) {
        codeCategory = 'authentication';
        codeAction = 'authenticate_claude';
      } else if (children.includes('claude')) {
        codeCategory = 'claude_command';
        codeAction = children.includes('--version') ? 'check_version' : 'run_claude';
      } else if (children.includes('git')) {
        codeCategory = 'version_control';
        codeAction = 'git_operation';
      } else if (children.includes('mkdir') || children.includes('cd')) {
        codeCategory = 'file_system';
        codeAction = 'directory_operation';
      }
      
      // 부모 컴포넌트로 코드 복사 알림
      if (onCodeCopy) {
        onCodeCopy(codeCategory, codeAction);
      }
      
      // GA4로 코드 복사 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'code_copy', {
          code_category: codeCategory,
          code_action: codeAction,
          code_importance: codeImportance,
          code_snippet: children.substring(0, 50),
          code_length: children.length,
          page_path: window.location.pathname,
          guide_step_number: stepNumber,
          guide_step_name: stepId,
          step_title: stepTitle
        });
      }
      
      showToast('명령어가 복사되었습니다!', 'success');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = children;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        showToast('명령어가 복사되었습니다!', 'success');
      } catch (fallbackErr) {
        showToast('복사에 실패했습니다', 'error');
      }
      
      document.body.removeChild(textArea);
    } finally {
      setTimeout(() => setIsCopying(false), 2000);
    }
  };

  return (
    <div className="code-block">
      <code>{children}</code>
      <button 
        className={`btn-copy ${isCopying ? 'is-copied' : ''}`}
        onClick={handleCopy}
      >
        <i className={`fas ${isCopying ? 'fa-check' : 'fa-copy'}`}></i>
        <span>{isCopying ? '복사됨' : '복사'}</span>
      </button>
    </div>
  );
}