import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Claude Code Guide - 초보자를 위한 바이브 코딩의 시작',
  description: '초보자도 쉽게 따라하는 Claude Code 설치 가이드. 터미널이 처음이어도 걱정 없습니다. 6단계만 따라하면 AI와 함께 코딩을 시작할 수 있어요.',
  keywords: 'Claude Code, AI 코딩, 바이브 코딩, Vibe Coding, 터미널, 코딩 입문, 프로그래밍, AI 개발 도구, Claude, Anthropic',
  authors: [{ name: 'Jin' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://getclaudecode.com/',
    title: 'Claude Code Guide - 초보자를 위한 바이브 코딩의 시작',
    description: '초보자도 쉽게 따라하는 Claude Code 설치 가이드. 터미널이 처음이어도 걱정 없습니다. 6단계만 따라하면 AI와 함께 코딩을 시작할 수 있어요.',
    images: [
      {
        url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'ko_KR',
    siteName: 'Claude Code Guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Guide - 초보자를 위한 바이브 코딩의 시작',
    description: '초보자도 쉽게 따라하는 Claude Code 설치 가이드. 터미널이 처음이어도 걱정 없습니다.',
    images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
  },
  metadataBase: new URL('https://getclaudecode.com'),
  verification: {
    google: 'sUU-tXbNB9yDZ-xWFJAHyQIeByDlCNyieez4FG91sTE',
  },
}

import { SimplifiedAnalyticsProvider } from '@/app/lib/analytics/SimplifiedAnalytics';
import { Suspense } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ToastProvider } from '@/app/components/Toast';
import Navigation from '@/app/components/Navigation';
import MobileDetector from '@/app/components/MobileDetector';
import './styles/components/copyright.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Domain Redirect */}
        <Script id="domain-redirect" strategy="beforeInteractive">
          {`
            if (window.location.hostname === 'claude-code-guide-sooty.vercel.app') {
              window.location.replace('https://getclaudecode.com' + window.location.pathname + window.location.search + window.location.hash);
            }
          `}
        </Script>
        
        {/* Supabase */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
          strategy="beforeInteractive"
        />
        
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2XGK1CF366"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2XGK1CF366');
          `}
        </Script>
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Schema.org structured data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Claude Code Guide",
              "description": "초보자도 쉽게 따라하는 Claude Code 설치 가이드",
              "url": "https://getclaudecode.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://getclaudecode.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <ThemeProvider>
            <Suspense fallback={null}>
              <SimplifiedAnalyticsProvider>
                {/* Copyright 사이드바 */}
                <div className="copyright-sidebar">© 2025 Claude Code Guide By JONGJIN CHOI</div>
                
                {/* 네비게이션 */}
                <Navigation />
                
                {/* 모바일 감지 */}
                <MobileDetector />
              
              {children}
              </SimplifiedAnalyticsProvider>
            </Suspense>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  )
}