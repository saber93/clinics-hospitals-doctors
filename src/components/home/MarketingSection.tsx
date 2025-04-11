
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MarketingSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className={cn("text-center mb-12", isRTL && "rtl-content")}>
          <p className="text-gray-500 uppercase tracking-wider mb-3">{t('home.marketLeaders')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t('home.boostBrand')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-orange-500 text-xl font-semibold">{i < 10 ? `0${i}` : i}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t(`marketing.strategy${i}Title`)}</h3>
              <p className="text-gray-600 mb-6">{t(`marketing.strategy${i}Description`)}</p>
              <a 
                href="#" 
                className={cn("text-orange-500 font-medium flex items-center", 
                  isRTL ? "flex-row-reverse" : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/services');
                }}
              >
                {t('common.readMore')}
                <span className={cn("text-xl", isRTL ? "mr-2 rotate-180" : "ml-2")}>→</span>
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => navigate('/services')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
          >
            {t('common.services')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
