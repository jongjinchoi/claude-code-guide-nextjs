'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/app/lib/stores/themeStore';
import { HeaderControlsProps } from '@/app/types';
import styles from './HeaderControls.module.css';

export default function HeaderControls({
  showOSToggle = true,
  showFontControl = true,
  showThemeToggle = true,
  currentOS,
  onOSChange
}: HeaderControlsProps) {
  // Zustand stores
  const { theme, toggleTheme, fontSize, increaseFontSize, decreaseFontSize } = useThemeStore();
  
  // Use currentOS prop
  const displayOS = currentOS || 'mac';

  // OS Toggle Handler
  const handleOSToggle = (os: 'mac' | 'windows') => {
    // Call parent callback if provided
    if (onOSChange) {
      onOSChange(os);
    }
  };

  // Convert fontSize number to size category for UI
  const getFontSizeCategory = () => {
    if (fontSize <= 14) return 'small';
    if (fontSize <= 16) return 'normal';
    if (fontSize <= 18) return 'large';
    return 'xlarge';
  };

  const fontSizeCategory = getFontSizeCategory();

  return (
    <div className={styles.headerControls}>
      {/* OS Toggle */}
      {showOSToggle && (
        <button className={styles.osToggle} onClick={() => handleOSToggle(displayOS === 'mac' ? 'windows' : 'mac')}>
          <span className={styles.osText}>
            {displayOS === 'mac' ? (
              <><i className="fab fa-apple"></i> macOS</>
            ) : (
              <><i className="fab fa-windows"></i> Windows</>
            )}
          </span>
          <i className="fas fa-chevron-down"></i>
        </button>
      )}

      {/* Font Size Control */}
      {showFontControl && (
        <div className={styles.fontSizeControls}>
          <button
            className={styles.fontSizeBtn}
            onClick={decreaseFontSize}
            title="글자 작게"
            disabled={fontSize <= 14}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className={styles.fontSizeLabel}>A</span>
          <button
            className={styles.fontSizeBtn}
            onClick={increaseFontSize}
            title="글자 크게"
            disabled={fontSize >= 20}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}

      {/* Theme Toggle */}
      {showThemeToggle && (
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`테마 변경 (현재: ${theme === 'light' ? '라이트' : '다크'} 모드)`}
          title={theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
        >
          <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
      )}
    </div>
  );
}