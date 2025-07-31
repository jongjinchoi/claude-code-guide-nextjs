'use client';

import { useState } from 'react';
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

  return (
    <div className={styles.introStep}>
      <div className={styles.checkSection}>
        <h3>시작하기 전 확인사항</h3>
        <p>Claude Code 설치를 시작하기 전에 아래 항목들을 확인해주세요:</p>
        
        <div className={styles.checkList}>
          <ul>
            <li><strong>Claude Pro 계정</strong> - Pro 플랜($20/월) 이상 구독 필수</li>
            <li><strong>30분 정도의 시간</strong> - 설치 및 설정 완료까지</li>
            <li><strong>인터넷 연결</strong> - 안정적인 네트워크 환경</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.terminalGuide}>
        <h3>{isMac ? '터미널' : '명령 프롬프트'} 사용 가이드</h3>
        <p>{isMac ? '터미널은' : '명령 프롬프트는'} 명령어를 입력하여 컴퓨터를 제어하는 프로그램입니다.</p>
        
        <div className={styles.terminalGuideBox}>
          <h4>{isMac ? '터미널' : '명령 프롬프트'} 열기</h4>
          
          <div className={styles.openMethodList}>
            <ul>
              {isMac ? (
                <>
                  <li><kbd>Command (Cmd) ⌘</kbd> + <kbd>Space</kbd>를 누르고 "terminal" 입력</li>
                  <li>Applications → Utilities → Terminal</li>
                  <li>Launchpad에서 "terminal" 검색</li>
                </>
              ) : (
                <>
                  <li><kbd>Windows 키</kbd> + <kbd>R</kbd>을 누르고 "cmd" 입력 후 <kbd>Enter ↵</kbd></li>
                  <li>시작 메뉴에서 "명령 프롬프트" 또는 "cmd" 검색</li>
                  <li>시작 메뉴 → Windows 시스템 → 명령 프롬프트</li>
                </>
              )}
            </ul>
          </div>
          
          <TerminalExample 
            title={`${isMac ? '터미널' : '명령 프롬프트'}를 열면 이렇게 보입니다`}
            os={os}
            lines={createTerminalLines(os, 'initial')}
          />
          
          <div className={styles.terminalSeparator}></div>
          
          <h4>{isMac ? '터미널' : '명령 프롬프트'} 종료하기</h4>
          
          <div className={styles.closeMethodList}>
            <ul>
              {isMac ? (
                <>
                  <li><kbd>Command (Cmd) ⌘</kbd> + <kbd>Q</kbd>로 완전 종료</li>
                  <li><kbd>Command (Cmd) ⌘</kbd> + <kbd>W</kbd>로 창만 닫기</li>
                  <li>또는 <code>exit</code> 입력 후 <kbd>Enter ↵</kbd></li>
                </>
              ) : (
                <>
                  <li>창의 X 버튼 클릭</li>
                  <li>또는 <code>exit</code> 입력 후 <kbd>Enter ↵</kbd></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.singleButton}>
        <p><strong>내용을 확인했다면 완료 버튼을 클릭하세요:</strong></p>
        <ResultButton 
          step={isMac ? "start" : "start-windows"} 
          result="success"
          icon="fa-check-circle"
          title="이해했습니다 - 다음 단계로!"
          description={`${isMac ? '터미널' : '명령 프롬프트'} 사용법을 숙지했습니다`}
          selected={isReadOnly && selectedButton === 'success'}
          disabled={isReadOnly && selectedButton !== 'success'}
          onButtonClick={onButtonClick}
        />
      </div>
    </div>
  );
}