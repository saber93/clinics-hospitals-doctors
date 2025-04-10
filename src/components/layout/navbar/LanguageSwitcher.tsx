
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
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className="flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary"
    >
      <Languages className="h-4 w-4" />
      <span className="font-bold">{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
