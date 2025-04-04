
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: string) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Start with the language object
    let translation: any = translations[language as keyof typeof translations];
    
    // Traverse the object using the keys
    for (const k of keys) {
      if (!translation || !translation[k]) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        // Return the key if translation is not found
        return key;
      }
      translation = translation[k];
    }
    
    return translation;
  };
  
  return { t, language };
}
