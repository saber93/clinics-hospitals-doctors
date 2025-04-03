
import React from 'react';
import { Languages } from 'lucide-react';

interface DoctorLanguagesProps {
  languages: string[];
}

const DoctorLanguages: React.FC<DoctorLanguagesProps> = ({ languages }) => {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <Languages className="h-4 w-4 mr-1" />
      <span>{languages.join(', ')}</span>
    </div>
  );
};

export default DoctorLanguages;
