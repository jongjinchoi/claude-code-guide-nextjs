'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Link } from '@/src/i18n/navigation';
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
  // Translations
  const t = useTranslations('common');
  
  // Zustand stores
  const { theme, toggleTheme, fontSize, increaseFontSize, decreaseFontSize } = useThemeStore();
  
  // Use currentOS prop
  const displayOS = currentOS || 'mac';
  
  // i18n routing
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || 'en';

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
            title={t('header_controls.font_size.decrease')}
            disabled={fontSize <= 14}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className={styles.fontSizeLabel}>A</span>
          <button
            className={styles.fontSizeBtn}
            onClick={increaseFontSize}
            title={t('header_controls.font_size.increase')}
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
          aria-label={t('header_controls.theme.aria_label', { 
            current: theme === 'light' ? t('header_controls.theme.light_mode') : t('header_controls.theme.dark_mode') 
          })}
          title={theme === 'light' ? t('header_controls.theme.switch_to_dark') : t('header_controls.theme.switch_to_light')}
        >
          <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
      )}

      {/* Language Switcher */}
      <Link
        href={pathname.replace(`/${locale}`, '')}
        locale={locale === 'ko' ? 'en' : 'ko'}
        className={styles.languageToggle}
        title={locale === 'ko' ? 'Switch to English' : '한국어로 전환'}
      >
        <span className={styles.flagIcon}>
          {locale === 'ko' ? '🇺🇸' : '🇰🇷'}
        </span>
      </Link>
    </div>
  );
}