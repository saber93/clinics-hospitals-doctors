
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const NavLogo = () => {
  const { t } = useTranslation();
  
  return (
    <Link to="/" className="flex items-center" aria-label={t('common.home')}>
      <img 
        src="/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png" 
        alt={t('about.title')} 
        className="h-8 md:h-10 object-contain"
      />
    </Link>
  );
};

export default NavLogo;
