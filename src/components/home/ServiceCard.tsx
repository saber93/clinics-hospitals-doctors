
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Layers } from 'lucide-react';

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
  
  // Render the icon based on what was provided
  const renderIcon = () => {
    // If a custom Icon component is provided, use it
    if (Icon) {
      return <Icon />;
    }
    
    // If an iconName is provided, look it up in LucideIcons
    if (iconName && typeof iconName === 'string') {
      // Type assertion to ensure TypeScript knows this is a valid component
      const IconComponent = (LucideIcons as any)[iconName];
      if (IconComponent) {
        return <IconComponent size={24} />;
      }
    }
    
    // Default fallback icon
    return <Layers size={24} />;
  };
  
  return (
    <div className={cn(
      "p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col", 
      isRTL && "text-right",
      isActive && "border-2 border-primary"
    )}>
      <div className="mb-4 text-primary">
        {renderIcon()}
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
