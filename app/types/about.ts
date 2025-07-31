// About 페이지 관련 타입 정의

export interface IntroContent {
  paragraphs: string[];
  tip?: {
    title: string;
    content: string;
  };
}

export interface TargetUser {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureCard {
  variant: 'recommended' | 'advanced';
  icon: string;
  title: string;
  description: string | React.ReactNode;
  badge?: string;
  example?: {
    label: string;
    content: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string[];
}

export interface AuthorInfo {
  avatar: {
    src: string;
    alt: string;
  };
  name: string;
  subtitle: string;
  description: string;
  mainLink: {
    href: string;
    icon: string;
    label: string;
    className?: string;
  };
  socialLinks: Array<{
    href: string;
    icon: string;
    ariaLabel: string;
  }>;
}