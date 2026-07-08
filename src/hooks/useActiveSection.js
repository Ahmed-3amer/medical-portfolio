import { useState, useEffect } from 'react';

/**
 * Determines which page section is currently in the viewport.
 * @param {string[]} sectionIds - Array of section id strings to observe
 * @returns {string} - The id of the currently active section
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35; // Dynamic offset (35% of viewport height)

      // Check if user is at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        const lastSection = sectionIds[sectionIds.length - 1];
        setActiveSection(lastSection);
        return;
      }

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    // Run once on load/mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
