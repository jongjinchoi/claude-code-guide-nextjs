import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomePage from './HomePage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('pages.home.title'),
    description: t('pages.home.description'),
    keywords: t('site.keywords'),
    authors: [{ name: 'Jin' }],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: 'https://getclaudecode.com/',
      title: t('pages.home.og_title'),
      description: t('pages.home.og_description'),
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
      title: t('pages.home.og_title'),
      description: t('pages.home.description'),
      images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
    },
    metadataBase: new URL('https://getclaudecode.com'),
    verification: {
      google: 'sUU-tXbNB9yDZ-xWFJAHyQIeByDlCNyieez4FG91sTE',
    },
  };
}

export default function Page() {
  return <HomePage />;
}