
import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface DoctorLanguagesProps {
  languages: string[];
}

const DoctorLanguages: React.FC<DoctorLanguagesProps> = ({ languages }) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <div className={cn(
      "flex items-center text-sm text-gray-500",
      isRTL && "flex-row-reverse"
    )}>
      <Languages className={cn("h-4 w-4", isRTL ? "ml-1" : "mr-1")} />
      <span title={t('doctors.languages')}>{languages.join(', ')}</span>
    </div>
  );
};

export default DoctorLanguages;
