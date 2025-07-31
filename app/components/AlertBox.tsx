import React from 'react';
import styles from './AlertBox.module.css';

interface AlertBoxProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function AlertBox({ 
  variant = 'default', 
  title,
  icon,
  children, 
  className 
}: AlertBoxProps) {
  // Default icons for each variant
  const defaultIcons = {
    default: '⚠️',
    info: '💡',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  const displayIcon = icon || (title && defaultIcons[variant]);

  return (
    <div className={`${styles.alertBox} ${styles[`alertBox${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]} ${className || ''}`}>
      {title && (
        <h5 className={styles.alertBoxTitle}>
          {displayIcon && <span className={styles.alertBoxIcon}>{displayIcon}</span>}
          {title}
        </h5>
      )}
      <div className={styles.alertBoxContent}>
        {children}
      </div>
    </div>
  );
}