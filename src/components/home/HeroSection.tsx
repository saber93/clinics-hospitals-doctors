
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={cn("grid md:grid-cols-2 gap-12 items-center", isRTL && "md:grid-flow-col")}>
          <div className={cn("", isRTL && "text-right")}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              <span className="block">{t('home.marketingDeserves')}</span>
              <span className="block text-orange-500">{t('home.expertCare')}</span>
            </h1>
            <div className={cn("flex items-center mb-6", isRTL && "flex-row-reverse justify-end")}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <span className={cn("text-gray-700 dark:text-gray-300", isRTL ? "mr-2" : "ml-2")}>
                {t('home.trustedByPatients')}
              </span>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('home.companyDescription')}
            </p>
            <div className={cn("flex space-x-4", isRTL && "space-x-reverse")}>
              <Button 
                size="lg" 
                onClick={() => navigate('/clinics')}
                className="px-8"
              >
                {t('home.getStarted')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/about')}
              >
                {t('home.learnMore')}
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <img 
              src="/lovable-uploads/f538345f-52aa-4960-a4a2-c377edde5280.png" 
              alt="Hero" 
              className="max-w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
