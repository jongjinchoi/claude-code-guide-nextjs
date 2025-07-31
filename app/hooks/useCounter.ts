'use client';

import { useEffect, useRef, useCallback } from 'react';

interface CounterOptions {
  duration?: number;
  easing?: 'linear' | 'easeOut';
}

export function useCounter() {
  const animationRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animate = useCallback((elementId: string, target: number, options: CounterOptions = {}) => {
    const { duration = 2000 } = options;
    const element = document.getElementById(elementId);
    if (!element) return;

    // Cancel any existing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    intervalRef.current = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }, []);

  const animateFromCurrent = useCallback((elementId: string, target: number, options: CounterOptions = {}) => {
    const { duration = 2000, easing = 'easeOut' } = options;
    const element = document.getElementById(elementId);
    if (!element) return;

    // Cancel any existing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Get current value
    const currentText = element.textContent?.replace(/[^0-9]/g, '') || '0';
    const start = parseInt(currentText) || 0;

    // Skip if already at target
    if (start === target) return;

    const startTime = performance.now();
    const difference = target - start;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let easedProgress = progress;
      if (easing === 'easeOut') {
        // easeOutQuad
        easedProgress = progress * (2 - progress);
      }

      const current = start + (difference * easedProgress);
      element.textContent = Math.floor(current).toLocaleString();

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(updateCounter);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    animate,
    animateFromCurrent
  };
}