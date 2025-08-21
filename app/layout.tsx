import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

// 메타데이터는 각 페이지에서 동적으로 생성됩니다

import { SimplifiedAnalyticsProvider } from '@/app/lib/analytics/SimplifiedAnalytics';
import { Suspense } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ToastProvider } from '@/app/components/Toast';
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
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sy2ncy6rl1");
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
              
              {children}
              </SimplifiedAnalyticsProvider>
            </Suspense>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  )
}