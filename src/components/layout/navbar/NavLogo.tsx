
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const NavLogo = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <Link 
      to="/" 
      className={cn("flex items-center", isRTL && "flex-row-reverse")} 
      aria-label={t('common.home')}
    >
      <img 
        src="/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png" 
        alt={t('common.skinnect')} 
        className="h-8 md:h-10 object-contain"
      />
    </Link>
  );
};

export default NavLogo;
