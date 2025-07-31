import { FAQSection } from '@/app/types/faq';

export const faqSections: FAQSection[] = [
  {
    topic: 'urgent',
    title: '지금 막혔어요!',
    icon: 'fas fa-exclamation-triangle',
    tagIcon: 'fas fa-bolt',
    tagText: '즉시 해결',
    tagClass: 'urgent'
  },
  {
    topic: 'normal',
    title: '이게 정상인가요?',
    icon: 'fas fa-question-circle',
    tagIcon: 'fas fa-heart',
    tagText: '불안감 해소',
    tagClass: 'comfort'
  },
  {
    topic: 'basics',
    title: '시작 전 알아두기',
    icon: 'fas fa-book',
    tagIcon: 'fas fa-graduation-cap',
    tagText: '기초 지식',
    tagClass: 'knowledge'
  }
];