
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative mb-12 lg:mb-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt={t('about.subtitle')} 
                className="rounded-lg shadow-xl object-cover w-full h-[600px]"
              />
              
              <div className="absolute bottom-[-30px] right-0 bg-black text-white p-10 w-[300px] md:w-[350px] rounded-lg shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {t('about.guaranteesTitle')}
                </h3>
                <p className="text-xl md:text-2xl font-semibold">
                  {t('about.guaranteesSubtitle')}
                </p>
              </div>
            </div>
          </div>
          
          <div className={cn("lg:w-1/2 lg:pl-16", isRTL && "lg:pr-16 lg:pl-0")}>
            <div className="mb-3 text-gray-500 uppercase tracking-wider font-medium">
              {t('about.corporateService')}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
              {t('about.newTitle')}
            </h2>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-primary font-bold mr-3">01.</span> 
                  {t('about.benefit1')}
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-primary font-bold mr-3">02.</span> 
                  {t('about.benefit2')}
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-primary font-bold mr-3">03.</span> 
                  {t('about.benefit3')}
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-baseline">
                  <span className="text-primary font-bold mr-3">04.</span> 
                  {t('about.benefit4')}
                </h3>
                <div className="mt-2 w-full h-px bg-gray-200"></div>
              </div>
            </div>
            
            <div className="mt-12">
              <Button 
                onClick={() => navigate('/about')} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-md"
                size="lg"
              >
                {t('common.about')}
                {!isRTL && <ChevronRight className="ml-2 h-5 w-5" />}
                {isRTL && <ChevronRight className="mr-2 h-5 w-5 rotate-180" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
