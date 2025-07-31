'use client'

import React from 'react';
import styles from './FAQTerminal.module.css';

interface FAQTerminalProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  os?: 'mac' | 'windows';
}

export function FAQTerminal({ title, children, className, os }: FAQTerminalProps) {
  const isWindows = os === 'windows' || (typeof document !== 'undefined' && document.body.getAttribute('data-current-os') === 'windows');
  
  return (
    <div className={`${styles.terminalExample} ${isWindows ? styles.terminalWindows : ''} ${className || ''}`}>
      <div className={styles.terminalHeader}>
        <span className={styles.terminalTitle}>{title}</span>
      </div>
      <div className={styles.terminalContent}>
        {children}
      </div>
    </div>
  );
}

interface TerminalLineProps {
  children: React.ReactNode;
  className?: string;
}

export function FAQTerminalLine({ children, className }: TerminalLineProps) {
  return (
    <div className={`${styles.terminalLine} ${className || ''}`}>
      {children}
    </div>
  );
}

interface TerminalTextProps {
  children: React.ReactNode;
}

export function FAQTerminalPrompt({ children }: TerminalTextProps) {
  return <span className={styles.prompt}>{children}</span>;
}

export function FAQTerminalCommand({ children }: TerminalTextProps) {
  return <span className={styles.command}>{children}</span>;
}

export function FAQTerminalOutput({ children }: TerminalTextProps) {
  return <span className={styles.output}>{children}</span>;
}

export function FAQTerminalComment({ children }: TerminalTextProps) {
  return <span className={styles.comment}>{children}</span>;
}

export function FAQTerminalCursor() {
  return <span className={styles.cursor}></span>;
}

// OS별 프롬프트 헬퍼
export function FAQTerminalMacPrompt() {
  return <FAQTerminalPrompt>사용자명@MacBook-Pro ~ %</FAQTerminalPrompt>;
}

export function FAQTerminalWindowsPrompt() {
  return <FAQTerminalPrompt>C:\Users\사용자명&gt;</FAQTerminalPrompt>;
}