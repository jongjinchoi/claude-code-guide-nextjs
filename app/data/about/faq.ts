import { FAQItem } from '@/app/types/about';

export const faqItems: FAQItem[] = [
  {
    question: "코딩을 전혀 몰라도 사용할 수 있나요?",
    answer: [
      "네! Claude Code는 코딩을 모르는 분들도 사용할 수 있도록 설계되었습니다. \"웹사이트 만들어줘\", \"엑셀 파일 읽는 프로그램 만들어줘\" 같은 일상적인 언어로 요청하면 AI가 필요한 코드를 만들고 사용법까지 설명해드립니다."
    ]
  },
  {
    question: "Claude Code는 무료인가요?",
    answer: [
      "Claude Code를 사용하려면 Claude Pro 플랜($20/월) 이상의 구독이 필요합니다. 무료 플랜으로는 Claude Code를 사용할 수 없습니다.",
      "<strong>구독 플랜:</strong> Pro 플랜($20/월) - 작은 프로젝트에 적합 | Max 플랜($100/월 이상) - 대규모 프로젝트에 적합"
    ]
  },
  {
    question: "설치하는데 얼마나 걸리나요?",
    answer: [
      "처음 설치하시는 분들은 보통 20-30분 정도 걸립니다. 이 가이드를 천천히 따라하시면 누구나 설치할 수 있어요. 막히는 부분이 있어도 각 단계마다 해결 방법을 제공하니 걱정하지 마세요!"
    ]
  },
  {
    question: "어떤 것들을 만들 수 있나요?",
    answer: [
      "<strong>초보자도 만들 수 있는 것들:</strong>",
      `<ul>
        <li>📱 개인 웹사이트나 포트폴리오</li>
        <li>📊 엑셀 자동화 프로그램</li>
        <li>🤖 간단한 챗봇이나 디스코드 봇</li>
        <li>📝 업무 자동화 스크립트</li>
        <li>🎮 간단한 웹 게임</li>
      </ul>`,
      "AI가 코드를 만들어주고 사용법까지 설명해드려요!"
    ]
  },
  {
    question: "어떤 프로그래밍 언어를 지원하나요?",
    answer: [
      "Python, JavaScript, TypeScript, Java, C++, Go, Rust 등 대부분의 주요 프로그래밍 언어를 지원합니다. 또한 HTML, CSS, SQL 등 마크업 언어와 쿼리 언어도 다룰 수 있습니다.",
      "<strong>초보자 추천:</strong> 웹사이트 만들기는 HTML/CSS/JavaScript, 자동화는 Python이 쉬워요!"
    ]
  },
  {
    question: "인터넷 연결이 필요한가요?",
    answer: [
      "네, Claude Code는 Claude API와 통신하기 때문에 인터넷 연결이 필요합니다. 오프라인에서는 사용할 수 없습니다."
    ]
  },
  {
    question: "내 코드는 안전한가요?",
    answer: [
      "Anthropic은 사용자의 프라이버시와 보안을 중요하게 생각합니다. API를 통해 전송된 코드는 모델 학습에 사용되지 않으며, 엄격한 보안 정책에 따라 관리됩니다."
    ]
  }
];