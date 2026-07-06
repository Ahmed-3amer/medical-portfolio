import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import classes from './SectionHeader.module.css';

/**
 * Reusable Section Header Component
 * @param {Object} props
 * @param {string} props.titleKey - i18n key for the main title (required)
 * @param {string} props.subtitleKey - i18n key for the subtitle
 * @param {string} props.alignment - "center" | "start"
 * @param {string} props.theme - "light" | "dark"
 */
export function SectionHeader({
  titleKey,
  subtitleKey,
  alignment = 'center',
  theme = 'light',
  className
}) {
  const { t } = useTranslation();
  
  // Resolve translation (returns empty string if key is falsy but normally the key is provided)
  const title = t(titleKey);
  const subtitle = subtitleKey ? t(subtitleKey) : '';

  return (
    <div
      className={cn(
        classes.header,
        classes[`align-${alignment}`],
        classes[`theme-${theme}`],
        className
      )}
    >
      <h2 className={classes.title}>{title}</h2>
      {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
    </div>
  );
}
