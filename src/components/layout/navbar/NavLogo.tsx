
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

const NavLogo = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  
  console.log(`NavLogo rendering with language: ${language}, isRTL: ${isRTL}`);
  
  return (
    <Link to="/" className="flex items-center" aria-label={t('common.home')}>
      <img 
        src="/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png" 
        alt={t('common.skinnect')} 
        className="h-8 md:h-10 object-contain"
      />
      {/* Optional: display current language for debugging */}
      <span className="ml-2 text-xs text-muted-foreground">{language}</span>
    </Link>
  );
};

export default NavLogo;
