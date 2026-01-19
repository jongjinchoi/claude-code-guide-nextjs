'use client'

import { useState } from 'react'
import styles from './AboutQuestions.module.css';

/**
 * @page About Page Only
 * @description About 페이지 전용 Q&A 섹션 컴포넌트
 * @warning FAQ 페이지와 무관함 - FAQ 페이지는 별도의 FAQItem 컴포넌트 사용
 */

interface QuestionItem {
  question: string
  answer: string[]
}

interface AboutQuestionsProps {
  title?: string
  showIcon?: boolean
  items: QuestionItem[]
  variant?: 'default' | 'compact'
  className?: string
  itemClassName?: string
}

export default function AboutQuestions({ 
  title = "자주 묻는 질문",
  showIcon = true,
  items,
  variant = 'default',
  className = "",
  itemClassName = ""
}: AboutQuestionsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  
  const defaultItemClass = variant === 'compact' ? styles.aboutQuestionItemCompact : styles.aboutQuestionItem
  const finalItemClass = itemClassName || defaultItemClass

  return (
    <section className={`${styles.aboutQuestions} ${className}`}>
      <h2>
        {showIcon && <i className="fas fa-question-circle" aria-hidden="true" style={{ color: 'var(--primary-color)', marginRight: 'var(--space-2)' }}></i>}
        {title}
      </h2>
      <div className={styles.aboutQuestionsContainer}>
        {items.map((item, index) => (
          <div key={index} className={finalItemClass}>
            <button 
              className={styles.aboutQuestion}
              onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
            >
              <span><strong className={styles.questionQ}>Q.</strong> {item.question}</span>
              <i className={`fas fa-chevron-${expandedQuestion === index ? 'up' : 'down'}`} aria-hidden="true"></i>
            </button>
            <div className={`${styles.aboutAnswer} ${expandedQuestion === index ? styles.isActive : ''}`}>
              <div className={styles.aboutAnswerContent}>
                {item.answer.map((paragraph, pIndex) => {
                  const hasHtml = paragraph.includes('<')
                  if (hasHtml) {
                    return (
                      <div key={pIndex}>
                        {pIndex === 0 && <><strong className={styles.answerA}>A.</strong>{' '}</>}
                        <div dangerouslySetInnerHTML={{ __html: paragraph }} />
                      </div>
                    )
                  }
                  return (
                    <p key={pIndex}>
                      {pIndex === 0 && <strong className={styles.answerA}>A.</strong>}
                      {' '}
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}