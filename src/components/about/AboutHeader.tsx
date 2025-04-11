
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface AboutHeaderProps {
  ref: (el: HTMLElement | null) => void;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ ref }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <header className={cn("text-center mb-16", isRTL && "rtl-content")}>
      <div 
        className="fade-in-up" 
        ref={ref}
      >
        <h1 className="text-4xl font-bold text-gray-900">{t('about.title')}</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>
    </header>
  );
};

export default AboutHeader;
