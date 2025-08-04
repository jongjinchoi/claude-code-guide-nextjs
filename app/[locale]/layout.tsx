import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import Navigation from '@/app/components/Navigation';
import MobileDetector from '@/app/components/MobileDetector';

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ 
  children, 
  params 
}: Props) {
  const { locale } = await params;
  
  // 유효한 locale인지 확인
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  // 메시지 로드
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <MobileDetector />
      {children}
    </NextIntlClientProvider>
  );
}

// 임시로 정적 파라미터 생성 함수 추가
export async function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}