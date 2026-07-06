import React from 'react';
import { cn } from '@/utils/cn';
import classes from './Card.module.css';

/**
 * Reusable Card Component
 * @param {Object} props
 * @param {string} props.variant - "default" | "flat"
 * @param {boolean} props.hoverable - Applies hover lift effect
 */
export function Card({
  children,
  variant = 'default',
  hoverable = false,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        classes.card,
        classes[`variant-${variant}`],
        hoverable && classes.hoverable,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
