
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SpecialtyBadgesProps {
  specialties: string[];
  limit?: number;
}

const SpecialtyBadges: React.FC<SpecialtyBadgesProps> = ({ specialties, limit = 3 }) => {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {specialties.slice(0, limit).map((specialty, i) => (
        <Badge key={i} variant="outline" className="text-xs">
          {specialty}
        </Badge>
      ))}
      {specialties.length > limit && (
        <Badge variant="outline" className="text-xs">
          +{specialties.length - limit} more
        </Badge>
      )}
    </div>
  );
};

export default SpecialtyBadges;
