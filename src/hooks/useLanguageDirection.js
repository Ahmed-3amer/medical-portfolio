import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Synchronizes the html element's lang and dir attributes with the active language.
 * @returns {Object} { language: string, direction: string }
 */
export function useLanguageDirection() {
  const { i18n } = useTranslation();
  const language = i18n.language || 'en';
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return { language, direction };
}
