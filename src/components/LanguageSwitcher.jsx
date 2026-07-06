import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/utils/cn';
import classes from './LanguageSwitcher.module.css';

export function LanguageSwitcher({ className }) {
  const { i18n, t } = useTranslation();
  
  const currentLang = i18n.language || 'en';
  const targetLang = currentLang === 'en' ? 'ar' : 'en';
  const label = currentLang === 'en' ? 'العربية' : 'English';

  const toggleLanguage = () => {
    i18n.changeLanguage(targetLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(classes.switcher, className)}
      aria-label={t('aria.lang_switch')}
    >
      <Globe className={classes.icon} />
      <span className={classes.label}>{label}</span>
    </button>
  );
}
