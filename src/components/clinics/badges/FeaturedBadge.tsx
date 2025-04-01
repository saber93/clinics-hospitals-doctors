
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FeaturedBadgeProps {
  featured: boolean;
}

const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({ featured }) => {
  if (!featured) return null;
  
  return (
    <div className="absolute top-2 left-2">
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300">
        Featured
      </Badge>
    </div>
  );
};

export default FeaturedBadge;
