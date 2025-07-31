// 타입 가드 함수들

import { 
  OSMode, 
  ButtonVariant, 
  LoadingState,
  ToastType 
} from './index';

// OS Mode 타입 가드
export function isOSMode(value: any): value is OSMode {
  return value === 'mac' || value === 'windows';
}

// Button Variant 타입 가드
export function isButtonVariant(value: any): value is ButtonVariant {
  return ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value);
}

// Loading State 타입 가드
export function isLoadingState(value: any): value is LoadingState {
  return ['idle', 'loading', 'success', 'error'].includes(value);
}

// Toast Type 타입 가드
export function isToastType(value: any): value is ToastType {
  return ['info', 'success', 'warning', 'error'].includes(value);
}

// 객체가 특정 프로퍼티를 가지고 있는지 확인
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

// 값이 정의되어 있는지 확인
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

// 값이 null이 아닌지 확인
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

// 값이 null도 undefined도 아닌지 확인
export function isPresent<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// 문자열이 비어있지 않은지 확인
export function isNonEmptyString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

// 숫자인지 확인 (NaN 제외)
export function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// 배열이 비어있지 않은지 확인
export function isNonEmptyArray<T>(value: T[] | undefined | null): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

// 에러 객체인지 확인
export function isError(value: any): value is Error {
  return value instanceof Error;
}

// React 엘리먼트인지 확인
export function isReactElement(value: any): value is React.ReactElement {
  return value && typeof value === 'object' && '$$typeof' in value;
}