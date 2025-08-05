import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StatsClient from './StatsClient';
import './stats-global.css';

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.pages.stats' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://getclaudecode.com/${locale}/stats`,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function StatsPage({ params }: PageProps) {
  const { locale } = await params;
  return <StatsClient locale={locale} />;
}