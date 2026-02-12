const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com';

export const SITE_CONFIG = {
  url: BASE_URL,
  email: 'me@jongjinchoi.com',
  ogImage: '/images/claude-code-guide-og.png',
  dates: {
    projectStart: '2025-06-26',
    launch: '2025-07-17',
    migration: '2025-08-01',
    i18nLaunch: '2025-08-05',
  },
} as const;
