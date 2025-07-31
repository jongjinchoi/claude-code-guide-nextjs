import styles from './FeatureCard.module.css';
import { FeatureCardProps } from '@/app/types';

export default function FeatureCard({
  variant,
  icon,
  title,
  description,
  badge,
  example
}: FeatureCardProps) {
  const cardClass = variant === 'recommended' 
    ? `${styles.featureCard} ${styles.recommended}` 
    : `${styles.featureCard} ${styles.advanced}`

  return (
    <div className={cardClass}>
      {badge && <span className={styles.recommendationBadge}>{badge}</span>}
      <div className={styles.featureHeader}>
        <div className={styles.featureTitleWrapper}>
          <div className={styles.featureIcon}>{icon}</div>
          <h3 className={styles.featureTitle}>{title}</h3>
        </div>
      </div>
      <p className={styles.featureDescription}>{description}</p>
      {example && (
        <div className={example.label === "예시" ? styles.featureExample : styles.featureSimple}>
          <strong>{example.label}:</strong> {example.content}
        </div>
      )}
    </div>
  )
}