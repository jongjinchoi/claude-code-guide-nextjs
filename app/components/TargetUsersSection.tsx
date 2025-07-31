import styles from './TargetUsersSection.module.css';

interface TargetUser {
  icon: string
  title: string
  description: string
}

interface TargetUsersSectionProps {
  title?: string
  subtitle?: string
  icon?: {
    name: string
    color?: string
    marginRight?: string
  }
  users: TargetUser[]
  className?: string
  variant?: 'default' | 'compact' | 'highlight'
  boxClassName?: string
  listClassName?: string
  itemClassName?: string
}

export default function TargetUsersSection({
  title = "이런 분들께 추천해요",
  subtitle,
  icon,
  users,
  className = "",
  variant = 'default',
  boxClassName = "",
  listClassName = "",
  itemClassName = ""
}: TargetUsersSectionProps) {
  const sectionClass = variant === 'compact' ? `${styles.targetUsersSection} ${styles.targetUsersSectionCompact}` :
                       variant === 'highlight' ? `${styles.targetUsersSection} ${styles.targetUsersSectionHighlight}` :
                       styles.targetUsersSection;
  
  return (
    <section className={`${sectionClass} ${className}`}>
      <h2>
        {icon && (
          <i 
            className={icon.name}
            style={{ 
              color: icon.color || 'var(--primary-color)', 
              marginRight: icon.marginRight || 'var(--space-2)' 
            }}
          ></i>
        )}
        {title}
      </h2>
      {subtitle && <p className={styles.targetUsersSubtitle}>{subtitle}</p>}
      <div className={`${styles.targetUsersBox} ${boxClassName}`}>
        <ul className={`${styles.targetUsersList} ${listClassName}`}>
          {users.map((user, index) => (
            <li key={index} className={`${styles.targetUserItem} ${itemClassName}`}>
              <div className={styles.targetUserIcon}>
                <i className={user.icon}></i>
              </div>
              <div className={styles.targetUserText}>
                <strong>{user.title}</strong> - {user.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}