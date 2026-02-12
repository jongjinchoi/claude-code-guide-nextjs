'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SITE_CONFIG } from '@/app/config/site';
import styles from './Stats.module.css';

interface PublicStatsData {
  overview: {
    totalSessions: number;
    completionRate: number;
    avgCompletionMinutes: number;
    totalVisitors: number;
  };
  today: {
    today_sessions: number;
    completed_sessions: number;
    completion_rate: number;
    started_guide: number;
    today_total_visitors?: number;
  } | null;
  funnel: Array<{
    step: number;
    users_reached: number;
    dropped_off?: number | null;
    dropout_rate?: number | null;
  }>;
  platform: {
    launchDate: string;
    migrationDate: string;
    i18nLaunchDate: string;
    techStack: string[];
    performanceImprovement: string;
  };
  osStats: Array<{
    os: string;
    total_attempts: number;
    completions: number;
    success_rate: number;
    avg_time_minutes?: number | null;
  }>;
  i18nStats: {
    pre_launch_sessions: number;
    pre_launch_completion_rate: number;
    post_launch_sessions: number;
    post_launch_completion_rate: number;
    english_sessions: number;
    english_ratio: number;
    hours_since_launch: number;
  } | null;
  satisfaction: {
    averageScore: number;
    totalFeedback: number;
    satisfactionRate: number;
  };
  activity: {
    peakHours: Array<{
      hour_of_day: number;
      total_sessions: number;
    }>;
  };
  story?: {
    startDate: string;
    launchDate: string;
    migrationDate: string;
    globalDate: string;
    totalDays: number;
    phases: Array<{
      name: string;
      duration: string;
      tech: string;
    }>;
  };
}

interface StatsClientProps {
  locale: string;
}

