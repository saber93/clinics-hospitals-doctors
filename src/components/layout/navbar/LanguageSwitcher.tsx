
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className="flex items-center gap-1"
    >
      <Languages className="h-5 w-5" />
      <span className="text-xs font-bold">{language === 'en' ? 'AR' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
