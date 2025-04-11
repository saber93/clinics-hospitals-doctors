
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
  isActive?: boolean;
}

const ServiceCard = ({ title, description, icon: Icon, iconName, isActive }: ServiceCardProps) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  let IconComponent: React.ReactNode = null;
  
  if (Icon) {
    IconComponent = <Icon />;
  } else if (iconName && LucideIcons[iconName as keyof typeof LucideIcons]) {
    // Fix: Don't try to use DynamicIcon as a component directly
    // Instead, get the actual component from LucideIcons
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return (
      <div className={cn(
        "p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col", 
        isRTL && "text-right",
        isActive && "border-2 border-primary"
      )}>
        <div className="mb-4 text-primary">
          <IconComponent size={24} />
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
  }
  
  // If we reached here, either there is an Icon prop or no valid icon, use the original return
  return (
    <div className={cn(
      "p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col", 
      isRTL && "text-right",
      isActive && "border-2 border-primary"
    )}>
      <div className="mb-4 text-primary">
        {IconComponent || <LucideIcons.Layers size={24} />}
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
