'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface TerminalLine {
  type: 'output' | 'prompt' | 'command' | 'cursor' | 'raw';
  content: string | React.ReactNode;
  className?: string;
}

interface TerminalExampleProps {
  title?: string;
  lines: TerminalLine[];
  variant?: 'default' | 'success' | 'claude-terminal';
  os?: 'mac' | 'windows';
  className?: string;
  children?: React.ReactNode; // For special content like permission-box
}

export default function TerminalExample({
  title,
  lines,
  variant = 'default',
  os = 'mac',
  className = '',
  children
}: TerminalExampleProps) {
  const t = useTranslations('guide');
  
  // Determine the title based on OS and variant
  const getDefaultTitle = () => {
    if (variant === 'success') {
      return os === 'mac' ? t('terminal.successTitle.mac') : t('terminal.successTitle.windows');
    } else {
      return os === 'mac' ? t('terminal.defaultTitle.mac') : t('terminal.defaultTitle.windows');
    }
  };
  
  const displayTitle = title || getDefaultTitle();
  
  // Build class names
  const containerClasses = [
    'terminal-example',
    variant !== 'default' && variant,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className="terminal-header">
        <span className="terminal-title">{displayTitle}</span>
      </div>
      <div className="terminal-content">
        {(() => {
          const elements: React.ReactNode[] = [];
          let boxLines: React.ReactNode[] = [];
          let inBox = false;
          let currentBoxType = '';

          lines.forEach((line, index) => {
            const isPermissionBox = line.className?.includes('permission-box');
            const isWelcomeBox = line.className?.includes('welcome-box');
            const isAnyBox = isPermissionBox || isWelcomeBox;
            
            if (isAnyBox && !inBox) {
              // Start of any box
              inBox = true;
              currentBoxType = isPermissionBox ? 'permission-box' : 'welcome-box';
              boxLines = [];
            }
            
            const element = (() => {
              switch (line.type) {
                case 'prompt':
                  return (
                    <React.Fragment key={index}>
                      <span className="prompt">{line.content}</span>
                      {lines[index + 1]?.type === 'command' && ' '}
                    </React.Fragment>
                  );
                case 'command':
                  return <React.Fragment key={index}>{line.content}</React.Fragment>;
                case 'output':
                  // If we're in any box, remove only the box classes but keep other classes
                  let outputClassName = 'output';
                  if (line.className) {
                    const classes = line.className.split(' ');
                    const filteredClasses = inBox 
                      ? classes.filter(c => c !== 'permission-box' && c !== 'welcome-box')
                      : classes;
                    outputClassName = `output ${filteredClasses.join(' ')}`;
                  }
                  return (
                    <span key={index} className={outputClassName.trim()}>
                      {line.content}
                    </span>
                  );
                case 'cursor':
                  return <span key={index} className="cursor"></span>;
                case 'raw':
                  return <React.Fragment key={index}>{line.content}</React.Fragment>;
                default:
                  return null;
              }
            })();
            
            if (inBox) {
              boxLines.push(element);
              
              // Check if this is the last box line
              const nextIsAnyBox = lines[index + 1]?.className?.includes('permission-box') || 
                                   lines[index + 1]?.className?.includes('welcome-box');
              if (!nextIsAnyBox) {
                // End of box
                elements.push(
                  <div key={`${currentBoxType}-${index}`} className={currentBoxType}>
                    {boxLines}
                  </div>
                );
                inBox = false;
                boxLines = [];
                currentBoxType = '';
              }
            } else {
              elements.push(element);
            }
          });
          
          return elements;
        })()}
        {children}
      </div>
    </div>
  );
}

