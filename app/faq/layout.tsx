import type { Metadata } from 'next';
import Script from 'next/script';
import { structuredData } from '@/app/data/faq';

export const metadata: Metadata = {
  title: 'Claude Code Guide - 자주 묻는 질문 FAQ',
  description: 'Claude Code 설치 중 발생하는 오류 해결 방법과 자주 묻는 질문들. command not found, permission denied 등 흔한 문제들의 해결책을 제공합니다.',
  keywords: 'Claude Code FAQ, 설치 오류, command not found, permission denied, Claude Code 문제 해결, 터미널 오류',
  authors: [{ name: 'Jongjin Choi' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://getclaudecode.com/faq',
  },
  openGraph: {
    title: 'Claude Code FAQ - 자주 묻는 질문과 문제 해결',
    description: 'Claude Code 설치와 사용 중 발생하는 문제들을 해결하세요. 초보자를 위한 상세한 해결 방법을 제공합니다.',
    images: [
      {
        url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
        width: 1200,
        height: 630,
      }
    ],
    url: 'https://getclaudecode.com/faq',
    type: 'article',
    locale: 'ko_KR',
    siteName: 'Claude Code Guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code FAQ - 자주 묻는 질문과 문제 해결',
    description: 'Claude Code 설치와 사용 중 발생하는 문제들을 해결하세요. 초보자를 위한 상세한 해결 방법을 제공합니다.',
    images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {children}
    </>
  );
}