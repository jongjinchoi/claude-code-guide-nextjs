'use client'

import React, { useEffect, useState } from 'react';
import './styles/pages/landing.css';

// 기존 컴포넌트들 재사용
import UserCounter from './components/UserCounter';
import { Button } from './components/Button';

export default function HomePage() {
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
        <div className="floating-emoji emoji-1">🤖</div>
        <div className="floating-emoji emoji-2">💻</div>
        <div className="floating-emoji emoji-3">✨</div>
        <div className="floating-emoji emoji-4">🚀</div>
        
        <div className="hero-badge">
          <i className="fas fa-sparkles"></i> AI와 함께하는 새로운 시작
        </div>
        
        <h1 className="hero-title">
          코딩 몰라도 OK,<br/>
          터미널 무서워도 OK
        </h1>
        
        <p className="hero-subtitle">
          <i className="fas fa-robot" style={{ color: 'var(--primary-color)', marginRight: '8px' }}></i>
          <span style={{ color: 'var(--primary-color)', fontWeight: 500 }}>Claude Code</span>와 함께라면 누구나 원하는 것을 직접 만들 수 있습니다.
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
              icon={<i className="fas fa-rocket"></i>}
            >
              지금 시작하기
            </Button>
            <small className="cta-subtitle">Claude Pro 계정 필요 ($20/월)</small>
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
            Claude Code가 뭔가요?
          </Button>
        </div>
        
        <div className="features-preview">
          <div className="feature-item">
            <div className="feature-icon">😌</div>
            <div className="feature-title">혼자서도 할 수 있어요</div>
            <div className="feature-desc">AI가 실시간으로 도와드립니다</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📋</div>
            <div className="feature-title">복사-붙여넣기만 하면 끝</div>
            <div className="feature-desc">어려운 명령어 외울 필요 없어요</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <div className="feature-title">에러 메시지도 쉽게 설명</div>
            <div className="feature-desc">막히면 바로 해결법을 제시합니다</div>
          </div>
        </div>
      </section>
    </>
  );
}