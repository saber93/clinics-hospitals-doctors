
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface OfferBadgeProps {
  offerPercentage: number;
  featured?: boolean;
}

const OfferBadge: React.FC<OfferBadgeProps> = ({ offerPercentage, featured = false }) => {
  if (offerPercentage <= 0) return null;
  
  return (
    <div className={`absolute top-2 ${featured ? 'left-24' : 'left-2'}`}>
      <Badge className="bg-primary text-white">
        {offerPercentage}% OFF
      </Badge>
    </div>
  );
};

export default OfferBadge;
