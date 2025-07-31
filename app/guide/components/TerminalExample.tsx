'use client';

import React from 'react';

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
  // Determine the title based on OS and variant
  const defaultTitle = variant === 'success' 
    ? (os === 'mac' ? '터미널 - 성공적인 경우' : '명령 프롬프트 - 성공적인 경우')
    : (os === 'mac' ? '터미널' : '명령 프롬프트');
  
  const displayTitle = title || defaultTitle;
  
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
        {lines.map((line, index) => {
          switch (line.type) {
            case 'prompt':
              return (
                <React.Fragment key={index}>
                  <span className="prompt">{line.content}</span>
                  {/* Check if next line is a command */}
                  {lines[index + 1]?.type === 'command' && ' '}
                </React.Fragment>
              );
            case 'command':
              // Commands are inline with prompts, so they're rendered as text
              return <React.Fragment key={index}>{line.content}</React.Fragment>;
            case 'output':
              return (
                <span key={index} className={`output ${line.className || ''}`}>
                  {line.content}
                </span>
              );
            case 'cursor':
              return <span key={index} className="cursor"></span>;
            case 'raw':
              // For raw content, render as-is
              return <React.Fragment key={index}>{line.content}</React.Fragment>;
            default:
              return null;
          }
        })}
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
export function createTerminalLines(os: 'mac' | 'windows', scenario: string): TerminalLine[] {
  const macPrompt = '사용자명@MacBook-Pro ~ %';
  const winPrompt = 'C:\\Users\\사용자명>';
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
        { type: 'output', content: os === 'mac' ? 'v22.17.1' : 'v20.15.0', className: 'node-version' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'node-npm-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'node --version' },
        { type: 'output', content: 'v22.17.1' },
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'npm --version' },
        { type: 'output', content: '11.4.2' },
        { type: 'prompt', content: prompt },
        { type: 'cursor', content: '' }
      ];
    
    case 'claude-version':
      return [
        { type: 'prompt', content: prompt },
        { type: 'command', content: 'claude --version' },
        { type: 'output', content: '@anthropic-ai/claude-code/1.0.58', className: 'claude-version' },
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
        { type: 'output', content: 'Homebrew 4.5.11', className: 'homebrew-version' },
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
    
    default:
      return [];
  }
}