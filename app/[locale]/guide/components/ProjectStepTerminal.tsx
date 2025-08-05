'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './ProjectStepTerminal.module.css';

interface ProjectStepTerminalProps {
  os?: 'mac' | 'windows';
}

export default function ProjectStepTerminal({ os = 'mac' }: ProjectStepTerminalProps) {
  const isMac = os === 'mac';
  const t = useTranslations('guide');
  const locale = useLocale();
  const username = locale === 'en' ? 'username' : '사용자명';
  const folderPath = isMac ? `/Users/${username}/my-first-project` : `C:\\Users\\${username}\\my-first-project`;
  const cwdPath = isMac ? `cmd: /Users/${username}` : `cwd: C:\\Users\\${username}\\my-first-project`;
  
  return (
    <div className={`${styles.terminal} ${styles[os]}`}>
      <div className={styles.terminalHeader}>
        <span className={styles.terminalTitle}>
          {isMac ? t('terminal.successTitle.mac') : t('terminal.successTitle.windows')}
        </span>
      </div>
      <div className={styles.terminalContent}>
        {/* Initial output */}
        {isMac ? (
          <div className={styles.output}>
            Last login: {formatTerminalDate()} on ttys001
          </div>
        ) : (
          <>
            <div className={styles.output}>Microsoft Windows [Version 10.0.19045.3693]</div>
            <div className={styles.output}>(c) Microsoft Corporation. All rights reserved.</div>
            <div className={styles.output}></div>
          </>
        )}
        
        {/* Prompt and command */}
        <div className={styles.commandLine}>
          <span className={styles.prompt}>
            {isMac ? `${username}@MacBook-Pro ~ %` : `C:\\Users\\${username}\\my-first-project>`}
          </span>
          <span className={styles.command}> claude</span>
        </div>
        
        <div className={styles.output}></div>
        
        {/* Permission box */}
        <div className={styles.permissionBox}>
          <div className={styles.permissionHint}>Do you trust the files in this folder?</div>
          <div className={styles.permissionText}></div>
          <div className={styles.permissionText}>{folderPath}</div>
          <div className={styles.permissionText}>Claude Code may read files in this folder. Reading untrusted files may</div>
          <div className={styles.permissionText}>lead Claude Code to behave in unexpected ways.</div>
          <div className={styles.permissionText}>With your permission Claude Code may execute files in this folder.</div>
          <div className={styles.permissionText}>Executing untrusted code is unsafe.</div>
          <div className={styles.permissionLink}>https://docs.anthropic.com/xx/claude-code-security</div>
          <div className={styles.optionSelected}>▸ 1. Yes, proceed </div>
          <div className={styles.optionUnselected}>2. No, exit</div>
        </div>
        
        <div className={styles.output}></div>
        <div className={styles.output}>Enter to confirm - Esc to exit</div>
        <div className={styles.output}></div>
        
        {/* Welcome box */}
        <div className={styles.welcomeBox}>
          <div className={styles.welcomeTitle}>
            <span className={styles.asterisk}>*</span>
            <span>Welcome to Claude Code!</span>
          </div>
          <div className={styles.welcomeText}>/help for help, /status for your current setup</div>
          <div className={styles.welcomeText}>{cwdPath}</div>
        </div>
        
        <div className={styles.output}></div>
        <div className={styles.output}>What's new:</div>
        <div className={styles.output}>• Added support for native Windows (requires Git for Windows)</div>
        <div className={styles.output}>• Added support for Bedrock API keys through environment variable AWS_BEARER_TOKEN_BEDROCK</div>
        <div className={styles.output}>• Settings: /doctor can now help you identify and fix invalid setting files</div>
        <div className={styles.output}>• "--append-system-prompt" can now be used in interactive mode, not just --continue-session-from-file</div>
        <div className={styles.output}>• Increased auto-compact warning threshold from 60% to 80%</div>
        <div className={styles.output}></div>
        
        {/* Input prompt */}
        <div className={styles.inputBox}>
          <span className={styles.inputPrompt}>&gt;</span>
          <span className={styles.cursor}>T</span>
          <span className={styles.inputText}>ry "create a util logging.py that..."</span>
        </div>
        
        <div className={styles.output}></div>
        <div className={styles.output}>? for shortcuts</div>
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