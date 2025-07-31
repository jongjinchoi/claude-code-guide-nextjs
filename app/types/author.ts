// 작가/프로필 관련 타입 정의

export interface SocialLink {
  href: string;
  icon: string;
  label?: string;
  ariaLabel?: string;
}

export interface AuthorProfileProps {
  avatar: {
    src: string;
    alt: string;
  };
  name: string;
  subtitle: string;
  description: string | React.ReactNode;
  mainLink?: {
    href: string;
    icon: string;
    label: string;
    className?: string;
  };
  socialLinks?: SocialLink[];
  className?: string;
}