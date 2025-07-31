import Image from 'next/image';
import styles from './AuthorProfile.module.css';
import { AuthorProfileProps } from '@/app/types';

export default function AuthorProfile({
  avatar,
  name,
  subtitle,
  description,
  mainLink,
  socialLinks,
  className = ""
}: AuthorProfileProps) {
  return (
    <section className={`${styles.authorSection} ${className}`}>
      <div className={styles.authorProfile}>
        <Image 
          src={avatar.src} 
          alt={avatar.alt} 
          className={styles.authorAvatar}
          width={120}
          height={120}
          loading="lazy"
        />
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>{name}</div>
          <div className={styles.authorSubtitle}>{subtitle}</div>
          <div className={styles.authorDescription}>{description}</div>
          
          {(mainLink || socialLinks) && (
            <div className={styles.authorLinks}>
              {mainLink && (
                <a 
                  href={mainLink.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.authorLink} ${mainLink.className === 'blog-featured' ? styles.blogFeatured : ''} ${mainLink.className || ''}`}
                >
                  <i className={mainLink.icon}></i>
                  <span className={styles.visitLabel}>{mainLink.label}</span>
                </a>
              )}
              
              {socialLinks && socialLinks.length > 0 && (
                <div className={styles.authorSecondaryLinks}>
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.authorLink}
                      aria-label={link.ariaLabel || link.label}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}