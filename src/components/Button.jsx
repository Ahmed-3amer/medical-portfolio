import React from 'react';
import { cn } from '@/utils/cn';
import classes from './Button.module.css';

/**
 * Reusable Button Component
 * @param {Object} props
 * @param {string} props.variant - "primary" | "secondary" | "ghost"
 * @param {boolean} props.disabled - disabled state
 * @param {React.ReactNode} props.icon - optional icon component to render
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  disabled = false,
  className,
  icon,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        classes.button,
        classes[`variant-${variant}`],
        className
      )}
      {...props}
    >
      {icon && <span className={classes.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
