
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto bg-primary/90 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className={cn("text-center", isRTL && "rtl-content")}>
          <h2 className="text-3xl md:text-4xl font-bold">{t('home.transformHealthcare')}</h2>
          <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto">
            {t('home.joinThousands')}
          </p>
          <div className="mt-8">
            <Button 
              variant="secondary" 
              size="lg" 
              className="font-semibold shadow-lg"
              onClick={() => navigate('/register')}
            >
              {t('home.getStartedToday')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
