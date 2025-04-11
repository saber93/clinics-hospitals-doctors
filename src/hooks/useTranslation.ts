
import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = useCallback((key: string): string => {
    if (!key) return '';
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Get the appropriate language object, or fallback to English
    let translationObj: any = translations[language as keyof typeof translations] || translations.en;
    
    // Check if the key exists in the glossary first (for overrides)
    const glossaryKey = `glossary.${key}`;
    const glossaryParts = glossaryKey.split('.');
    let glossaryObj = translationObj;
    let glossaryExists = true;
    
    // Check if key exists in glossary
    for (const gKey of glossaryParts) {
      if (!glossaryObj || typeof glossaryObj[gKey] === 'undefined') {
        glossaryExists = false;
        break;
      }
      glossaryObj = glossaryObj[gKey];
    }
    
    // Return glossary override if it exists
    if (glossaryExists && typeof glossaryObj === 'string') {
      return glossaryObj;
    }
    
    // Deep access for nested keys in main translations
    let currentObj = translationObj;
    for (const k of keys) {
      if (!currentObj || typeof currentObj[k] === 'undefined') {
        // Key not found in current language, try English fallback
        if (language !== 'en') {
          let englishObj = translations.en;
          let englishKeyExists = true;
          
          // Check if key exists in English
          for (const fallbackKey of keys) {
            if (!englishObj || typeof englishObj[fallbackKey] === 'undefined') {
              englishKeyExists = false;
              break;
            }
            englishObj = englishObj[fallbackKey];
          }
          
          if (englishKeyExists) {
            console.log(`Translation key "${key}" not found in "${language}", using English fallback.`);
            return typeof englishObj === 'string' ? englishObj : key;
          }
        }
        
        // Key not found in current language or English fallback
        console.warn(`Translation key "${key}" not found in language "${language}"`);
        return key;
      }
      currentObj = currentObj[k];
    }
    
    return typeof currentObj === 'string' ? currentObj : key;
  }, [language]);
  
  return { t, currentLanguage: language };
}
