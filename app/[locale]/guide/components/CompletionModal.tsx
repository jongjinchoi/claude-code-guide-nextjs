'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import '../../../styles/components/CompletionModal.css';
import { useToast } from '@/app/components/Toast';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CompletionModalProps {
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  onFeedbackSubmit: (feedback: { emoji: string; text?: string; completionTime: number }) => void;
  totalTime: number;
}

export default function CompletionModal({ 
  onClose,
  onEmojiSelect,
  onFeedbackSubmit,
  totalTime
}: CompletionModalProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('good');
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { showToast } = useToast();
  const t = useTranslations('guide.completion');

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    
    // 부모 컴포넌트로 알림
    onEmojiSelect(emoji);
    
    // Show feedback section for extreme reactions
    if (emoji === 'love' || emoji === 'sad') {
      setShowFeedbackSection(true);
    } else {
      setShowFeedbackSection(false);
    }
    
    // 이모지 -> 점수 변환
    const emojiToScore: Record<string, number> = {
      'love': 5,
      'good': 4, 
      'neutral': 3,
      'sad': 2
    };
    
    // GA4로 이모지 선택 추적
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_emoji_selected', {
        emoji: emoji,
        completion_time: totalTime,
        button_purpose: 'select_satisfaction_emoji'
      });
    }
    
    // For good and neutral, immediately track feedback
    if (emoji === 'good' || emoji === 'neutral') {
      // GA4로 피드백 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'feedback_submitted', {
          feedback_score: emojiToScore[emoji] || 3,
          completion_time: totalTime,
          guide_completed: true,
          emoji: emoji
        });
      }
    }
  };

  const handleSubmitFeedback = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // 부모 컴포넌트로 피드백 제출
      await onFeedbackSubmit({
        emoji: selectedEmoji,
        text: feedbackText || undefined,
        completionTime: totalTime
      });
      
      // 이모지 -> 점수 변환
      const emojiToScore: Record<string, number> = {
        'love': 5,
        'good': 4, 
        'neutral': 3,
        'sad': 2
      };
      
      // Supabase에 피드백 저장
      const sessionId = typeof window !== 'undefined' ? 
        sessionStorage.getItem('guide-session-id') || `session_${Date.now()}` : 
        `session_${Date.now()}`;
      
      await supabase.from('user_feedback').insert({
        session_id: sessionId,
        feedback_score: emojiToScore[selectedEmoji] || 3,
        feedback_text: feedbackText || null,
        emoji: selectedEmoji,
        completion_time_minutes: Math.round(totalTime / 60),
        page_path: '/guide'
      });
      
      // GA4 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'feedback_submitted', {
          feedback_score: emojiToScore[selectedEmoji] || 3,
          has_text: feedbackText ? true : false,
          text_length: feedbackText ? feedbackText.length : 0,
          completion_time: totalTime,
          guide_completed: true,
          emoji: selectedEmoji
        });
      }
      
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showToast(t('feedback.submitError'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleShareAction = (action: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'}/`;
    const title = t('share.title');
    const text = t('share.description');
    
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          showToast(t('share.copied'), 'success');
        });
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=550,height=420');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`, '_blank', 'width=550,height=420');
        break;
    }
    
    setShowShareMenu(false);
  };

  const getFeedbackTitle = () => {
    if (selectedEmoji === 'love') {
      return t('feedback.titles.love');
    } else if (selectedEmoji === 'sad') {
      return t('feedback.titles.sad');
    }
    return t('feedback.titles.default');
  };

  const getFeedbackSubtitle = () => {
    if (selectedEmoji === 'love') {
      return t('feedback.subtitles.love');
    } else if (selectedEmoji === 'sad') {
      return t('feedback.subtitles.sad');
    }
    return t('feedback.subtitles.default');
  };

  const getFeedbackPlaceholder = () => {
    if (selectedEmoji === 'love') {
      return t('feedback.placeholders.love');
    } else if (selectedEmoji === 'sad') {
      return t('feedback.placeholders.sad');
    }
    return t('feedback.placeholders.default');
  };

  return (
    <div className="completion-modal is-visible" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={`modal-content modal-content-split ${showFeedbackSection ? 'is-expanded' : ''}`}>
        <button className="btn-modal-close" onClick={onClose} aria-label={t('closeButton')}>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        
        <div className="modal-split-layout">
          <div className="modal-left-section">
            <div className="modal-icon">🎉</div>
            <h2>{t('title')}</h2>
            <p>{t('subtitle')}</p>
            <p className="modal-subtitle" dangerouslySetInnerHTML={{ __html: t.raw('instruction') }} />
            
            <button
              className="btn-docs-link"
              onClick={() => window.open('https://docs.anthropic.com/en/docs/claude-code', '_blank')}
            >
              <i className="fas fa-book" aria-hidden="true"></i>
              {t('officialDocs')}
            </button>
            
            <div className="feedback-emoji-section">
              <p className="feedback-question">{t('feedback.question')}</p>
              <p className="feedback-reason" dangerouslySetInnerHTML={{ __html: t.raw('feedback.reason') }} />
              <div className="emoji-options">
                <button 
                  className={`btn-emoji ${selectedEmoji === 'love' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('love')}
                >
                  <span className="emoji">😍</span>
                  <span className="emoji-label">{t('feedback.emojis.love')}</span>
                  <span className="emoji-click-hint">{t('feedback.clickHint')}</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'good' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('good')}
                >
                  <span className="emoji">😊</span>
                  <span className="emoji-label">{t('feedback.emojis.good')}</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'neutral' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('neutral')}
                >
                  <span className="emoji">😐</span>
                  <span className="emoji-label">{t('feedback.emojis.neutral')}</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'sad' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('sad')}
                >
                  <span className="emoji">😕</span>
                  <span className="emoji-label">{t('feedback.emojis.sad')}</span>
                </button>
              </div>
            </div>
          </div>
          
          {showFeedbackSection && (
            <div className="modal-right-section" id="feedbackDetailSection">
              {!feedbackSubmitted ? (
                <div className="feedback-detail">
                  <h3>{getFeedbackTitle()}</h3>
                  <p>{getFeedbackSubtitle()}</p>
                  <textarea
                    id="feedbackText"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={getFeedbackPlaceholder()}
                    rows={6}
                    spellCheck={false}
                  />
                  <button 
                    className="btn-feedback-submit" 
                    onClick={handleSubmitFeedback}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                        {t('feedback.submitting')}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" aria-hidden="true"></i>
                        {t('feedback.submitButton')}
                      </>
                    )}
                  </button>
                  <div className="creator-mini-profile">
                    <Image 
                      src="/images/profile.jpg" 
                      alt={t('feedback.creator.profileAlt')} 
                      className="creator-avatar"
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                    <div className="creator-info">
                      <div className="creator-name">{t('feedback.creator.name')}</div>
                      <div className="creator-message" dangerouslySetInnerHTML={{ __html: t.raw('feedback.creator.message') }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="feedback-success">
                  <i className="fas fa-check-circle" aria-hidden="true"></i>
                  <h3>{t('feedback.success.title')}</h3>
                  <p>{t('feedback.success.message')}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-share-section">
          <p className="share-question">{t('share.question')}</p>
          <div className="share-content">
            <div className="share-url">{process.env.NEXT_PUBLIC_BASE_URL || 'https://getclaudecode.com'}/</div>
            <button className={`btn-share ${showShareMenu ? 'is-active' : ''}`} onClick={handleShare}>
              <i className="fas fa-share" aria-hidden="true"></i>
              {t('share.button')}
            </button>
            {showShareMenu && (
              <div className="share-menu is-visible" role="menu">
                <button type="button" className="share-menu-item" onClick={() => handleShareAction('copy')} role="menuitem">
                  <i className="fas fa-copy" aria-hidden="true"></i>
                  <span>{t('share.menu.copy')}</span>
                </button>
                <button type="button" className="share-menu-item" onClick={() => handleShareAction('twitter')} role="menuitem">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                  <span>{t('share.menu.twitter')}</span>
                </button>
                <button type="button" className="share-menu-item" onClick={() => handleShareAction('facebook')} role="menuitem">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                  <span>{t('share.menu.facebook')}</span>
                </button>
                <button type="button" className="share-menu-item" onClick={() => handleShareAction('linkedin')} role="menuitem">
                  <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                  <span>{t('share.menu.linkedin')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button className="btn-text-secondary" onClick={onClose}>
          {t('laterButton')}
        </button>
      </div>
    </div>
  );
}