export default function StatsClient({ locale }: StatsClientProps) {
  const t = useTranslations('stats');
  const [data, setData] = useState<PublicStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add class to body to hide navigation
    document.body.classList.add('statsPageActive');
    
    async function fetchStats() {
      try {
        const response = await fetch('/api/public-stats');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(t('terminal.errorMessage'));
        }
      } catch (err) {
        setError(t('terminal.networkError'));
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('statsPageActive');
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
            <div className={styles.terminalTitle}>{t('terminal.title')}</div>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{t('terminal.loading')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
            <div className={styles.terminalTitle}>{t('terminal.title')}</div>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.error}>
              <h2>⚠️ {t('terminal.error')}</h2>
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>{t('terminal.retry')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.red}`}></div>
            <div className={`${styles.dot} ${styles.yellow}`}></div>
            <div className={`${styles.dot} ${styles.green}`}></div>
          </div>
          <div className={styles.terminalTitle}>{t('terminal.title')}</div>
        </div>
        
        <div className={styles.terminalBody}>
          {/* Welcome Message */}
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{t('terminal.prompt')}</span>
            <span className={styles.command}>{t('terminal.commands.cat')}</span>
          </div>

          {/* ASCII Banner */}
          <div className={styles.asciiArt}>
{`
   ███████╗████████╗ █████╗ ████████╗███████╗
   ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
   ███████╗   ██║   ███████║   ██║   ███████╗
   ╚════██║   ██║   ██╔══██║   ██║   ╚════██║
   ███████║   ██║   ██║  ██║   ██║   ███████║
   ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
      
      Claude Code Guide Analytics
`}
          </div>

          {/* Project Timeline */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.timeline.title')}</div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>{t('sections.timeline.dates.june26')}</span>
                <span className={styles.timelineArrow}>→</span>
                <span className={styles.timelineText}>{t('sections.timeline.events.firstHtml')}</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>{t('sections.timeline.dates.july17')}</span>
                <span className={styles.timelineArrow}>→</span>
                <span className={styles.timelineText}>{t('sections.timeline.events.launch')}</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>{t('sections.timeline.dates.august1')}</span>
                <span className={styles.timelineArrow}>→</span>
                <span className={styles.timelineText}>{t('sections.timeline.events.migration')}</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDate}>{t('sections.timeline.dates.august5')}</span>
                <span className={styles.timelineArrow}>→</span>
                <span className={styles.timelineText}>{t('sections.timeline.events.i18n')}</span>
              </div>
            </div>
          </div>

          {/* Current Stats */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              {t('sections.currentStats.title')}
              <span className={styles.operationDays}>
                {(() => {
                  const startDate = new Date(SITE_CONFIG.dates.launch);
                  const today = new Date();
                  const diffTime = Math.abs(today.getTime() - startDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                  return locale === 'ko' ? `운영 ${diffDays}일째` : `Day ${diffDays} of Operation`;
                })()}
              </span>
            </div>
            <div className={styles.heroStats} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>
                  {data.overview.totalVisitors.toLocaleString()}
                </div>
                <div className={styles.heroStatLabel}>{t('sections.currentStats.totalVisitors')}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>
                  {data.overview.totalSessions.toLocaleString()}
                </div>
                <div className={styles.heroStatLabel}>{t('sections.currentStats.guidePageVisits')}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>
                  {data.funnel[0]?.users_reached.toLocaleString() || 0}
                </div>
                <div className={styles.heroStatLabel}>{t('sections.currentStats.guideStarters')}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>
                  {data.funnel[data.funnel.length - 1]?.users_reached.toLocaleString() || 0}
                </div>
                <div className={styles.heroStatLabel}>{t('sections.currentStats.guideCompleted')}</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>
                  {(() => {
                    const starters = data.funnel[0]?.users_reached || 0;
                    const completers = data.funnel[data.funnel.length - 1]?.users_reached || 0;
                    const rate = starters > 0 ? (completers / starters) * 100 : 0;
                    return rate.toFixed(1);
                  })()}%
                </div>
                <div className={styles.heroStatLabel}>{t('sections.currentStats.completionRate')}</div>
              </div>
            </div>
          </div>

          {/* Today's Activity */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.todayStats.title')}</div>
            <div className={styles.dataGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
              <div className={styles.dataCard}>
                <div className={styles.dataValue}>
                  {data.today?.today_total_visitors || 0}
                </div>
                <div className={styles.dataLabel}>{t('sections.todayStats.totalVisitors')}</div>
              </div>
              <div className={styles.dataCard}>
                <div className={styles.dataValue}>
                  {data.today?.today_sessions || 0}
                </div>
                <div className={styles.dataLabel}>{t('sections.todayStats.guidePageVisits')}</div>
              </div>
              <div className={styles.dataCard}>
                <div className={styles.dataValue}>
                  {data.today?.started_guide || 0}
                </div>
                <div className={styles.dataLabel}>{t('sections.todayStats.guideStart')}</div>
              </div>
              <div className={styles.dataCard}>
                <div className={styles.dataValue}>
                  {data.today?.completed_sessions || 0}
                </div>
                <div className={styles.dataLabel}>{t('sections.todayStats.completed')}</div>
              </div>
              <div className={styles.dataCard}>
                <div className={styles.dataValue}>
                  {data.today?.completion_rate?.toFixed(1) || 0}%
                </div>
                <div className={styles.dataLabel}>{t('sections.todayStats.completionRate')}</div>
              </div>
            </div>
          </div>

          {/* User Journey */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.userJourney.title')}</div>
            <ul className={styles.statsList}>
              {data.funnel.map((step) => {
                const totalUsers = data.funnel[0]?.users_reached || 1;
                const reachRate = ((step.users_reached / totalUsers) * 100);
                return (
                  <li key={step.step} className={styles.statsListItem}>
                    <span className={styles.statsListLabel}>
                      {t('sections.userJourney.step')} {step.step}: {step.users_reached} {t('sections.userJourney.people')}
                    </span>
                    <span className={styles.statsListValue}>
                      {reachRate.toFixed(1)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Guide Conversion Analysis */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.conversionAnalysis.title')}</div>
            <ul className={styles.statsList}>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.totalVisitors')}</span>
                <span className={styles.statsListValue}>{data.overview.totalVisitors.toLocaleString()}{t('sections.conversionAnalysis.people')}</span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.guidePageVisits')}</span>
                <span className={styles.statsListValue}>{data.overview.totalSessions.toLocaleString()}{t('sections.conversionAnalysis.people')}</span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.actualGuideStarts')}</span>
                <span className={styles.statsListValue}>{(data.funnel[0]?.users_reached || 0).toLocaleString()}{t('sections.conversionAnalysis.people')}</span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.guidePageVisitRate')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const rate = (data.overview.totalSessions / data.overview.totalVisitors) * 100;
                    return `${data.overview.totalSessions}/${data.overview.totalVisitors} = ${rate.toFixed(1)}%`;
                  })()}
                </span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.guideStartRate')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const starters = data.funnel[0]?.users_reached || 0;
                    const pageVisitors = data.overview.totalSessions;
                    const rate = (starters / pageVisitors) * 100;
                    return `${starters}/${pageVisitors} = ${rate.toFixed(1)}%`;
                  })()}
                </span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.conversionAnalysis.overallConversionRate')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const starters = data.funnel[0]?.users_reached || 0;
                    const totalVisitors = data.overview.totalVisitors;
                    const rate = (starters / totalVisitors) * 100;
                    return `${starters}/${totalVisitors} = ${rate.toFixed(1)}%`;
                  })()}
                </span>
              </li>
            </ul>
          </div>

          {/* Growth Rate Analysis */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.growthRate.title')}</div>
            <ul className={styles.statsList}>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.growthRate.dailyAvgVisitors')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const startDate = new Date(SITE_CONFIG.dates.launch);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - startDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    const daily = data.overview.totalVisitors / diffDays;
                    return `${data.overview.totalVisitors.toLocaleString()}${t('sections.growthRate.people')} ÷ ${diffDays}${t('sections.growthRate.days')} = ${daily.toFixed(1)}${t('sections.growthRate.peoplePerDay')}`;
                  })()}
                </span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.growthRate.dailyAvgGuidePage')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const startDate = new Date(SITE_CONFIG.dates.launch);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - startDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    const daily = data.overview.totalSessions / diffDays;
                    return `${data.overview.totalSessions.toLocaleString()}${t('sections.growthRate.people')} ÷ ${diffDays}${t('sections.growthRate.days')} = ${daily.toFixed(1)}${t('sections.growthRate.peoplePerDay')}`;
                  })()}
                </span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.growthRate.dailyAvgGuideStart')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const starters = data.funnel[0]?.users_reached || 0;
                    const startDate = new Date(SITE_CONFIG.dates.launch);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - startDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    const daily = starters / diffDays;
                    return `${starters}${t('sections.growthRate.people')} ÷ ${diffDays}${t('sections.growthRate.days')} = ${daily.toFixed(1)}${t('sections.growthRate.peoplePerDay')}`;
                  })()}
                </span>
              </li>
            </ul>
          </div>

          {/* Today's Performance */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{t('sections.todayPerformance.title')}</div>
            <ul className={styles.statsList}>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.todayPerformance.todayGuidePage')}</span>
                <span className={styles.statsListValue}>{data.today?.today_sessions || 0}{t('sections.todayPerformance.people')}</span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.todayPerformance.todayGuideStart')}</span>
                <span className={styles.statsListValue}>{data.today?.started_guide || 0}{t('sections.todayPerformance.people')}</span>
              </li>
              <li className={styles.statsListItem}>
                <span className={styles.statsListLabel}>{t('sections.todayPerformance.todayStartRate')}</span>
                <span className={styles.statsListValue}>
                  {(() => {
                    const todayPages = data.today?.today_sessions || 0;
                    const todayStarters = data.today?.started_guide || 0;
                    const todayRate = todayPages > 0 ? (todayStarters / todayPages) * 100 : 0;
                    const normalRate = (() => {
                      const starters = data.funnel[0]?.users_reached || 0;
                      const pageVisitors = data.overview.totalSessions;
                      return pageVisitors > 0 ? (starters / pageVisitors) * 100 : 0;
                    })();
                    const diff = todayRate - normalRate;
                    const compareText = locale === 'ko'
                      ? diff > 0 
                        ? `평소 ${normalRate.toFixed(1)}%보다 ${diff.toFixed(1)}% ${t('comparison.higher')}`
                        : `평소 ${normalRate.toFixed(1)}%보다 ${Math.abs(diff).toFixed(1)}% ${t('comparison.lower')}`
                      : diff > 0
                        ? `usual ${normalRate.toFixed(1)}% +${diff.toFixed(1)}% ${t('comparison.higher')}`
                        : `usual ${normalRate.toFixed(1)}% -${Math.abs(diff).toFixed(1)}% ${t('comparison.lower')}`;
                    return `${todayStarters}/${todayPages} = ${todayRate.toFixed(1)}% (${compareText})`;
                  })()}
                </span>
              </li>
            </ul>
          </div>

          {/* i18n Impact */}
          {data.i18nStats && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>{t('sections.i18nImpact.title')}</div>
              <ul className={styles.statsList}>
                <li className={styles.statsListItem}>
                  <span className={styles.statsListLabel}>{t('sections.i18nImpact.beforeLaunch')}</span>
                  <span className={styles.statsListValue}>{data.i18nStats.pre_launch_sessions} {t('sections.i18nImpact.sessions')}</span>
                </li>
                <li className={styles.statsListItem}>
                  <span className={styles.statsListLabel}>{t('sections.i18nImpact.afterLaunch')}</span>
                  <span className={styles.statsListValue}>{data.i18nStats.post_launch_sessions} {t('sections.i18nImpact.sessions')}</span>
                </li>
                <li className={styles.statsListItem}>
                  <span className={styles.statsListLabel}>{t('sections.i18nImpact.englishUsers')}</span>
                  <span className={styles.statsListValue}>
                    {data.i18nStats.english_sessions}{t('sections.i18nImpact.people')} ({data.i18nStats.english_ratio.toFixed(1)}%)
                  </span>
                </li>
                <li className={styles.statsListItem}>
                  <span className={styles.statsListLabel}>{t('sections.i18nImpact.operationTime')}</span>
                  <span className={styles.statsListValue}>{data.i18nStats.hours_since_launch.toFixed(1)} {t('sections.i18nImpact.hours')}</span>
                </li>
              </ul>
            </div>
          )}

          {/* Tech Evolution */}
          {data.story && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>{t('sections.techEvolution.title')}</div>
              <ul className={styles.statsList}>
                {data.story.phases.map((phase, index) => (
                  <li key={index} className={styles.statsListItem}>
                    <span className={styles.statsListLabel}>
                      {t('sections.techEvolution.phase')} {index + 1}: {phase.name} ({phase.duration})
                    </span>
                    <span className={styles.statsListValue}>{phase.tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Command prompt */}
          <div className={styles.commandLine}>
            <span className={styles.prompt}>stats@getclaudecode.com ~ %</span>
            <span className={styles.command}>echo "Thanks for visiting!"</span>
          </div>
          <p style={{ color: '#E5E5E5', marginLeft: '24px' }}>Thanks for visiting!</p>

          <div className={styles.commandLine}>
            <span className={styles.prompt}>stats@getclaudecode.com ~ %</span>
            <span className={styles.command}>_</span>
            <span className={styles.cursor}></span>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p>
              {t('footer.realtime')} | {t('footer.lastUpdate')}: {new Date().toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US')} | <a href={`/${locale}`}>{t('footer.backToHome')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}