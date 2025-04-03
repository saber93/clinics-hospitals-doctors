
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DoctorNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Doctor Not Found</h1>
      <p className="text-gray-600 mb-8">The doctor you are looking for does not exist or has been removed.</p>
      <Button onClick={() => navigate('/doctors')}>
        View All Doctors
      </Button>
    </div>
  );
};

export default DoctorNotFound;
