/**
 * Utility to merge class names conditionally.
 * As per project constraints, we use a pure JS implementation instead of `clsx` or `tailwind-merge`.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ').trim();
}
