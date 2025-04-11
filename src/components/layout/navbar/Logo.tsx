
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const Logo: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Link to="/" className="flex items-center space-x-2" aria-label={t('common.home')}>
      <span className="font-semibold text-xl">{t('common.zames')}</span>
    </Link>
  );
};

export default Logo;
