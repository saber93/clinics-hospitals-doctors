
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HospitalsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Find Top Healthcare Facilities</h1>
        <p className="mt-2 text-gray-600">Discover and connect with leading hospitals and medical centers</p>
      </div>
      <Button 
        onClick={() => navigate('/reservations')}
        className="mt-4 md:mt-0"
      >
        Schedule an Appointment
      </Button>
    </div>
  );
};

export default HospitalsHeader;
