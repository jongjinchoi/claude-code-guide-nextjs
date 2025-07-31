'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../styles/components/CompletionModal.css';
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
      showToast('피드백 제출에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleShareAction = (action: string) => {
    const url = 'https://getclaudecode.com/';
    const title = 'Claude Code Guide - 초보자를 위한 바이브 코딩의 시작';
    const text = 'Claude Code를 6단계로 간단하게 설치하세요. 터미널이 처음이어도 걱정 없습니다!';
    
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          showToast('링크가 복사되었습니다!', 'success');
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
      return '정말 기쁘네요! 한 마디 남겨주실래요?';
    } else if (selectedEmoji === 'sad') {
      return '아쉬우셨군요. 의견을 들려주실래요?';
    }
    return '한 마디 남겨주실래요?';
  };

  const getFeedbackSubtitle = () => {
    if (selectedEmoji === 'love') {
      return '어떤 점이 가장 좋으셨나요?';
    } else if (selectedEmoji === 'sad') {
      return '어떤 점을 개선하면 좋을까요?';
    }
    return '여러분의 소중한 의견이 큰 힘이 됩니다';
  };

  const getFeedbackPlaceholder = () => {
    if (selectedEmoji === 'love') {
      return '어떤 점이 좋았나요?';
    } else if (selectedEmoji === 'sad') {
      return '어떤 점이 아쉬웠나요?';
    }
    return '어떤 점이 좋았나요? 또는 어떤 점이 아쉬웠나요?';
  };

  return (
    <div className="completion-modal is-visible" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={`modal-content modal-content-split ${showFeedbackSection ? 'is-expanded' : ''}`}>
        <button className="btn-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-split-layout">
          <div className="modal-left-section">
            <div className="modal-icon">🎉</div>
            <h2>축하합니다!</h2>
            <p>Claude Code 설치완료를 축하드립니다!</p>
            <p className="modal-subtitle">터미널에 <code>claude</code> 입력하고 작게라도 만들어보세요!</p>
            
            <button 
              className="btn-docs-link" 
              onClick={() => window.open('https://docs.anthropic.com/en/docs/claude-code', '_blank')}
            >
              <i className="fas fa-book"></i>
              공식문서 보기
            </button>
            
            <div className="feedback-emoji-section">
              <p className="feedback-question">오늘 경험은 어떠셨나요?</p>
              <p className="feedback-reason">💡 정말 도움이 되셨다면 <span className="highlight-text">'최고예요!'</span>를 눌러주세요!</p>
              <div className="emoji-options">
                <button 
                  className={`btn-emoji ${selectedEmoji === 'love' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('love')}
                >
                  <span className="emoji">😍</span>
                  <span className="emoji-label">최고예요</span>
                  <span className="emoji-click-hint">↑ 클릭</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'good' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('good')}
                >
                  <span className="emoji">😊</span>
                  <span className="emoji-label">좋아요</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'neutral' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('neutral')}
                >
                  <span className="emoji">😐</span>
                  <span className="emoji-label">보통이에요</span>
                </button>
                <button 
                  className={`btn-emoji ${selectedEmoji === 'sad' ? 'is-selected' : ''}`}
                  onClick={() => handleEmojiClick('sad')}
                >
                  <span className="emoji">😕</span>
                  <span className="emoji-label">아쉬워요</span>
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
                  />
                  <button 
                    className="btn-feedback-submit" 
                    onClick={handleSubmitFeedback}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        제출 중...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        제작자에게 피드백 남기기
                      </>
                    )}
                  </button>
                  <div className="creator-mini-profile">
                    <Image 
                      src="/images/profile.jpg" 
                      alt="제작자 프로필" 
                      className="creator-avatar"
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                    <div className="creator-info">
                      <div className="creator-name">👨‍💻 제작자: 진(Jin)</div>
                      <div className="creator-message">
                        이 가이드가 도움이 되었기를 바랍니다!<br />
                        여러분의 피드백이 큰 힘이 됩니다 🙏
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="feedback-success">
                  <i className="fas fa-check-circle"></i>
                  <h3>감사합니다!</h3>
                  <p>제작자 진(Jin)이 여러분의 소중한 의견을 받았습니다 💌</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-share-section">
          <p className="share-question">이 사이트를 친구에게 추천하시겠어요?</p>
          <div className="share-content">
            <div className="share-url">https://getclaudecode.com/</div>
            <button className={`btn-share ${showShareMenu ? 'is-active' : ''}`} onClick={handleShare}>
              <i className="fas fa-share"></i>
              공유하기
            </button>
            {showShareMenu && (
              <div className="share-menu is-visible">
                <div className="share-menu-item" onClick={() => handleShareAction('copy')}>
                  <i className="fas fa-copy"></i>
                  <span>링크 복사</span>
                </div>
                <div className="share-menu-item" onClick={() => handleShareAction('twitter')}>
                  <i className="fab fa-twitter"></i>
                  <span>트위터</span>
                </div>
                <div className="share-menu-item" onClick={() => handleShareAction('facebook')}>
                  <i className="fab fa-facebook-f"></i>
                  <span>페이스북</span>
                </div>
                <div className="share-menu-item" onClick={() => handleShareAction('linkedin')}>
                  <i className="fab fa-linkedin-in"></i>
                  <span>링크드인</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button className="btn-text-secondary" onClick={onClose}>
          나중에 하기
        </button>
      </div>
    </div>
  );
}