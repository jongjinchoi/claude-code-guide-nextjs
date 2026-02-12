'use client'

import React from 'react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/app/config/site';
import '../../styles/pages/about.css';
import '../../styles/components/tooltips.css';
import HeaderControls from '../../components/HeaderControls';
import PageHeader from '../../components/PageHeader';
import AboutQuestions from '../../components/AboutQuestions';
import FeaturesSection from '../../components/FeaturesSection';
import CTASection from '../../components/CTASection';
import AuthorProfile from '../../components/AuthorProfile';
import IntroSection from '../../components/IntroSection';
import TargetUsersSection from '../../components/TargetUsersSection';

// 모든 데이터를 중앙화된 파일에서 가져오기

export default function AboutPageClient() {
  const t = useTranslations('about');

  return (
    <div className="page-wrapper page-wrapper--about about-page">
      <div className="container">
        {/* 헤더 */}
        <PageHeader
          variant="hero"
          title={t('header.title')}
          subtitle={t('header.subtitle')}
          badge={t('header.badge')}
        >
          <HeaderControls showOSToggle={false} />
        </PageHeader>

        {/* 메인 콘텐츠 */}
        <main className="main-content about-content">
        {/* 소개 섹션 */}
        <IntroSection 
          title={t('intro.section_title')}
          content={{
            paragraphs: [
              t.raw('intro.paragraphs.0'),
              t.raw('intro.paragraphs.1')
            ],
            tip: {
              title: t('intro.tip.title'),
              content: t('intro.tip.content')
            }
          }}
        />

        {/* 주요 기능 섹션 */}
        <FeaturesSection
          title={t('features.section_title')}
          cards={[
            {
              variant: "recommended",
              icon: "💬",
              title: t('features.cards.0.title'),
              description: t('features.cards.0.description'),
              badge: t('features.cards.0.badge'),
              example: {
                label: t('features.cards.0.example.label'),
                content: t('features.cards.0.example.content')
              }
            },
            {
              variant: "recommended",
              icon: "🐛",
              title: t('features.cards.1.title'),
              description: t('features.cards.1.description'),
              badge: t('features.cards.1.badge'),
              example: {
                label: t('features.cards.1.example.label'),
                content: t('features.cards.1.example.content')
              }
            },
            {
              variant: "recommended",
              icon: "📚",
              title: t('features.cards.2.title'),
              description: t('features.cards.2.description'),
              badge: t('features.cards.2.badge')
            },
            {
              variant: "advanced",
              icon: "📝",
              title: t('features.cards.3.title'),
              description: <span dangerouslySetInnerHTML={{ __html: t.raw('features.cards.3.description') }} />
            },
            {
              variant: "advanced",
              icon: "🔧",
              title: t('features.cards.4.title'),
              description: <span dangerouslySetInnerHTML={{ __html: t.raw('features.cards.4.description') }} />
            },
            {
              variant: "advanced",
              icon: "🚀",
              title: t('features.cards.5.title'),
              description: <span dangerouslySetInnerHTML={{ __html: t.raw('features.cards.5.description') }} />
            }
          ]}
        />

        {/* 타겟 사용자 섹션 */}
        <TargetUsersSection 
          title={t('target_users.section_title')}
          icon={{ name: "fas fa-lightbulb" }}
          users={[
            {
              icon: "fas fa-check",
              title: t('target_users.users.0.title'),
              description: t('target_users.users.0.description')
            },
            {
              icon: "fas fa-check",
              title: t('target_users.users.1.title'),
              description: t('target_users.users.1.description')
            },
            {
              icon: "fas fa-check",
              title: t('target_users.users.2.title'),
              description: t('target_users.users.2.description')
            },
            {
              icon: "fas fa-check",
              title: t('target_users.users.3.title'),
              description: t('target_users.users.3.description')
            },
            {
              icon: "fas fa-check",
              title: t('target_users.users.4.title'),
              description: t('target_users.users.4.description')
            }
          ]}
        />

        {/* FAQ 섹션 */}
        <AboutQuestions 
          title={t('faq.section_title')}
          items={[
            {
              question: t('faq.questions.0.question'),
              answer: [t('faq.questions.0.answer')]
            },
            {
              question: t('faq.questions.1.question'),
              answer: [
                t('faq.questions.1.answer'),
                t.raw('faq.questions.1.pricing.label') + " " + t('faq.questions.1.pricing.plans.0') + " | " + t('faq.questions.1.pricing.plans.1')
              ]
            },
            {
              question: t('faq.questions.2.question'),
              answer: [t('faq.questions.2.answer')]
            },
            {
              question: t('faq.questions.3.question'),
              answer: [
                t('faq.questions.3.answer'),
                `<ul>${t('faq.questions.3.examples').split(';').map((item: string) => `<li>${item}</li>`).join('')}</ul>`,
                t('faq.questions.3.note')
              ]
            },
            {
              question: t('faq.questions.4.question'),
              answer: [
                t('faq.questions.4.answer'),
                `<strong>${t('faq.questions.4.tip').split(':')[0]}:</strong> ${t('faq.questions.4.tip').split(':')[1]}`
              ]
            },
            {
              question: t('faq.questions.5.question'),
              answer: [t('faq.questions.5.answer')]
            },
            {
              question: t('faq.questions.6.question'),
              answer: [t('faq.questions.6.answer')]
            }
          ]}
        />

        {/* CTA 섹션 */}
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          info={(t.raw('cta.info') as Array<{ text: string }>)}
          buttonText={t('cta.button')}
          buttonIcon="fas fa-rocket"
          buttonHref="/guide"
        />

        {/* 제작자 프로필 섹션 */}
        <AuthorProfile 
          avatar={{
            src: "/images/profile.jpg",
            alt: "Jongjin Choi"
          }}
          name={t('author.name')}
          subtitle={t('author.description')}
          description={t('author.story')}
          mainLink={{
            href: "https://jongjinchoi.com/forbes-featured-startup-founder-returns-to-business-after-parenting/",
            icon: "fas fa-blog",
            label: t('author.links.visit'),
            className: "blog-featured"
          }}
          socialLinks={[
            { 
              href: `mailto:${SITE_CONFIG.email}`,
              icon: "fas fa-envelope", 
              ariaLabel: t('author.links.email')
            },
            { 
              href: "https://www.linkedin.com/in/jongjinchoi/", 
              icon: "fab fa-linkedin", 
              ariaLabel: "LinkedIn" 
            },
            { 
              href: "https://x.com/jongjin_choi_kr", 
              icon: "fab fa-twitter", 
              ariaLabel: "Twitter" 
            }
          ]}
        />
      </main>
      </div>
    </div>
  );
}