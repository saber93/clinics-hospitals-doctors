
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface DoctorEducationProps {
  education: string;
}

const DoctorEducation: React.FC<DoctorEducationProps> = ({ education }) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <div className={cn(
      "flex items-center text-sm text-gray-500",
      isRTL && "flex-row-reverse"
    )}>
      <GraduationCap className={cn("h-4 w-4", isRTL ? "ml-1" : "mr-1")} />
      <span title={t('doctors.education')}>{education}</span>
    </div>
  );
};

export default DoctorEducation;
