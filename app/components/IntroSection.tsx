import styles from './IntroSection.module.css';

interface IntroSectionProps {
  title?: string
  content: {
    paragraphs: string[]
    tip?: {
      title: string
      content: string
    }
  }
  className?: string
  variant?: 'default' | 'primary' | 'minimal'
  showIcon?: boolean
  icon?: string
}

export default function IntroSection({
  title = "Claude Code란 무엇인가요?",
  content,
  className = "",
  variant = 'primary',
  showIcon = true,
  icon
}: IntroSectionProps) {
  const sectionClass = variant === 'minimal' ? `${styles.introSection} ${styles.introSectionMinimal}` : 
                       variant === 'primary' ? `${styles.introSection} ${styles.introSectionPrimary}` : 
                       styles.introSection;
  
  return (
    <section className={`${sectionClass} ${className}`}>
      <h2 className={showIcon ? styles.withIcon : ''}>
        {icon && <i className={icon} aria-hidden="true"></i>}
        {title}
      </h2>
      <div className={styles.introContent}>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
        
        {content.tip && (
          <div className={styles.beginnerTip}>
            💡 <strong>{content.tip.title}:</strong> {content.tip.content}
          </div>
        )}
      </div>
    </section>
  )
}