
import React from 'react';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import AdditionalContactOptions from '@/components/contact/AdditionalContactOptions';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Contact = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", isRTL && "rtl-content")}>
        <h1 className="text-3xl font-bold">{t('contact.title')}</h1>
        <p className="mt-4 text-gray-600">{t('contact.subtitle')}</p>
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          
          <div>
            <ContactInfo />
            <AdditionalContactOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
