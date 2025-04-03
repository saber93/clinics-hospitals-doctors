
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '@/types/doctor';

interface DoctorAboutProps {
  doctor: Doctor;
}

const DoctorAbout = ({ doctor }: DoctorAboutProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-gray-700">{doctor.description}</p>
      
      {/* Specialties */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {doctor.specialties?.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAbout;
