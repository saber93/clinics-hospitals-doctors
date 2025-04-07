
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Update local state when language changes
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);
  
  const t = (key: string) => {
    if (!key) return '';
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Start with the language object
    let translation: any = translations[currentLanguage as keyof typeof translations];
    
    if (!translation) {
      // Fallback to English if the selected language doesn't exist
      console.warn(`Translation for language "${currentLanguage}" not found, using English as fallback.`);
      translation = translations.en;
    }
    
    // Traverse the object using the keys
    for (const k of keys) {
      if (!translation || !translation[k]) {
        // First try to find the key in English as fallback
        if (currentLanguage !== 'en') {
          let englishTranslation = translations.en;
          let found = true;
          
          for (const fallbackKey of keys) {
            if (!englishTranslation || !englishTranslation[fallbackKey]) {
              found = false;
              break;
            }
            englishTranslation = englishTranslation[fallbackKey];
          }
          
          if (found) {
            return englishTranslation;
          }
        }
        
        // If still not found, return the key and log a warning
        console.warn(`Translation key "${key}" not found in language "${currentLanguage}"`);
        return key;
      }
      translation = translation[k];
    }
    
    return translation;
  };
  
  return { t, currentLanguage };
}
