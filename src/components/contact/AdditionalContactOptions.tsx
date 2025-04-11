
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext'; 
import { cn } from '@/lib/utils';

const AdditionalContactOptions = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <>
      <Card className="shadow-md border-none mb-6">
        <CardContent className="p-6">
          <div className={cn("flex items-start", isRTL && "flex-row-reverse text-right")}>
            <MessageSquare className={cn("h-5 w-5 text-gray-500 flex-shrink-0", isRTL ? "ml-3" : "mr-3")} />
            <div>
              <p className="font-semibold mb-1">{t('contact.helpCenter')}</p>
              <p className="text-sm text-gray-600">{t('contact.haveQuestions')}</p>
              <p className="text-sm text-gray-600 mt-1">{t('contact.messageHelp')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md border-none">
        <CardContent className="p-6">
          <h3 className={cn("text-lg font-semibold mb-3", isRTL && "text-right")}>{t('contact.followUs')}</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AdditionalContactOptions;
