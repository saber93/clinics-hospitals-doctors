
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface DoctorSpecialtiesProps {
  specialties: string[];
  limit?: number;
}

const DoctorSpecialties: React.FC<DoctorSpecialtiesProps> = ({ specialties, limit = 3 }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {specialties?.slice(0, limit).map((specialty, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {specialty}
        </Badge>
      ))}
    </div>
  );
};

export default DoctorSpecialties;
