import React from 'react';
import styles from './SolutionSteps.module.css';

interface SolutionStepsProps {
  children: React.ReactNode;
  type?: 'ordered' | 'unordered';
  className?: string;
}

export function SolutionSteps({ 
  children, 
  type = 'ordered',
  className 
}: SolutionStepsProps) {
  const Tag = type === 'ordered' ? 'ol' : 'ul';
  
  return (
    <div className={`${styles.solutionSteps} ${className || ''}`}>
      <Tag>{children}</Tag>
    </div>
  );
}