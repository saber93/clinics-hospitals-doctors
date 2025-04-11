
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className={cn("max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12", isRTL && "rtl-content")}>
        <div className="lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
            alt={t('about.subtitle')} 
            className="rounded-lg shadow-xl object-cover h-[500px] w-full"
          />
          <div className={cn(
            "absolute bottom-0 transform translate-y-1/4 bg-black text-white p-8 rounded-lg shadow-xl inline-block",
            language === 'en' ? "left-0 lg:translate-x-1/4" : "right-0 lg:-translate-x-1/4"
          )}>
            <h3 className="text-2xl md:text-3xl font-bold flex flex-col">
              <span>{t('about.ourBusinessModel')}</span>
              <span>{t('about.strategicPartnerships')}</span>
              <span>{t('about.performanceBasedCompensation')}</span>
            </h3>
          </div>
        </div>
        
        <div className={cn("lg:w-1/2 pl-5", isRTL && "pr-5 pl-0")}>
          <div className="mb-2 text-gray-500 uppercase tracking-wider font-medium">{t('about.aboutCompany')}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
            {t('about.title')}
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">01.</span> 
                {t('about.companyDescription')}
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">02.</span> 
                {t('about.businessModelDescription')}
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">03.</span> 
                {t('about.strategicPartnershipsDescription')}
              </h3>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold flex items-baseline gap-2">
                <span className="text-primary font-bold">04.</span> 
                {t('about.performanceBasedCompensationDescription')}
              </h3>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={() => navigate('/about')} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded"
              size="lg"
            >
              {t('common.about')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
