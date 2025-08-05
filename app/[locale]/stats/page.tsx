import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StatsClient from './StatsClient';
import './stats-global.css';

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.pages.stats' });

  // 6월 26일부터 오늘까지의 일수 계산
  const startDate = new Date('2025-06-26');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 동적 설명 생성
  const dynamicDescription = locale === 'ko' 
    ? `${diffDays}일간의 발전 과정과 실시간 사용자 현황을 투명하게 공개합니다. HTML에서 Next.js까지의 진화 스토리.`
    : `${diffDays} days of progress and real-time user activity transparently shared. The evolution story from HTML to Next.js.`;

  return {
    title: t('title'),
    description: dynamicDescription,
    keywords: t('keywords').split(', '),
    openGraph: {
      title: t('title'),
      description: dynamicDescription,
      url: `https://getclaudecode.com/${locale}/stats`,
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      images: [
        {
          url: 'https://getclaudecode.com/images/claude-code-guide-og.png',
          width: 1200,
          height: 630,
        }
      ],
      siteName: 'Claude Code Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: dynamicDescription,
      images: ['https://getclaudecode.com/images/claude-code-guide-og.png'],
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