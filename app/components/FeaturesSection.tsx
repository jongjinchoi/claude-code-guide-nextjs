import FeatureCard from './FeatureCard'
import styles from './FeaturesSection.module.css';

interface FeatureCardData {
  variant?: 'recommended' | 'advanced'
  icon: string
  title: string
  description: string | React.ReactNode
  badge?: string
  example?: {
    label: string
    content: string
  }
}

interface FeatureSection {
  subtitle?: string
  type: 'recommended' | 'advanced'
  cards: FeatureCardData[]
}

interface FeaturesSectionProps {
  title: string
  titleIcon?: string
  subtitle?: string
  cards?: FeatureCardData[] | {
    recommended?: FeatureCardData[]
    advanced?: FeatureCardData[]
  }
  sections?: FeatureSection[]
  columns?: 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
  showBadges?: boolean
  animateOnScroll?: boolean
  layout?: 'grid' | 'horizontal'
  className?: string
  onCardClick?: (card: FeatureCardData) => void
  onSectionView?: () => void
}

export default function FeaturesSection({
  title,
  titleIcon,
  subtitle,
  cards,
  sections,
  columns = 3,
  gap = 'medium',
  showBadges = true,
  animateOnScroll = false,
  layout = 'grid',
  className = '',
  onCardClick,
  onSectionView
}: FeaturesSectionProps) {
  // cards가 배열인 경우 바로 렌더링
  if (Array.isArray(cards)) {
    const gapClass = {
      small: styles.gapSmall,
      medium: styles.gapMedium,
      large: styles.gapLarge
    }[gap]

    const columnsClass = styles[`columns${columns}`]
    const layoutClass = layout === 'horizontal' ? styles.layoutHorizontal : ''

    return (
      <section 
        className={`${styles.featuresSection} ${className}`}
        onMouseEnter={onSectionView}
      >
        <h2>
          {titleIcon && <i className={titleIcon} style={{ marginRight: 'var(--space-2)' }}></i>}
          {title}
        </h2>
        {subtitle && <p className={styles.featuresSubtitle}>{subtitle}</p>}
        
        <div className={`${styles.featuresGrid} ${columnsClass} ${gapClass} ${layoutClass} ${animateOnScroll ? styles.animateOnScroll : ''}`}>
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={() => onCardClick?.(card)}
              style={{ cursor: onCardClick ? 'pointer' : 'default' }}
            >
              <FeatureCard
                variant={card.variant || 'recommended'}
                icon={card.icon}
                title={card.title}
                description={card.description}
                badge={showBadges ? card.badge : undefined}
                example={card.example}
              />
            </div>
          ))}
        </div>
      </section>
    )
  }

  // 기존 sections 형식 처리
  const featureSections: FeatureSection[] = sections || [
    ...(cards && !Array.isArray(cards) && cards.recommended ? [{
      type: 'recommended' as const,
      cards: cards.recommended
    }] : []),
    ...(cards && !Array.isArray(cards) && cards.advanced ? [{
      type: 'advanced' as const,
      cards: cards.advanced
    }] : [])
  ]

  const gapClass = {
    small: styles.gapSmall,
    medium: styles.gapMedium,
    large: styles.gapLarge
  }[gap]

  const columnsClass = styles[`columns${columns}`]
  const layoutClass = layout === 'horizontal' ? styles.layoutHorizontal : ''

  return (
    <section 
      className={`features-section ${className}`}
      onMouseEnter={onSectionView}
    >
      <h2>
        {titleIcon && <i className={titleIcon} style={{ marginRight: 'var(--space-2)' }}></i>}
        {title}
      </h2>
      {subtitle && <p className={styles.featuresSubtitle}>{subtitle}</p>}
      
      {featureSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.featuresGroup}>
          {section.subtitle && <h3 className={styles.featuresGroupTitle}>{section.subtitle}</h3>}
          <div className={`${styles.featuresGrid} ${columnsClass} ${gapClass} ${layoutClass} ${animateOnScroll ? styles.animateOnScroll : ''}`}>
            {section.cards.map((card, cardIndex) => (
              <div 
                key={`${section.type}-${cardIndex}`}
                onClick={() => onCardClick?.(card)}
                style={{ cursor: onCardClick ? 'pointer' : 'default' }}
              >
                <FeatureCard
                  variant={section.type}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  badge={showBadges ? card.badge : undefined}
                  example={card.example}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}