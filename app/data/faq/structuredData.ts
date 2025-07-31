import { StructuredData } from '@/app/types/faq';

export const structuredData: StructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "command not found: claude 오류가 나와요",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code가 설치되지 않았거나 PATH에 추가되지 않았습니다. npm install -g @anthropic-ai/claude-code 명령으로 재설치하거나, 터미널을 재시작해보세요. 그래도 안 되면 npm config get prefix로 설치 경로를 확인한 후 PATH에 추가하세요."
      }
    },
    {
      "@type": "Question",
      "name": "permission denied 오류가 발생해요",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "npm 설치 권한 문제입니다. sudo를 사용하지 말고, npm config set prefix ~/.npm-global 명령으로 설치 경로를 변경한 후 export PATH=~/.npm-global/bin:$PATH를 실행하세요. 이후 npm install -g @anthropic-ai/claude-code로 재설치하면 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "Claude Code를 무료로 사용할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아니요, Claude Pro 구독($20/월)이 필요합니다. 2025년부터는 무료 플랜으로 Claude Code를 사용할 수 없습니다. Claude Pro를 구독하면 Claude Code 외에도 더 많은 기능을 사용할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "Windows에서도 사용할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, Windows 10/11에서 Git Bash를 통해 사용할 수 있습니다. Git for Windows를 설치한 후 Git Bash에서 설치 가이드를 따라하시면 됩니다. PowerShell이나 CMD는 지원하지 않으니 반드시 Git Bash를 사용하세요."
      }
    },
    {
      "@type": "Question",
      "name": "Node.js 버전이 낮다고 나와요",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code는 Node.js 18 이상이 필요합니다. node --version으로 현재 버전을 확인하고, 낮다면 Node.js 공식 사이트에서 최신 LTS 버전을 다운로드하여 설치하세요. Mac은 Homebrew로 brew upgrade node 명령을 사용할 수도 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "로그인이 안 돼요 (claude auth login)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "브라우저가 자동으로 열리지 않으면 터미널에 표시된 URL을 복사해서 브라우저에 직접 붙여넣으세요. Claude Pro 계정으로 로그인한 후 권한을 허용하면 됩니다. 방화벽이나 회사 네트워크가 문제일 수 있으니 개인 네트워크에서 시도해보세요."
      }
    }
  ]
};