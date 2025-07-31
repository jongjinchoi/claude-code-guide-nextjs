// Guide 페이지 관련 상수

export const GUIDE_CONSTANTS = {
  // 세션 관련
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30분
  
  // 애니메이션 시간
  ANIMATION_DURATION: {
    STEP_EXPAND: 300,
    PROGRESS_UPDATE: 500,
    MODAL_SHOW: 200
  },
  
  // 로컬스토리지 키
  STORAGE_KEYS: {
    GUIDE_STORAGE: 'guide-storage',
    GUIDE_SESSION_ID: 'guide-session-id',
    GUIDE_START_TIME: 'guide-start-time',
    GUIDE_ACCUMULATED_TIME: 'guide-accumulated-time'
  },
  
  // 세션스토리지 키
  SESSION_KEYS: {
    GUIDE_STARTED: 'guide_started'
  },
  
  // 이벤트 이름
  EVENTS: {
    GUIDE_STEP_RESULT: 'guide-step-result',
    GUIDE_OS_CHANGED: 'guide-os-changed',
    GUIDE_COMPLETED: 'guide-completed'
  },
  
  // 가이드 메타데이터
  GUIDE_META: {
    id: 'claude-code-guide',
    name: 'Claude Code Installation Guide',
    version: '1.0.0'
  }
} as const;

// 단계별 맵핑 (레거시 지원용)
export const STEP_NUMBER_MAP: Record<string, number> = {
  'start': 1,
  'start-windows': 1,
  'homebrew': 2,
  'git-windows': 2,
  'node': 3,
  'node-windows': 3,
  'claude': 4,
  'claude-windows': 4,
  'auth': 5,
  'auth-windows': 5,
  'project': 6,
  'project-windows': 6
};

// OS별 기본 설정
export const OS_DEFAULTS = {
  mac: {
    terminal: 'Terminal',
    shell: 'zsh',
    packageManager: 'Homebrew'
  },
  windows: {
    terminal: 'Command Prompt',
    shell: 'cmd',
    packageManager: 'npm'
  }
} as const;