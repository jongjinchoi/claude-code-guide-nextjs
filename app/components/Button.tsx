'use client'

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';
import { SimplifiedAnalytics } from '@/app/lib/analytics/SimplifiedAnalytics';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'dark' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  hero?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  trackingName?: string;
  trackingCategory?: string;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  hero = false,
  children,
  onClick,
  href,
  className = '',
  icon,
  disabled = false,
  type = 'button',
  trackingName,
  trackingCategory = 'button'
}: ButtonProps) {
  const classNames = [
    styles.btn,
    styles[`btn${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    styles[`btn${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    hero ? styles.btnHero : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = async (e: React.MouseEvent) => {
    // 추적
    if (trackingName) {
      await SimplifiedAnalytics.trackButtonClick(
        trackingName,
        trackingCategory,
        {
          variant,
          size,
          href: href || 'none'
        }
      );
    }
    
    // 원래 onClick 핸들러 실행
    if (onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {icon && <span className={styles.btnIcon}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}