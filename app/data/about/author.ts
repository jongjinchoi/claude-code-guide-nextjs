import { AuthorInfo } from '@/app/types/about';

export const authorInfo: AuthorInfo = {
  avatar: {
    src: "/images/profile.jpg",
    alt: "Jongjin Choi"
  },
  name: "최종진(Jongjin Choi) aka Jin",
  subtitle: 'Forbes에 등장한 코워킹 스페이스 "Hive Arena" 창업자',
  description: "5년의 육아 후 새로운 기회를 모색하던 과정에서 Claude Code의 매력에 빠져 누구나 쉽게 시작할 수 있는 가이드를 만들게 되었습니다. Made with ❤️",
  mainLink: {
    href: "https://jongjinchoi.com/forbes-featured-startup-founder-returns-to-business-after-parenting/",
    icon: "fas fa-blog",
    label: "방문하기 & 커피챗",
    className: "blog-featured"
  },
  socialLinks: [
    { 
      href: "mailto:me@jongjinchoi.com", 
      icon: "fas fa-envelope", 
      ariaLabel: "이메일" 
    },
    { 
      href: "https://www.linkedin.com/in/jongjinchoi/", 
      icon: "fab fa-linkedin", 
      ariaLabel: "LinkedIn" 
    },
    { 
      href: "https://x.com/jongjin_choi_kr", 
      icon: "fab fa-twitter", 
      ariaLabel: "Twitter" 
    }
  ]
};