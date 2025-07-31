// Guide 관련 핵심 타입 정의
export type OSType = 'mac' | 'windows';
export type StepStatus = 'pending' | 'active' | 'completed' | 'error';
export type StepResult = 'success' | 'error' | 'resolution';
export type EmojiType = 'love' | 'good' | 'neutral' | 'sad';

// Branded Types for Type Safety
export type StepId = string & { readonly brand: unique symbol };
export type UserId = string & { readonly brand: unique symbol };
export type SessionId = string & { readonly brand: unique symbol };

// Factory functions for branded types
export const createStepId = (id: string): StepId => id as StepId;
export const createUserId = (id: string): UserId => id as UserId;
export const createSessionId = (id: string): SessionId => id as SessionId;

// Step Numbers as literal types
export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 가이드 단계 데이터 구조
 */
export interface StepData {
  readonly id: StepId;
  readonly number: StepNumber;
  readonly title: string;
  readonly startTag?: string;
  readonly timeEstimate: string;
  readonly content: string;
}

/**
 * 스텝 에러 정보
 */
export interface StepError {
  readonly type: 'command_not_found' | 'permission_denied' | 'network_error' | 'version_mismatch' | 'unknown';
  readonly message: string;
  readonly solution?: string;
  readonly timestamp: Date;
  readonly stepId: StepId;
}

/**
 * 스텝 완료 결과
 */
export interface StepCompletionResult {
  readonly success: boolean;
  readonly duration: number; // milliseconds
  readonly errorType?: StepError['type'];
  readonly userAction: 'success_button' | 'error_button' | 'resolution_button';
  readonly attemptCount: number;
}

/**
 * GuideStep 컴포넌트 Props
 */
export interface GuideStepProps {
  step: StepData;
  os: OSType;
  isActive: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggleExpand: (stepId: StepId) => void;
  onComplete: (stepId: StepId, result: StepCompletionResult) => void;
  onError: (stepId: StepId, error: StepError) => void;
}

/**
 * 가이드 전체 상태
 */
export interface GuideState {
  readonly currentOS: OSType;
  readonly currentStep: StepNumber | null;
  readonly completedSteps: ReadonlySet<StepId>;
  readonly expandedSteps: ReadonlySet<StepId>;
  readonly showCompletionModal: boolean;
  readonly startTime: Date | null;
  readonly accumulatedTime: number; // milliseconds
  readonly sessionId: SessionId;
  readonly isProcessing: boolean;
}

/**
 * 이벤트 타입 정의
 */
export interface GuideStepResultEvent {
  readonly stepId: StepId;
  readonly stepNumber: StepNumber;
  readonly result: StepResult;
  readonly timeSpent: number; // milliseconds
  readonly errorDetails?: StepError;
  readonly completionResult?: StepCompletionResult;
}

export interface GuideOSChangedEvent {
  readonly previousOS: OSType;
  readonly newOS: OSType;
  readonly timestamp: Date;
}

export interface GuideCompletedEvent {
  readonly totalTime: number; // milliseconds
  readonly activeTime: number; // actual active time excluding breaks
  readonly completedSteps: readonly StepId[];
  readonly attemptCounts: Record<StepId, number>;
  readonly errors: readonly StepError[];
}

/**
 * 가이드 이벤트 맵
 */
export interface GuideEvents {
  'guide-step-result': GuideStepResultEvent;
  'guide-os-changed': GuideOSChangedEvent;
  'guide-completed': GuideCompletedEvent;
}

/**
 * 진행률 정보
 */
export interface ProgressInfo {
  readonly current: StepNumber | 0;
  readonly total: 6;
  readonly percentage: number;
  readonly completedSteps: readonly StepId[];
  readonly remainingSteps: readonly StepId[];
}

/**
 * 만족도 데이터
 */
export interface SatisfactionData {
  readonly love: number;
  readonly good: number;
  readonly neutral: number;
  readonly sad: number;
  readonly total: number;
  readonly averageScore: number; // 1-4 scale
}

/**
 * Type Guards
 */
export const isStepNumber = (value: unknown): value is StepNumber => {
  return typeof value === 'number' && value >= 1 && value <= 6;
};

export const isOSType = (value: unknown): value is OSType => {
  return value === 'mac' || value === 'windows';
};

export const isStepResult = (value: unknown): value is StepResult => {
  return value === 'success' || value === 'error' || value === 'resolution';
};

export const isStepError = (error: unknown): error is StepError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error &&
    'stepId' in error
  );
};

/**
 * Discriminated Union for Step State
 */
export type StepStateInfo = 
  | { status: 'pending'; progress: 0 }
  | { status: 'in_progress'; progress: number; startedAt: Date }
  | { status: 'completed'; progress: 100; completedAt: Date; duration: number }
  | { status: 'error'; progress: number; error: StepError };

export const isStepCompleted = (step: StepStateInfo): step is Extract<StepStateInfo, { status: 'completed' }> => {
  return step.status === 'completed';
};

/**
 * OS-specific Props Type
 */
export type OSSpecificProps<T extends OSType> = T extends 'windows' 
  ? { 
      windowsCommand: string; 
      windowsTroubleshooting: string[];
      usesPowerShell?: boolean;
    }
  : { 
      macCommand: string; 
      homebrewRequired?: boolean;
      macOSVersion?: string;
    };