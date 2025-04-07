
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    console.log(`Switching language from ${language} to ${newLanguage}`);
    setLanguage(newLanguage);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Languages className="h-5 w-5" />
      <span className="ml-2 text-xs font-bold">{language === 'en' ? 'AR' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
