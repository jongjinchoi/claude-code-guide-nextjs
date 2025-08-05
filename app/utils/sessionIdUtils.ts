/**
 * 세션 ID 형식 통일을 위한 유틸리티
 */

/**
 * 세션 ID 형식 정규화
 * 기존: 1753243178304-lf3ctibjq
 * 신규: session_1753243178304_lf3ctibjq
 */
export function normalizeSessionId(sessionId: string): string {
  if (!sessionId) return '';
  
  // 이미 새 형식인 경우
  if (sessionId.startsWith('session_')) {
    return sessionId;
  }
  
  // 기존 형식인 경우 변환
  // 1753243178304-lf3ctibjq -> session_1753243178304_lf3ctibjq
  return `session_${sessionId.replace(/-/g, '_')}`;
}

/**
 * 세션 ID가 유효한지 확인
 */
export function isValidSessionId(sessionId: string): boolean {
  // 새 형식: session_타임스탬프_랜덤문자열
  const newFormatRegex = /^session_\d{13}_[a-z0-9]{9}$/;
  
  // 기존 형식: 타임스탬프-랜덤문자열
  const oldFormatRegex = /^\d{13}-[a-z0-9]{9}$/;
  
  return newFormatRegex.test(sessionId) || oldFormatRegex.test(sessionId);
}

/**
 * 새로운 세션 ID 생성 (통일된 형식)
 */
export function generateSessionId(): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 9);
  return `session_${timestamp}_${randomString}`;
}

/**
 * 세션 ID에서 타임스탬프 추출
 */
export function getTimestampFromSessionId(sessionId: string): number | null {
  const normalized = normalizeSessionId(sessionId);
  const match = normalized.match(/session_(\d{13})_/);
  
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  
  return null;
}