// 공통으로 사용되는 타입 정의

// 운영체제 타입
export type OSMode = 'mac' | 'windows';

// 기본 Props 타입
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// 링크 타입
export interface Link {
  href: string;
  label: string;
  icon?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

// 단계 정보 타입
export interface StepInfo {
  stepNumber: number;
  stepName: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

// 코드 관련 타입
export interface CodeInfo {
  category: string;
  action: string;
  importance: 'required' | 'optional';
  stepInfo?: StepInfo;
}

// 버튼 타입
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// 모달 타입
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

