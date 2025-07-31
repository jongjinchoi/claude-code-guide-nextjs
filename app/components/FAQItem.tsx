import React from 'react';

interface FAQItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

import styles from './FAQItem.module.css';

export function FAQItem({ title, children, className }: FAQItemProps) {
  return (
    <div className={`${styles.faqItem} ${className || ''}`}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}