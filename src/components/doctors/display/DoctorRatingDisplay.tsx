
import React from 'react';
import RatingDisplay from '../../clinics/display/RatingDisplay';

interface DoctorRatingDisplayProps {
  rating: number;
  reviews: number;
  compact?: boolean;
}

const DoctorRatingDisplay: React.FC<DoctorRatingDisplayProps> = ({ rating, reviews, compact = false }) => {
  return <RatingDisplay rating={rating} reviews={reviews} compact={compact} />;
};

export default DoctorRatingDisplay;
