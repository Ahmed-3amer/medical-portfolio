import { useState, useEffect } from 'react';

/**
 * Tracks whether the user has scrolled past a defined threshold.
 * @param {number} threshold - Scroll threshold in pixels (default: 80)
 * @returns {boolean} - true if window.scrollY > threshold
 */
export function useScrollPosition(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
