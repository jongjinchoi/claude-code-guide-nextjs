'use client';

import { useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function MobileDetector() {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('mobile');
  const locale = params?.locale as string || 'en';

  // Stats 페이지에서는 MobileDetector를 렌더링하지 않음
  if (pathname.includes('/stats')) {
    return null;
  }

  useEffect(() => {
    const mobileDetector = {
      isDirectAccessModal: false,

      init() {
        this.checkAndBlock();
        
        // ESC 키 이벤트 리스너
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && !this.isDirectAccessModal) {
            this.closeMobileWarningModal();
          }
        });
      },

      checkAndBlock() {
        if (this.isMobileDevice()) {
          // Check if current page is allowed for mobile
          // Remove locale prefix for comparison
          const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, '') || '/';
          const allowedPages = ['/', '/about'];
          const isAllowedPage = allowedPages.includes(pathWithoutLocale);
          
          if (!isAllowedPage) {
            // Show modal instead of full overlay
            setTimeout(() => {
              this.showMobileWarningModal(pathname, true); // true = direct access
            }, 500); // Small delay to let page load
          } else {
            // Set up mobile link interceptors for restricted pages
            this.setupMobileLinkInterceptors();
          }
        }
      },

      isMobileDevice() {
        // Method 1: User Agent detection
        const userAgent = navigator.userAgent.toLowerCase();
        const mobilePatterns = [
          /mobile/i,
          /android/i,
          /iphone/i,
          /ipad/i,
          /ipod/i,
          /blackberry/i,
          /windows phone/i,
          /webos/i,
          /bada/i,
          /tizen/i,
          /kindle/i,
          /silk/i,
          /mobile safari/i,
          /opera mini/i,
          /opera mobi/i
        ];

        const isMobileUserAgent = mobilePatterns.some(pattern => pattern.test(userAgent));

        // Method 2: Screen size detection (as backup)
        const isMobileScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;

        // Method 3: Touch support detection
        const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Method 4: Orientation support (mobile specific)
        const hasOrientationSupport = typeof window.orientation !== 'undefined';

        // Combine multiple detection methods for better accuracy
        return isMobileUserAgent || (isMobileScreen && (hasTouchSupport || hasOrientationSupport));
      },

      setupMobileLinkInterceptors() {
        document.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const link = target.closest('a');
          if (!link) return;
          
          const href = link.getAttribute('href');
          if (!href) return;
          
          // Check if link points to restricted pages
          const restrictedPages = ['/guide', '/faq'];
          const isRestrictedLink = restrictedPages.some(page => href.includes(page));
          
          // Also check for guide start button
          const isGuideStartButton = link.classList.contains('cta-button') || 
                                   link.classList.contains('btn-hero-primary') || 
                                   (link.textContent?.includes('가이드 시작') ?? false) || 
                                   (link.textContent?.includes('시작하기') ?? false) ||
                                   (link.textContent?.includes('지금 시작하기') ?? false) ||
                                   (link.textContent?.includes('Get Started') ?? false) ||
                                   (link.textContent?.includes('Start Now') ?? false);
          
          if (isRestrictedLink || isGuideStartButton) {
            e.preventDefault();
            // Convert relative URL to absolute if needed
            const absoluteUrl = href.startsWith('/') ? href : '/' + href;
            this.showMobileWarningModal(absoluteUrl);
          }
        });
      },

      showMobileWarningModal(targetUrl: string, isDirectAccess = false) {
        // Remove existing modal if any
        const existingModal = document.getElementById('mobile-warning-modal');
        if (existingModal) {
          existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'mobile-warning-modal';
        modal.className = 'mobile-warning-modal';
        
        // 직접 접근인 경우 오버레이 클릭 비활성화
        const overlayClick = isDirectAccess ? '' : 'id="mobile-overlay"';
        
        // 버튼 설정
        const secondButton = isDirectAccess 
          ? `<button class="mobile-warning-button primary" id="mobile-home-btn">
                 <i class="fas fa-home"></i>
                 <span>${t('warning.buttons.home')}</span>
             </button>`
          : `<button class="mobile-warning-button close" id="mobile-close-btn">
                 <i class="fas fa-times"></i>
                 <span>${t('warning.buttons.close')}</span>
             </button>`;
        
        modal.innerHTML = `
          <div class="mobile-warning-overlay" ${overlayClick}></div>
          <div class="mobile-warning-content">
              <div class="mobile-warning-icon">
                  <i class="fas fa-desktop"></i>
              </div>
              <h3 class="mobile-warning-title">${t('warning.title')}</h3>
              <p class="mobile-warning-message">
                  ${t('warning.message').replace('\n', '<br>')}
              </p>
              <div class="mobile-warning-email-section">
                  <input type="email" 
                         id="email-input" 
                         class="mobile-warning-email-input" 
                         placeholder="${t('warning.email_input.placeholder')}"
                         autocomplete="email">
                  <button class="mobile-warning-button email-send" onclick="window.mobileDetector.sendEmail('${window.location.origin}${targetUrl}')">
                      <i class="fas fa-envelope"></i>
                      <span>${t('warning.buttons.send_email')}</span>
                  </button>
              </div>
              <div class="mobile-warning-actions">
                  <button class="mobile-warning-button copy-link" onclick="window.mobileDetector.copyLinkToClipboard('${window.location.origin}${targetUrl}')">
                      <i class="fas fa-link"></i>
                      <span>${t('warning.buttons.copy_link')}</span>
                  </button>
                  ${secondButton}
              </div>
              <p class="mobile-warning-hint">
                  ${t('warning.hint')}
              </p>
          </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        // 버튼 이벤트 리스너 추가
        setTimeout(() => {
          // 홈으로 버튼
          const homeBtn = document.getElementById('mobile-home-btn');
          if (homeBtn) {
            homeBtn.addEventListener('click', () => {
              window.location.href = '/';
            });
          }
          
          // 닫기 버튼
          const closeBtn = document.getElementById('mobile-close-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              this.closeMobileWarningModal();
            });
          }
          
          // 오버레이 클릭 (모달 닫기)
          const overlay = document.getElementById('mobile-overlay');
          if (overlay) {
            overlay.addEventListener('click', () => {
              this.closeMobileWarningModal();
            });
          }
        }, 50);
        
        // 직접 접근인 경우 ESC 키 이벤트 핸들러 추가
        if (isDirectAccess) {
          this.isDirectAccessModal = true;
        }
      },

      closeMobileWarningModal() {
        // 직접 접근 모달인 경우 닫지 않음
        if (this.isDirectAccessModal) {
          return;
        }
        
        const modal = document.getElementById('mobile-warning-modal');
        if (modal) {
          modal.classList.remove('active');
          setTimeout(() => modal.remove(), 300);
        }
      },

      copyLinkToClipboard(url: string) {
        // Track button click
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(() => {
            // Update button text
            const copyButton = document.querySelector('.mobile-warning-button.copy-link');
            if (copyButton) {
              const originalHTML = copyButton.innerHTML;
              copyButton.innerHTML = `<i class="fas fa-check"></i> ${t('warning.buttons.copied')}`;
              copyButton.classList.add('copied');
              setTimeout(() => {
                copyButton.innerHTML = originalHTML;
                copyButton.classList.remove('copied');
              }, 2000);
            }
          }).catch(() => {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(url);
          });
        } else {
          this.fallbackCopyToClipboard(url);
        }
      },

      fallbackCopyToClipboard(text: string) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          const copyButton = document.querySelector('.mobile-warning-button.copy-link');
          if (copyButton) {
            const originalHTML = copyButton.innerHTML;
            copyButton.innerHTML = `<i class="fas fa-check"></i><span>${t('warning.buttons.copied')}</span>`;
            copyButton.classList.add('copied');
            setTimeout(() => {
              copyButton.innerHTML = originalHTML;
              copyButton.classList.remove('copied');
            }, 2000);
          }
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
      },

      sendEmail(url: string) {
        const emailInput = document.getElementById('email-input') as HTMLInputElement;
        const email = emailInput ? emailInput.value.trim() : '';
        
        if (!email) {
          emailInput.classList.add('error');
          emailInput.focus();
          setTimeout(() => emailInput.classList.remove('error'), 2000);
          return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          emailInput.classList.add('error');
          emailInput.focus();
          setTimeout(() => emailInput.classList.remove('error'), 2000);
          return;
        }
        
        // Track button click
        
        const subject = encodeURIComponent(t('warning.email.subject'));
        const body = encodeURIComponent(t('warning.email.body').replace('{url}', url));
        
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        
        // Show success feedback
        const sendButton = document.querySelector('.mobile-warning-button.email-send');
        if (sendButton) {
          const originalHTML = sendButton.innerHTML;
          sendButton.innerHTML = `<i class="fas fa-check"></i><span>${t('warning.buttons.email_sent')}</span>`;
          sendButton.classList.add('sent');
          setTimeout(() => {
            sendButton.innerHTML = originalHTML;
            sendButton.classList.remove('sent');
          }, 2000);
        }
      }
    };

    // Expose to global scope
    (window as any).mobileDetector = mobileDetector;
    
    // Initialize
    mobileDetector.init();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('click', () => {});
    };
  }, [pathname]);

  return null;
}