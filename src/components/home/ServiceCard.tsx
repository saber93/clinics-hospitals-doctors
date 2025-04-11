
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.FC;
  iconName?: string;
}

const ServiceCard = ({ title, description, icon: Icon, iconName }: ServiceCardProps) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  let IconComponent: React.ReactNode = null;
  
  if (Icon) {
    IconComponent = <Icon />;
  } else if (iconName && LucideIcons[iconName as keyof typeof LucideIcons]) {
    const DynamicIcon = LucideIcons[iconName as keyof typeof LucideIcons];
    IconComponent = <DynamicIcon size={24} />;
  } else {
    // Default icon if none provided
    const DefaultIcon = LucideIcons.Layers;
    IconComponent = <DefaultIcon size={24} />;
  }
  
  return (
    <div className={cn("p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col", 
                      isRTL && "text-right")}>
      <div className="mb-4 text-primary">
        {IconComponent}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      <button className={cn("text-primary font-medium mt-4 hover:underline flex items-center", 
                         isRTL ? "justify-end" : "justify-start")}>
        {t('common.readMore')} 
        {isRTL ? (
          <LucideIcons.ChevronLeft size={16} className="ml-1" />
        ) : (
          <LucideIcons.ChevronRight size={16} className="ml-1" />
        )}
      </button>
    </div>
  );
};

export default ServiceCard;
