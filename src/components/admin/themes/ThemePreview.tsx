
import React from 'react';
import { SpecialtyTheme } from '@/utils/clinics/specialtyThemes';
import { Card } from '@/components/ui/card';
import { Clinic } from '@/types/clinic';
import { Doctor } from '@/types/doctor';
import { Star, MapPin, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ThemePreviewProps {
  theme: SpecialtyTheme;
  entityType: 'clinics' | 'doctors' | 'hospitals';
  entity: any;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, entityType, entity }) => {
  // Safely get the icon component by name, fallback to Activity if not found
  const getIconComponent = () => {
    const iconName = theme.icon;
    // For icons with lowercase names in our system, convert first letter to uppercase for Lucide
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    
    // Get the icon component from Lucide
    return (LucideIcons as any)[formattedIconName] || LucideIcons.Activity;
  };
  
  const IconComponent = getIconComponent();
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Preview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Preview */}
        <div>
          <h3 className="text-sm font-medium mb-3">Card Style</h3>
          <Card className={`p-4 ${theme.cardStyle}`}>
            <div className="flex gap-4">
              <div 
                className={`${theme.gradientStyle} flex items-center justify-center rounded-lg w-16 h-16 shrink-0 text-white`}
              >
                <IconComponent className="h-8 w-8" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-semibold">{entity.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{entity.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{entity.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-xs text-muted-foreground">(120 reviews)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Button Preview */}
        <div>
          <h3 className="text-sm font-medium mb-3">Button Styles</h3>
          <div className="space-y-3">
            <button
              className={`w-full py-2 px-4 ${theme.gradientStyle} text-white rounded-md flex items-center justify-center gap-2`}
            >
              <IconComponent className="h-4 w-4" />
              Book Now
            </button>
            
            <button
              className={`w-full py-2 px-4 border text-${theme.primaryColor} border-${theme.primaryColor} bg-transparent rounded-md`}
            >
              View Details
            </button>
            
            <div className={`p-4 rounded-md bg-${theme.primaryColor}/10`}>
              <div className="flex items-center gap-2">
                <Users className={`h-5 w-5 text-${theme.primaryColor}`} />
                <div>
                  <p className="text-sm font-medium">Special Offer</p>
                  <p className="text-xs">Save 20% on your first visit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Header Style</h3>
        <div className={`${theme.gradientStyle} p-6 rounded-lg text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <IconComponent className="h-6 w-6" />
            <h2 className="text-xl font-bold">{entity.name}</h2>
          </div>
          <p className="max-w-md">{entity.description}</p>
          <div className="flex items-center gap-2 mt-2 text-white/80 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{entity.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
