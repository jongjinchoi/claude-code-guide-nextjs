import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

// 전역 메타데이터 베이스 URL 설정
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'),
}

// 나머지 메타데이터는 각 페이지에서 동적으로 생성됩니다

import dynamic from 'next/dynamic';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

const SimplifiedAnalyticsProvider = dynamic(
  () => import('@/app/lib/analytics/SimplifiedAnalytics').then(mod => ({ default: mod.SimplifiedAnalyticsProvider }))
);
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ToastProvider } from '@/app/components/Toast';
import './styles/components/copyright.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let locale: string;
  try {
    locale = await getLocale();
  } catch {
    locale = 'ko';
  }

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Theme Color - matches page background */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />

        {/* Preconnect for external resources */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />

        {/* Domain Redirect */}
        <Script id="domain-redirect" strategy="beforeInteractive">
          {`
            if (window.location.hostname === 'claude-code-guide-sooty.vercel.app') {
              window.location.replace('${process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'}' + window.location.pathname + window.location.search + window.location.hash);
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
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
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
              "url": "${process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'}/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "${process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'}/search?q={search_term_string}",
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
              
              {children}
              </SimplifiedAnalyticsProvider>
            </Suspense>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  )
}