// Can be imported from a shared config
export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];