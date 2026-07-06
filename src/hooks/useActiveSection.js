import { useState, useEffect } from 'react';

/**
 * Determines which page section is currently in the viewport.
 * @param {string[]} sectionIds - Array of section id strings to observe
 * @returns {string} - The id of the currently active section
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      // Offset accounts for Navbar height; active when top portion is in upper 40% of viewport
      rootMargin: '-72px 0px -60% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      // Find all intersecting entries
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // If multiple sections intersect (fast scrolling), pick the one closest to the top
        const closest = visibleEntries.reduce((prev, curr) => {
          return (curr.boundingClientRect.top >= 0 && curr.boundingClientRect.top < prev.boundingClientRect.top) ? curr : prev;
        }, visibleEntries[0]);
        
        setActiveSection(closest.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
