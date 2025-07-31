// FAQ 페이지 관련 타입 정의

export type FAQTopic = 'urgent' | 'normal' | 'basics';

export interface FAQSection {
  topic: FAQTopic;
  title: string;
  icon: string;
  tagIcon: string;
  tagText: string;
  tagClass: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}