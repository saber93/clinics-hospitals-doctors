
import React from 'react';
import RatingDisplay from '../../clinics/display/RatingDisplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DoctorRatingDisplayProps {
  rating: number;
  reviews: number;
  compact?: boolean;
}

const DoctorRatingDisplay: React.FC<DoctorRatingDisplayProps> = ({ rating, reviews, compact = false }) => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={cn(isRTL && "flex flex-row-reverse")}>
      <RatingDisplay rating={rating} reviews={reviews} compact={compact} />
    </div>
  );
};

export default DoctorRatingDisplay;
