/**
 * Smooth scroll utility with customizable duration and easing
 */

/**
 * Smoothly scroll to a target position with custom duration
 * @param targetY - Target vertical position
 * @param duration - Animation duration in milliseconds (default: 1000ms)
 * @returns Function to cancel the animation
 */
export function smoothScrollTo(targetY: number, duration: number = 1000): () => void {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();
  let animationId: number;

  // Easing function for smooth acceleration and deceleration
  function easeInOutCubic(t: number): number {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + distance * eased);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  }

  animationId = requestAnimationFrame(animate);

  // Return cancel function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

/**
 * Scroll to an element with offset and custom duration
 * @param element - Target element
 * @param offset - Offset from top (default: 80px for header)
 * @param duration - Animation duration in milliseconds (default: 1000ms)
 */
export function scrollToElement(
  element: HTMLElement, 
  offset: number = 80, 
  duration: number = 1000
): void {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  smoothScrollTo(offsetPosition, duration);
}