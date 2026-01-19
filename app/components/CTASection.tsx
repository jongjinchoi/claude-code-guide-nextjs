import styles from './CTASection.module.css';
import { Button } from './Button';

interface CTAInfo {
  text: string
  label?: string
}

interface CTASectionProps {
  title: string
  subtitle?: string
  info?: CTAInfo[]
  buttonText: string
  buttonIcon?: string
  buttonHref: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function CTASection({
  title,
  subtitle,
  info,
  buttonText,
  buttonIcon,
  buttonHref,
  variant = 'primary',
  className = ''
}: CTASectionProps) {
  return (
    <section className={`${styles.ctaSection} ${className}`}>
      <h2>{title}</h2>
      {subtitle && <p className={styles.ctaSubtitle}>{subtitle}</p>}
      
      {info && info.length > 0 && (
        <div className={styles.ctaInfo}>
          {info.map((item, index) => (
            <span key={index}>
              {item.label && <span className={styles.ctaInfoLabel}>{item.label}:</span>}
              {item.text}
            </span>
          ))}
        </div>
      )}
      
      <Button
        href={buttonHref}
        variant={variant}
        size="large"
        hero
        icon={buttonIcon ? <i className={buttonIcon} aria-hidden="true"></i> : undefined}
      >
        {buttonText}
      </Button>
    </section>
  )
}