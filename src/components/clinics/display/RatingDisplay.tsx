
import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviews: number;
  compact?: boolean;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating, reviews, compact = false }) => {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-xs text-muted-foreground ml-1">
        ({reviews}{!compact && ' reviews'})
      </span>
    </div>
  );
};

export default RatingDisplay;
