'use client'

import React from 'react';
import styles from './ClaudeCodeREPL.module.css';

interface ClaudeCodeREPLProps {
  currentOS: 'mac' | 'windows';
  showExitCommand?: boolean;
  className?: string;
}

interface Command {
  name: string;
  description: string;
  isHighlighted?: boolean;
}

const commands: Command[] = [
  { name: '/exit (quit)', description: 'Exit the REPL', isHighlighted: true },
  { name: '/memory', description: 'Edit Claude memory files' },
  { name: '/vim', description: 'Toggle between Vim and Normal editing modes' },
  { name: '/clear', description: 'Clear conversation history and free up context' },
  { name: '/compact', description: 'Clear conversation history but keep a summary in context. Optional: /compact\n[instructions for summarization]' }
];

export function ClaudeCodeREPL({ currentOS, showExitCommand = true, className }: ClaudeCodeREPLProps) {
  return (
    <div className={`${styles.replContainer} ${className || ''}`}>
      <div className={styles.replHeader}>
        <span className={styles.replTitle}>
          {currentOS === 'windows' 
            ? 'Claude Code 종료하기 - 명령 프롬프트는 유지' 
            : 'Claude Code 종료하기 - 터미널은 유지'}
        </span>
      </div>
      
      <REPLWelcomeBox />
      
      <div className={styles.replTip}>
        <span className={styles.replOutput}>※ Tip: Want Claude to remember something? Hit # to add preferences, tools, and instructions to Claude&apos;s memory</span>
      </div>

      {showExitCommand && <REPLCommandInput command="/exit" />}

      <REPLCommandList commands={commands} />
      
      <div className={styles.replFooter}>
        <span className={styles.replComment}># → Enter를 누르면 Claude Code가 종료됩니다</span>
      </div>
    </div>
  );
}

function REPLWelcomeBox() {
  return (
    <div className={styles.welcomeBox}>
      <div className={styles.replLine}>
        <span className={styles.replPrompt}>*</span>
      </div>
      <div className={styles.replLine}>
        <span className={styles.replWelcome}>Welcome to Claude Code!</span>
      </div>
      <div className={styles.replLine}>
        <span className={styles.replDescription}>/help for help, /status for your current setup</span>
      </div>
      <div className={styles.replLine}>
        <span className={styles.replInfo}>cwd: /Users/username</span>
      </div>
    </div>
  );
}

interface REPLCommandInputProps {
  command: string;
}

function REPLCommandInput({ command }: REPLCommandInputProps) {
  return (
    <div className={styles.commandInputBox}>
      <span className={styles.replPrompt}>&gt;</span> 
      <span className={styles.replCommand}>{command}</span>
      <span className={styles.replCursor}></span>
    </div>
  );
}

interface REPLCommandListProps {
  commands: Command[];
}

function REPLCommandList({ commands }: REPLCommandListProps) {
  return (
    <table className={styles.commandList}>
      <tbody>
        {commands.map((cmd, index) => (
          <tr key={index}>
            <td className={styles.commandName}>
              {cmd.isHighlighted ? (
                <span className={styles.highlightedCommand}>{cmd.name}</span>
              ) : (
                cmd.name
              )}
            </td>
            <td className={styles.commandDescription}>
              {cmd.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < cmd.description.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}