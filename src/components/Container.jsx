import React from 'react';
import { cn } from '@/utils/cn';
import classes from './Container.module.css';

/**
 * A responsive layout wrapper that constrains its children to a max width
 * and provides consistent horizontal padding.
 */
export function Container({ children, className, ...props }) {
  return (
    <div className={cn(classes.container, className)} {...props}>
      {children}
    </div>
  );
}
