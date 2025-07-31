/**
 * Event Handler Type Definitions - Essential Only
 */

import { StepId, StepNumber, OSType } from './guide';

/**
 * Common Click Handlers (실제 사용되는 것만)
 */
export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type GenericClickHandler<T extends HTMLElement = HTMLElement> = (event: React.MouseEvent<T>) => void;

/**
 * Form Event Handlers
 */
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Guide-specific Event Handlers (새 시스템 기반)
 */
export type OSChangeHandler = (os: OSType) => void;
export type StepCompleteHandler = (stepNumber: StepNumber) => void;
export type ButtonResultHandler = (buttonType: 'success' | 'error' | 'resolved', buttonText: string) => void;

/**
 * Analytics Event Handlers
 */
export type CodeCopyHandler = (stepId: StepId, codeType: string) => void;
export type FeedbackHandler = (score: number, text?: string) => void;

/**
 * Utility Event Types
 */
export type EventHandler<T = any> = (data: T) => void;
export type AsyncEventHandler<T = any> = (data: T) => Promise<void>;