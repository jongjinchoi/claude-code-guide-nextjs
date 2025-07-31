/**
 * Terminal Component Type Definitions - Essential Only
 */

import { OSType } from './guide';

/**
 * Terminal Variants (실제 사용되는 것만)
 */
export type TerminalVariant = 'default' | 'success';

/**
 * Terminal Example Props (Guide/FAQ 컴포넌트용)
 */
export interface TerminalExampleProps {
  readonly variant?: TerminalVariant;
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly os?: OSType;
}

/**
 * Code Block Props (터미널과 유사한 구조)
 */
export interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly copyable?: boolean;
  readonly os?: OSType;
  readonly onCopy?: (code: string) => void;
}