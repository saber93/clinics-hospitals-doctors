
import React from 'react';
import { Award, Clock, Languages } from 'lucide-react';
import { Doctor } from '@/types/doctor';

interface DoctorExperienceProps {
  doctor: Doctor;
}

const DoctorExperience = ({ doctor }: DoctorExperienceProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Education & Experience</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Award className="h-5 w-5 text-primary mt-1" />
          <div className="ml-3">
            <h3 className="font-medium">Education</h3>
            <p className="text-gray-700">{doctor.education}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-primary mt-1" />
          <div className="ml-3">
            <h3 className="font-medium">Experience</h3>
            <p className="text-gray-700">{doctor.experience} years</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Languages className="h-5 w-5 text-primary mt-1" />
          <div className="ml-3">
            <h3 className="font-medium">Languages</h3>
            <p className="text-gray-700">{doctor.languages?.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorExperience;
