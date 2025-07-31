'use client'

import React from 'react';
import '../styles/pages/about.css';
import '../styles/components/tooltips.css';
import HeaderControls from '../components/HeaderControls';
import PageHeader from '../components/PageHeader';
import AboutQuestions from '../components/AboutQuestions';
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import AuthorProfile from '../components/AuthorProfile';
import IntroSection from '../components/IntroSection';
import TargetUsersSection from '../components/TargetUsersSection';

// 모든 데이터를 중앙화된 파일에서 가져오기
import { 
  introContent, 
  targetUsers, 
  featureCards, 
  faqItems, 
  authorInfo 
} from '@/app/data/about';

export default function AboutPage() {

  return (
    <div className="page-wrapper page-wrapper--about about-page">
      <div className="container">
        {/* 헤더 */}
        <PageHeader
          variant="hero"
          title="Claude Code"
          subtitle="카톡하듯 대화하면서 코딩하는 AI 도구"
          badge="AI 코딩 어시스턴트"
        >
          <HeaderControls showOSToggle={false} />
        </PageHeader>

        {/* 메인 콘텐츠 */}
        <main className="main-content about-content">
        {/* 소개 섹션 */}
        <IntroSection content={introContent} />

        {/* 주요 기능 섹션 */}
        <FeaturesSection
          title="주요 기능"
          cards={featureCards}
        />

        {/* 타겟 사용자 섹션 */}
        <TargetUsersSection 
          icon={{ name: "fas fa-lightbulb" }}
          users={targetUsers}
        />

        {/* FAQ 섹션 */}
        <AboutQuestions 
          items={faqItems}
        />

        {/* CTA 섹션 */}
        <CTASection
          title="30분이면 충분해요"
          subtitle="지금 시작하면 30분 후엔 AI와 대화하며 코딩하고 있을 거예요"
          info={[
            { text: "Mac 20-30분 • Windows 30-40분" },
            { text: "난이도: 쉬움" }
          ]}
          buttonText="지금 시작하기"
          buttonIcon="fas fa-rocket"
          buttonHref="/guide"
        />

        {/* 제작자 프로필 섹션 */}
        <AuthorProfile {...authorInfo} />
      </main>
      </div>
    </div>
  );
}