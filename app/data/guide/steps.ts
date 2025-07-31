import { StepData, createStepId } from '@/app/types/guide';

// Mac 가이드 스텝
export const macSteps: StepData[] = [
  {
    id: createStepId('start'),
    number: 1,
    title: '시작하기 전에',
    startTag: '여기에서 시작하세요',
    timeEstimate: '1분',
    content: 'start'
  },
  {
    id: createStepId('homebrew'),
    number: 2,
    title: 'Homebrew 설치',
    timeEstimate: '5-10분',
    content: 'homebrew'
  },
  {
    id: createStepId('node'),
    number: 3,
    title: 'Node.js 설치',
    timeEstimate: '3분',
    content: 'node'
  },
  {
    id: createStepId('claude'),
    number: 4,
    title: 'Claude Code 설치',
    timeEstimate: '2분',
    content: 'claude'
  },
  {
    id: createStepId('auth'),
    number: 5,
    title: '계정 연결',
    timeEstimate: '3분',
    content: 'auth'
  },
  {
    id: createStepId('project'),
    number: 6,
    title: '첫 프로젝트 시작',
    timeEstimate: '2분',
    content: 'project'
  }
];

// Windows 가이드 스텝
export const windowsSteps: StepData[] = [
  {
    id: createStepId('start-windows'),
    number: 1,
    title: '시작하기 전에',
    startTag: '여기에서 시작하세요',
    timeEstimate: '2분',
    content: 'start-windows'
  },
  {
    id: createStepId('git-windows'),
    number: 2,
    title: 'Git for Windows 설치',
    timeEstimate: '5분',
    content: 'git-windows'
  },
  {
    id: createStepId('node-windows'),
    number: 3,
    title: 'Node.js 설치',
    timeEstimate: '5분',
    content: 'node-windows'
  },
  {
    id: createStepId('claude-windows'),
    number: 4,
    title: 'Claude Code 설치',
    timeEstimate: '3분',
    content: 'claude-windows'
  },
  {
    id: createStepId('auth-windows'),
    number: 5,
    title: '계정 연결',
    timeEstimate: '3분',
    content: 'auth-windows'
  },
  {
    id: createStepId('project-windows'),
    number: 6,
    title: '첫 프로젝트 시작',
    timeEstimate: '2분',
    content: 'project-windows'
  }
];

// 통합 스텝 데이터
export const guideSteps = {
  mac: macSteps,
  windows: windowsSteps
} as const;