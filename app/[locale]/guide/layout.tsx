import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Claude Code Guide - 6단계로 완성하는 Claude Code 설치',
  description: 'Claude Code 설치 가이드. 6단계로 간단하게 Claude Code를 설치하고 AI와 함께 코딩을 시작하세요. Mac, Windows, Linux 모두 지원합니다.',
  keywords: 'Claude Code 설치, Claude Code 가이드, 바이브 코딩, Vibe Coding, AI 코딩 설치, Claude 설치 방법, Node.js 설치',
  openGraph: {
    type: 'article',
    url: 'https://getclaudecode.com/guide',
    title: 'Claude Code Guide - 6단계로 완성하는 Claude Code 설치',
    description: 'Claude Code를 6단계로 간단하게 설치하세요. 터미널이 처음이어도 걱정 없습니다.',
    images: [
      {
        url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
        width: 1200,
        height: 630,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Guide - 6단계로 완성하는 Claude Code 설치',
    description: 'Claude Code를 6단계로 간단하게 설치하세요. 터미널이 처음이어도 걱정 없습니다.',
    images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Claude Code 설치 가이드",
  "description": "AI 코딩 어시스턴트 Claude Code를 Mac 또는 Windows에 설치하는 6단계 가이드",
  "image": "https://getclaudecode.com/images/claude-code-guide-og.png",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "20"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Claude Pro 구독 ($20/월)"
    },
    {
      "@type": "HowToSupply", 
      "name": "Node.js 18 이상"
    },
    {
      "@type": "HowToSupply",
      "name": "인터넷 연결"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "터미널 (Mac) 또는 Git Bash (Windows)"
    },
    {
      "@type": "HowToTool",
      "name": "패키지 매니저 (Homebrew 또는 Git)"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Claude Pro 구독",
      "text": "Claude Pro 계정을 구독합니다. 월 $20의 비용이 발생합니다.",
      "url": "https://getclaudecode.com/guide#start",
      "image": "https://getclaudecode.com/images/claude-code-guide-og.png"
    },
    {
      "@type": "HowToStep",
      "name": "패키지 매니저 설치",
      "text": "Mac은 Homebrew를 설치하고, Windows는 Git for Windows를 설치합니다.",
      "url": "https://getclaudecode.com/guide#homebrew"
    },
    {
      "@type": "HowToStep",
      "name": "Node.js 설치",
      "text": "Node.js 18 이상 버전을 설치합니다. Mac은 brew install node, Windows는 공식 사이트에서 다운로드합니다.",
      "url": "https://getclaudecode.com/guide#node"
    },
    {
      "@type": "HowToStep",
      "name": "Claude Code 설치",
      "text": "npm install -g @anthropic-ai/claude-code 명령으로 Claude Code를 설치합니다.",
      "url": "https://getclaudecode.com/guide#claude"
    },
    {
      "@type": "HowToStep",
      "name": "로그인",
      "text": "claude auth login 명령으로 Claude Pro 계정에 로그인합니다.",
      "url": "https://getclaudecode.com/guide#auth"
    },
    {
      "@type": "HowToStep",
      "name": "프로젝트 시작",
      "text": "프로젝트 폴더에서 claude 명령을 실행하여 AI 코딩 어시스턴트를 시작합니다.",
      "url": "https://getclaudecode.com/guide#project"
    }
  ]
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {children}
    </>
  );
}