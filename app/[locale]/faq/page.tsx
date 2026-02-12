import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FAQPageClient from './FAQPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('pages.faq.title'),
    description: t('pages.faq.description'),
    keywords: t('site.keywords'),
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        'ko': '/ko/faq',
        'en': '/en/faq',
        'x-default': '/en/faq',
      }
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/faq`,
      title: t('pages.faq.og_title'),
      description: t('pages.faq.og_description'),
      images: [
        {
          url: '/images/claude-code-guide-og.png',
          width: 1200,
          height: 630,
        }
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      siteName: 'Claude Code Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pages.faq.og_title'),
      description: t('pages.faq.description'),
      images: ['/images/claude-code-guide-og.png'],
    },
  };
}

export default function FAQPage() {
  return <FAQPageClient />;
}