// Helper function to format current date/time for terminal
function formatTerminalDate(): string {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${day} ${month} ${date} ${hours}:${minutes}:${seconds}`;
}

// Helper function to create common terminal patterns
export function createTerminalLines(os: 'mac' | 'windows', scenario: string, locale: string = 'ko'): TerminalLine[] {
  const username = locale === 'en' ? 'username' : '사용자명';
  const macPrompt = `${username}@MacBook-Pro ~ %`;
  const winPrompt = `C:\\Users\\${username}>`;
  const prompt = os === 'mac' ? macPrompt : winPrompt;

  switch (scenario) {
    case 'initial':
      return os === 'mac' ? [
        { type: 'output', content: `Last login: ${formatTerminalDate()} on ttys001` },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ] : [
        { type: 'output', content: 'Microsoft Windows [Version 10.0.19045.3693]' },
        { type: 'output', content: '(c) Microsoft Corporation. All rights reserved.' },
        { type: 'output', content: '' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'node-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'node --version' },
        { type: 'output', content: os === 'mac' ? 'v22.18.0' : 'v22.18.0', className: 'node-version' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'node-npm-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'node --version' },
        { type: 'output', content: 'v22.18.0' },
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'npm --version' },
        { type: 'output', content: '11.5.2' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'claude-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'claude --version' },
        { type: 'output', content: '@anthropic-ai/claude-code/1.0.67', className: 'claude-version' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'auth-status':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'claude auth status' },
        { type: 'output', content: 'Authenticated as: your-email@example.com' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'homebrew-version':
      return [
        { type: 'output', content: `Last login: ${formatTerminalDate()} on ttys001` },
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'brew --version' },
        { type: 'output', content: 'Homebrew 4.5.13', className: 'homebrew-version' },
        { type: 'output', content: 'Homebrew/homebrew-core (git revision 3d4f5; last commit 2024-01-20)' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'git-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'git --version' },
        { type: 'output', content: 'git version 2.50.1.windows.1' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'project-created':
      if (os === 'mac') {
        return [
          { type: 'output', content: `Last login: ${formatTerminalDate()} on ttys001` },
          { type: 'prompt', content: `${username}@MacBook-Pro ~ %` },
          { type: 'command', content: 'claude' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Do you trust the files in this folder?', className: 'permission-box hint' },
          { type: 'output', content: '', className: 'permission-box' },
          { type: 'output', content: `/Users/${username}`, className: 'permission-box' },
          { type: 'output', content: 'Claude Code may read files in this folder. Reading untrusted files may', className: 'permission-box' },
          { type: 'output', content: 'lead Claude Code to behave in unexpected ways.', className: 'permission-box' },
          { type: 'output', content: 'With your permission Claude Code may execute files in this folder.', className: 'permission-box' },
          { type: 'output', content: 'Executing untrusted code is unsafe.', className: 'permission-box' },
          { type: 'output', content: 'https://docs.anthropic.com/xx/claude-code-security', className: 'permission-box link' },
          { type: 'output', content: '▸ 1. Yes, proceed ', className: 'permission-box option-selected' },
          { type: 'output', content: '2. No, exit', className: 'permission-box option-unselected' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Enter to confirm - Esc to exit' },
          { type: 'output', content: '' },
          { type: 'output', content: '* Welcome to Claude Code!', className: 'welcome-box' },
          { type: 'output', content: '/help for help, /status for your current setup', className: 'welcome-box' },
          { type: 'output', content: `cmd: /Users/${username}`, className: 'welcome-box' },
          { type: 'output', content: '' },
          { type: 'output', content: "What's new:" },
          { type: 'output', content: '• Added support for native Windows (requires Git for Windows)' },
          { type: 'output', content: '• Added support for Bedrock API keys through environment variable AWS_BEARER_TOKEN_BEDROCK' },
          { type: 'output', content: '• Settings: /doctor can now help you identify and fix invalid setting files' },
          { type: 'output', content: '• "--append-system-prompt" can now be used in interactive mode, not just --continue-session-from-file' },
          { type: 'output', content: '• Increased auto-compact warning threshold from 60% to 80%' },
          { type: 'output', content: '' },
          { type: 'raw', content: <div className="input-box"><span className="prompt">&gt;</span> <span className="cursor">T</span><span className="input-text">ry "create a util logging.py that..."</span></div> },
          { type: 'output', content: '' },
          { type: 'output', content: '? for shortcuts' }
        ];
      } else {
        return [
          { type: 'output', content: 'Microsoft Windows [Version 10.0.19045.3693]' },
          { type: 'output', content: '(c) Microsoft Corporation. All rights reserved.' },
          { type: 'output', content: '' },
          { type: 'prompt', content: `C:\\Users\\${username}\\my-first-project>` },
          { type: 'command', content: 'claude' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Do you trust the files in this folder?', className: 'permission-box hint' },
          { type: 'output', content: '', className: 'permission-box' },
          { type: 'output', content: `C:\\Users\\${username}\\my-first-project`, className: 'permission-box' },
          { type: 'output', content: 'Claude Code may read files in this folder. Reading untrusted files may', className: 'permission-box' },
          { type: 'output', content: 'lead Claude Code to behave in unexpected ways.', className: 'permission-box' },
          { type: 'output', content: 'With your permission Claude Code may execute files in this folder.', className: 'permission-box' },
          { type: 'output', content: 'Executing untrusted code is unsafe.', className: 'permission-box' },
          { type: 'output', content: 'https://docs.anthropic.com/xx/claude-code-security', className: 'permission-box link' },
          { type: 'output', content: '▸ 1. Yes, proceed ', className: 'permission-box option-selected' },
          { type: 'output', content: '2. No, exit', className: 'permission-box option-unselected' },
          { type: 'output', content: '' },
          { type: 'output', content: 'Enter to confirm - Esc to exit' },
          { type: 'output', content: '' },
          { type: 'output', content: '* Welcome to Claude Code!', className: 'welcome-box' },
          { type: 'output', content: '/help for help, /status for your current setup', className: 'welcome-box' },
          { type: 'output', content: `cwd: C:\\Users\\${username}\\my-first-project`, className: 'welcome-box' },
          { type: 'output', content: '' },
          { type: 'output', content: "What's new:" },
          { type: 'output', content: '• Added support for native Windows (requires Git for Windows)' },
          { type: 'output', content: '• Added support for Bedrock API keys through environment variable AWS_BEARER_TOKEN_BEDROCK' },
          { type: 'output', content: '• Settings: /doctor can now help you identify and fix invalid setting files' },
          { type: 'output', content: '• "--append-system-prompt" can now be used in interactive mode, not just --continue-session-from-file' },
          { type: 'output', content: '• Increased auto-compact warning threshold from 60% to 80%' },
          { type: 'output', content: '' },
          { type: 'raw', content: <div className="input-box"><span className="prompt">&gt;</span> <span className="cursor">T</span><span className="input-text">ry "create a util logging.py that..."</span></div> },
          { type: 'output', content: '' },
          { type: 'output', content: '? for shortcuts' }
        ];
      }
    
    default:
      return [];
  }
}