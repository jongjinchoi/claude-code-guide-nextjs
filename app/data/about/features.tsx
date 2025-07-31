import { FeatureCard } from '@/app/types/about';

export const featureCards: FeatureCard[] = [
  {
    variant: "recommended",
    icon: "💬",
    title: "대화형 코딩",
    description: "자연어로 코드를 설명하면 Claude가 이해하고 구현해줍니다. \"이 함수를 더 효율적으로 만들어줘\" 같은 요청도 가능합니다.",
    badge: "초보자 추천",
    example: {
      label: "예시",
      content: "\"사용자 로그인 페이지 만들어줘\" → AI가 HTML, CSS, JavaScript 코드를 생성"
    }
  },
  {
    variant: "recommended",
    icon: "🐛",
    title: "스마트 디버깅",
    description: "에러 메시지만 보여주면 원인을 분석하고 해결 방법을 제시합니다. 복잡한 버그도 체계적으로 추적할 수 있습니다.",
    badge: "초보자 추천",
    example: {
      label: "쉽게 말하면",
      content: "\"코드가 안 돌아가요\" 하고 에러 화면을 보여주면, 왜 안 되는지 설명하고 고쳐줍니다."
    }
  },
  {
    variant: "recommended",
    icon: "📚",
    title: "문서화 자동화",
    description: "코드에 대한 설명, 주석, README 파일을 자동으로 생성합니다. 팀원들이 이해하기 쉬운 문서를 만들어줍니다.",
    badge: "초보자 추천"
  },
  {
    variant: "advanced",
    icon: "📝",
    title: "코드 리뷰 & 개선",
    description: (
      <>작성한 코드의 품질을 분석하고 개선점을 제안합니다. <span className="tooltip">best practices<span className="tooltip-text">업계에서 검증된 가장 좋은 코딩 방법들</span></span>와 최신 패턴을 적용할 수 있습니다.</>
    )
  },
  {
    variant: "advanced",
    icon: "🔧",
    title: "리팩토링 도우미",
    description: (
      <><span className="tooltip">레거시 코드<span className="tooltip-text">오래되어서 낡은 방식으로 작성된 코드</span></span>를 현대적인 패턴으로 개선하거나, 복잡한 코드를 더 읽기 쉽게 재구성합니다.</>
    )
  },
  {
    variant: "advanced",
    icon: "🚀",
    title: "테스트 코드 생성",
    description: (
      <>함수나 클래스에 대한 <span className="tooltip">단위 테스트<span className="tooltip-text">코드의 작은 부분이 제대로 작동하는지 확인하는 자동 검사</span></span>를 자동으로 생성합니다. <span className="tooltip">엣지 케이스<span className="tooltip-text">예상치 못한 특수한 상황들</span></span>까지 고려한 완벽한 테스트를 작성합니다.</>
    )
  }
];