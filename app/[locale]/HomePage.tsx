'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import '../styles/pages/landing.css';
import UserCounter from '../components/UserCounter';
import { Button } from '../components/Button';

export default function HomePage() {
  const t = useTranslations('landing');

  useEffect(() => {
    // 페이지 뷰 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: '/',
        page_title: 'Claude Code Guide - Home'
      });
    }

    // 방문자 카운터 증가 (중복 방지)
    const hasVisited = sessionStorage.getItem('has_visited');
    if (!hasVisited) {
      fetch('/api/counter', { method: 'POST' })
        .then(() => {
          sessionStorage.setItem('has_visited', 'true');
        })
        .catch((error) => {
          console.error('Failed to increment counter:', error);
        });
    }
  }, []);

  return (
    <>
      {/* 히어로 섹션 */}
      <section className="landing-hero">
        {/* 플로팅 이모지 배경 */}
        <div className="floating-emoji emoji-1">{t('floating_emojis.0')}</div>
        <div className="floating-emoji emoji-2">{t('floating_emojis.1')}</div>
        <div className="floating-emoji emoji-3">{t('floating_emojis.2')}</div>
        <div className="floating-emoji emoji-4">{t('floating_emojis.3')}</div>
        
        <div className="hero-badge">
          <i className={t('hero.badge.icon')}></i> {t('hero.badge.text')}
        </div>
        
        <h1 className="hero-title">
          {t('hero.title').split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < t('hero.title').split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        
        <p className="hero-subtitle">
          <i className={t('hero.subtitle.icon')} style={{ color: 'var(--primary-color)', marginRight: '8px' }}></i>
          <span style={{ color: 'var(--primary-color)', fontWeight: 500 }}>{t('hero.subtitle.highlight')}</span>
          {t('hero.subtitle.suffix')}
        </p>
        
        {/* UserCounter 컴포넌트 사용 */}
        <div className="success-counter" data-special="true">
          <UserCounter />
        </div>
        
        <div className="hero-cta">
          <div className="cta-wrapper">
            <Button 
              href="/guide" 
              variant="primary"
              size="large"
              hero={true}
              className="btn-hero-primary"
              trackingName="start_guide"
              trackingCategory="home_hero"
              icon={<i className={t('hero.cta.primary.icon')}></i>}
            >
              {t('hero.cta.primary.text')}
            </Button>
            <small className="cta-subtitle">{t('hero.cta.subtitle')}</small>
          </div>
          <Button 
            href="/about" 
            variant="secondary"
            size="large"
            hero={true}
            className="btn-hero-secondary"
            trackingName="learn_more"
            trackingCategory="home_hero"
          >
            {t('hero.cta.secondary.text')}
          </Button>
        </div>
        
        <div className="features-preview">
          {[0, 1, 2].map((index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{t(`features_preview.${index}.icon`)}</div>
              <div className="feature-title">{t(`features_preview.${index}.title`)}</div>
              <div className="feature-desc">{t(`features_preview.${index}.description`)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}