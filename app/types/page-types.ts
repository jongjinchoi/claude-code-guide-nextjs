// 페이지 레이아웃 관련 타입 정의

export interface PageHeaderProps {
  showBackButton?: boolean;
  showProgressBar?: boolean;
  progress?: number;
  maxSteps?: number;
}

export interface HeaderControlsProps {
  showOSToggle?: boolean;
  showFontControl?: boolean;
  showThemeToggle?: boolean;
  currentOS?: 'mac' | 'windows';
  onOSChange?: (os: 'mac' | 'windows') => void;
}

// CTA 섹션 타입
export interface CTAInfo {
  primaryText: string;
  buttonText: string;
  href: string;
}

export interface CTASectionProps {
  ctaInfo: CTAInfo;
}

// Intro 섹션 타입
export interface IntroSectionProps {
  intro: {
    title: React.ReactNode;
    subtitle: string;
    description: string;
  };
}

// Target Users 섹션 타입은 about.ts에서 import하여 사용