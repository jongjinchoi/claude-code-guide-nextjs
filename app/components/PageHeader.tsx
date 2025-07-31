import React from 'react'
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  variant: 'hero' | 'compact'
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}

export default function PageHeader({ 
  variant, 
  title, 
  subtitle, 
  badge, 
  children 
}: PageHeaderProps) {
  if (variant === 'hero') {
    return (
      <header className={`${styles.pageHeader} ${styles.hero}`}>
        {badge && (
          <div className={styles.badge}>
            <i className="fas fa-robot"></i> {badge}
          </div>
        )}
        
        <div className={styles.content}>
          <h1 className={styles.title}>
            <i className="fas fa-robot"></i> {title}
          </h1>
          
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>
        
        {children && (
          <div className={styles.controls}>
            {children}
          </div>
        )}
      </header>
    )
  }

  // compact variant
  return (
    <header className={`${styles.pageHeader} ${styles.compact}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <i className="fas fa-robot"></i> {title}
        </h1>
        
        {children && (
          <div className={styles.controls}>
            {children}
          </div>
        )}
      </div>
    </header>
  )
}