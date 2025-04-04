
import React from 'react';
import LocationDisplay from '../../clinics/display/LocationDisplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DoctorLocationDisplayProps {
  location: string;
}

const DoctorLocationDisplay: React.FC<DoctorLocationDisplayProps> = ({ location }) => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={cn("flex items-center", isRTL && "flex-row-reverse")}>
      <LocationDisplay location={location} />
    </div>
  );
};

export default DoctorLocationDisplay;
