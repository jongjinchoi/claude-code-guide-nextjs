import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('pages.about.title'),
    description: t('pages.about.description'),
    keywords: t('site.keywords'),
    openGraph: {
      type: 'website',
      url: `https://getclaudecode.com/${locale}/about`,
      title: t('pages.about.og_title'),
      description: t('pages.about.og_description'),
      images: [
        {
          url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
          width: 1200,
          height: 630,
        }
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      siteName: 'Claude Code Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pages.about.og_title'),
      description: t('pages.about.description'),
      images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}