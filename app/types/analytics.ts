export interface AnalyticsEvent {
  eventName: string;
  parameters?: Record<string, any>;
}

export interface GuideAnalyticsData {
  sessionId: string;
  userId: string;
  stepNumber: number;
  stepName: string;
  completionTime?: number;
  isError?: boolean;
  errorType?: string;
}

export interface PageAnalyticsData {
  pagePath: string;
  pageTitle: string;
  sessionId: string;
  userId: string;
  referrer?: string;
  timeOnPage?: number;
}