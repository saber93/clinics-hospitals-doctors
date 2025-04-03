
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface DoctorEducationProps {
  education: string;
}

const DoctorEducation: React.FC<DoctorEducationProps> = ({ education }) => {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <GraduationCap className="h-4 w-4 mr-1" />
      <span>{education}</span>
    </div>
  );
};

export default DoctorEducation;
