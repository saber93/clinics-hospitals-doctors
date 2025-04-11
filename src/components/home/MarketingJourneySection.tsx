
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const MarketingJourneySection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-gray-500 uppercase tracking-wider mb-3">{t('home.journeyTitle')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">{t('home.realMarketing')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {t('home.journeyDescription')}
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/about')}
            className="rounded-md"
          >
            {t('common.readMore')} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="mt-20">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-0.5 h-full bg-gray-200"></div>
            </div>
            
            {/* Timeline items */}
            <div className="relative z-10 space-y-24">
              {/* 2012 */}
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("w-1/2", isRTL && "text-right")}>
                  <div className={cn("max-w-sm", isRTL ? "ml-auto mr-8" : "mr-auto ml-8")}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('home.ourBeginning')}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{t('home.year2012')}</p>
                    <p className="text-gray-600 mb-3">{t('home.fashionIndustry')}</p>
                    <p className="text-gray-700">{t('home.startingPoint')}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
              
              {/* 2020 */}
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className="w-1/2"></div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className={cn("w-1/2", isRTL && "text-right")}>
                  <div className={cn("max-w-sm", isRTL ? "mr-auto ml-8" : "ml-auto mr-8")}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('home.marketingTransformation')}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{t('home.year2020')}</p>
                    <p className="text-gray-600 mb-3">{t('home.selfMarketing')}</p>
                    <p className="text-gray-700">{t('home.inHouseTeam')}</p>
                  </div>
                </div>
              </div>
              
              {/* 2022 */}
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("w-1/2", isRTL && "text-right")}>
                  <div className={cn("max-w-sm", isRTL ? "ml-auto mr-8" : "mr-auto ml-8")}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('home.industryExpansion')}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{t('home.year2022')}</p>
                    <p className="text-gray-600 mb-3">{t('home.healthcareMarketing')}</p>
                    <p className="text-gray-700">{t('home.revolutionizing')}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
              
              {/* 2025 */}
              <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className="w-1/2"></div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className={cn("w-1/2", isRTL && "text-right")}>
                  <div className={cn("max-w-sm", isRTL ? "mr-auto ml-8" : "ml-auto mr-8")}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('home.founded')}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{t('home.year2025')}</p>
                    <p className="text-gray-600 mb-3">{t('home.performanceBased')}</p>
                    <p className="text-gray-700">{t('home.dataModel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingJourneySection;
