import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Claude Code Guide - 바이브 코딩을 위한 툴, Claude Code란?',
  description: 'Claude Code는 AI 코딩 어시스턴트로, 터미널에서 실시간으로 코딩을 도와줍니다. 초보자도 쉽게 시작할 수 있는 Claude Code의 기능과 특징을 알아보세요.',
  keywords: 'Claude Code, AI 코딩, 코딩 어시스턴트, 프로그래밍 도구, 초보자 코딩, 터미널 도구, Anthropic',
  authors: [{ name: 'Jongjin Choi' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Claude Code란? - AI 코딩 어시스턴트 소개',
    description: '터미널이 무서워도 OK! Claude Code와 함께라면 누구나 쉽게 코딩을 시작할 수 있습니다. 초보자를 위한 AI 코딩 도구를 만나보세요.',
    url: 'https://getclaudecode.com/about',
    siteName: 'Claude Code Guide',
    images: [
      {
        url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'ko_KR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code란? - AI 코딩 어시스턴트 소개',
    description: '터미널이 무서워도 OK! Claude Code와 함께라면 누구나 쉽게 코딩을 시작할 수 있습니다.',
    images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
  },
  alternates: {
    canonical: 'https://getclaudecode.com/about'
  },
  other: {
    'google-site-verification': 'sUU-tXbNB9yDZ-xWFJAHyQIeByDlCNyieez4FG91sTE'
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "최종진",
            "alternateName": "Jongjin Choi",
            "additionalName": "Jin",
            "url": "https://jongjinchoi.com",
            "image": "https://getclaudecode.com/src/images/profile.jpg",
            "email": "mailto:me@jongjinchoi.com",
            "sameAs": [
              "https://www.linkedin.com/in/jongjinchoi/",
              "https://x.com/jongjin_choi_kr",
              "https://jongjinchoi.com/forbes-featured-startup-founder-returns-to-business-after-parenting/"
            ],
            "jobTitle": "개발자",
            "knowsAbout": ["Claude Code", "AI 코딩 교육", "웹 개발", "초보자 코딩 교육"],
            "description": "Claude Code Guide 제작자. AI와 함께하는 코딩 교육에 관심이 많은 개발자입니다."
          })
        }}
      />
      {children}
    </>
  );
}