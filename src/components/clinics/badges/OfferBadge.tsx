
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface OfferBadgeProps {
  offerPercentage: number;
}

const OfferBadge: React.FC<OfferBadgeProps> = ({ offerPercentage }) => {
  if (offerPercentage <= 0) return null;
  
  return (
    <div className="absolute top-2 right-2">
      <Badge className="bg-primary text-white">
        {offerPercentage}% OFF
      </Badge>
    </div>
  );
};

export default OfferBadge;
