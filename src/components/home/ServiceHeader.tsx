
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceHeaderProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

const ServiceHeader = ({ scrollPrev, scrollNext }: ServiceHeaderProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className="mb-12">
      <div className={cn("flex justify-between items-end", isRTL && "flex-row-reverse")}>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.sectionTitle')}</h2>
          <p className="text-lg text-gray-600">{t('services.sectionDescription')}</p>
        </div>
        
        <div className={cn("flex space-x-2", isRTL && "flex-row-reverse space-x-reverse")}>
          <button 
            onClick={scrollPrev} 
            className="p-2 rounded-full border hover:bg-gray-100 text-gray-700"
            aria-label={t('common.previous')}
          >
            {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <button 
            onClick={scrollNext} 
            className="p-2 rounded-full border hover:bg-gray-100 text-gray-700"
            aria-label={t('common.next')}
          >
            {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;
