import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Re-exports Framer Motion's built-in useReducedMotion hook.
 * Returns true if the user has enabled prefers-reduced-motion in their OS settings.
 */
export function useReducedMotion() {
  return useFramerReducedMotion();
}
