import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale이 지원하는 언어인지 확인
  let locale = await requestLocale;
  
  // 지원하지 않는 언어인 경우 기본 언어로 설정
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../translations/${locale}/index.ts`)).default
  };
});