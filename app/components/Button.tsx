'use client'

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

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
  type = 'button'
}: ButtonProps) {
  const classNames = [
    styles.btn,
    styles[`btn${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
    styles[`btn${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    hero ? styles.btnHero : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className={styles.btnIcon}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}