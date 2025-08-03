// 각 단계별 콘텐츠 데이터
export interface StepContentData {
  title: string;
  description: string;
  preCodeText?: string;
  codeBlocks?: Array<{
    code: string;
    type: string;
    action: string;
  }>;
  postCodeText?: string;
  verifyText: string;
  verifyCommand: string;
  terminalExample: string;
  successButton: {
    title: string;
    description: string;
  };
  errorButton: {
    title: string;
    description: string;
  };
  troubleshooting: React.ReactNode;
}

export const stepContentMap: Record<string, StepContentData> = {
  // Mac 단계들
  'homebrew': {
    title: 'Homebrew 설치',
    description: 'Homebrew는 Mac에서 프로그램을 설치하는 가장 쉬운 방법입니다.',
    preCodeText: '이 명령어를 터미널에 붙여넣고 Enter를 누르세요:',
    codeBlocks: [{
      code: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      type: 'installation',
      action: 'install_homebrew'
    }],
    postCodeText: '💡 비밀번호를 물으면 Mac 로그인 비밀번호를 입력하세요. 화면에 표시되지 않아도 정상입니다.',
    verifyText: '설치가 완료되면 터미널에서 이 명령어를 실행해보세요:',
    verifyCommand: 'brew --version',
    terminalExample: 'homebrew-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: Homebrew 4.5.13'
    },
    errorButton: {
      title: '"command not found" 오류',
      description: 'zsh: command not found: brew'
    },
    troubleshooting: null
  },
  
  'git-windows': {
    title: 'Git for Windows 설치',
    description: 'Git for Windows는 Windows에서 Git과 Unix 명령어를 사용할 수 있게 해줍니다.',
    preCodeText: '아래 링크에서 Git for Windows를 다운로드하고 설치하세요:',
    codeBlocks: [{
      code: 'https://gitforwindows.org/',
      type: 'link',
      action: 'download_git_windows'
    }],
    postCodeText: '💡 설치 중 모든 옵션은 기본값으로 두고 "Next"를 클릭하세요.',
    verifyText: '설치가 완료되면 새 명령 프롬프트를 열고 이 명령어를 실행하세요:',
    verifyCommand: 'git --version',
    terminalExample: 'git-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: git version 2.50.1.windows.1'
    },
    errorButton: {
      title: '"git"은(는) 인식되지 않습니다',
      description: '명령어를 찾을 수 없음'
    },
    troubleshooting: null
  },
  
  'node': {
    title: 'Node.js 설치',
    description: 'Node.js는 Claude Code가 작동하는 데 필요한 프로그램입니다.',
    preCodeText: '터미널에서 이 명령어를 실행하세요:',
    codeBlocks: [{
      code: 'brew install node',
      type: 'installation',
      action: 'install_node'
    }],
    postCodeText: '💡 설치 중에 "Downloading..." 메시지가 나타날 수 있습니다. 잠시 기다려주세요.',
    verifyText: '설치가 완료되면 이 명령어로 확인해보세요:',
    verifyCommand: 'node --version',
    terminalExample: 'node-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: v24.5.0'
    },
    errorButton: {
      title: '"command not found" 오류',
      description: 'zsh: command not found: node'
    },
    troubleshooting: null
  },
  
  'node-windows': {
    title: 'Node.js 설치',
    description: 'Node.js는 Claude Code가 작동하는 데 필요한 프로그램입니다.',
    preCodeText: '아래 링크에서 Node.js LTS 버전을 다운로드하고 설치하세요:',
    codeBlocks: [{
      code: 'https://nodejs.org/',
      type: 'link',
      action: 'download_node'
    }],
    postCodeText: '💡 "LTS" 버전을 선택하세요. 설치 중 모든 옵션은 기본값으로 두세요.',
    verifyText: '설치가 완료되면 새 명령 프롬프트를 열고 이 명령어를 실행하세요:',
    verifyCommand: 'node --version',
    terminalExample: 'node-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: v24.5.0'
    },
    errorButton: {
      title: '"node"은(는) 인식되지 않습니다',
      description: '명령어를 찾을 수 없음'
    },
    troubleshooting: null
  },
  
  'claude': {
    title: 'Claude Code 설치',
    description: 'Claude Code CLI를 설치합니다.',
    preCodeText: '터미널에서 이 명령어를 실행하세요:',
    codeBlocks: [{
      code: 'npm install -g @anthropic-ai/claude-code',
      type: 'installation',
      action: 'install_claude_cli'
    }],
    postCodeText: '💡 설치 중에 경고 메시지가 나타날 수 있지만 무시해도 됩니다.',
    verifyText: '설치가 완료되면 이 명령어로 확인해보세요:',
    verifyCommand: 'claude --version',
    terminalExample: 'claude-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: @anthropic-ai/claude-code/1.0.67'
    },
    errorButton: {
      title: '"command not found" 오류',
      description: 'zsh: command not found: claude'
    },
    troubleshooting: null
  },
  
  'claude-windows': {
    title: 'Claude Code 설치',
    description: 'Claude Code CLI를 설치합니다.',
    preCodeText: '명령 프롬프트에서 이 명령어를 실행하세요:',
    codeBlocks: [{
      code: 'npm install -g @anthropic-ai/claude-code',
      type: 'installation',
      action: 'install_claude_cli'
    }],
    postCodeText: '💡 설치 중에 경고 메시지가 나타날 수 있지만 무시해도 됩니다.',
    verifyText: '설치가 완료되면 이 명령어로 확인해보세요:',
    verifyCommand: 'claude --version',
    terminalExample: 'claude-version',
    successButton: {
      title: '버전 번호가 나타남',
      description: '예시: @anthropic-ai/claude-code/1.0.67'
    },
    errorButton: {
      title: '"claude"은(는) 인식되지 않습니다',
      description: '명령어를 찾을 수 없음'
    },
    troubleshooting: null
  },
  
  'auth': {
    title: '계정 연결',
    description: 'Claude Pro 계정을 연결합니다.',
    preCodeText: '터미널에서 이 명령어를 실행하세요:',
    codeBlocks: [{
      code: 'claude auth login',
      type: 'authentication',
      action: 'claude_auth_login'
    }],
    postCodeText: '💡 브라우저가 자동으로 열리고 Claude 로그인 페이지가 나타납니다.',
    verifyText: '로그인이 완료되면 이 명령어로 확인해보세요:',
    verifyCommand: 'claude auth status',
    terminalExample: 'auth-status',
    successButton: {
      title: '이메일 주소가 나타남',
      description: '예시: your.email@example.com'
    },
    errorButton: {
      title: '"Not authenticated" 메시지',
      description: '인증되지 않음'
    },
    troubleshooting: null
  },
  
  'auth-windows': {
    title: '계정 연결',
    description: 'Claude Pro 계정을 연결합니다.',
    preCodeText: '명령 프롬프트에서 이 명령어를 실행하세요:',
    codeBlocks: [{
      code: 'claude auth login',
      type: 'authentication',
      action: 'claude_auth_login'
    }],
    postCodeText: '💡 브라우저가 자동으로 열리고 Claude 로그인 페이지가 나타납니다.',
    verifyText: '로그인이 완료되면 이 명령어로 확인해보세요:',
    verifyCommand: 'claude auth status',
    terminalExample: 'auth-status',
    successButton: {
      title: '이메일 주소가 나타남',
      description: '예시: your.email@example.com'
    },
    errorButton: {
      title: '"Not authenticated" 메시지',
      description: '인증되지 않음'
    },
    troubleshooting: null
  },
  
  'project': {
    title: '첫 프로젝트 시작',
    description: '첫 번째 프로젝트를 만들어봅시다.',
    preCodeText: 'Claude Code를 사용할 프로젝트 폴더를 만들어보세요:',
    codeBlocks: [
      {
        code: 'mkdir my-first-project',
        type: 'project_creation',
        action: 'create_directory'
      },
      {
        code: 'cd my-first-project',
        type: 'navigation',
        action: 'change_directory'
      }
    ],
    postCodeText: '',
    verifyText: '',
    verifyCommand: 'claude',
    terminalExample: 'project-created',
    successButton: {
      title: 'Claude Code가 시작됨',
      description: '대화를 시작할 수 있습니다!'
    },
    errorButton: {
      title: '시작되지 않음 또는 오류',
      description: '아래 해결 방법을 확인하세요'
    },
    troubleshooting: null
  },
  
  'project-windows': {
    title: '첫 프로젝트 시작',
    description: '첫 번째 프로젝트를 만들어봅시다.',
    preCodeText: 'Claude Code를 사용할 프로젝트 폴더를 만들어보세요:',
    codeBlocks: [
      {
        code: 'mkdir my-first-project',
        type: 'project_creation',
        action: 'create_directory'
      },
      {
        code: 'cd my-first-project',
        type: 'navigation',
        action: 'change_directory'
      }
    ],
    postCodeText: '',
    verifyText: '',
    verifyCommand: 'claude',
    terminalExample: 'project-created',
    successButton: {
      title: 'Claude Code가 시작됨',
      description: '대화를 시작할 수 있습니다!'
    },
    errorButton: {
      title: '시작되지 않음 또는 오류',
      description: '아래 해결 방법을 확인하세요'
    },
    troubleshooting: null
  }
};