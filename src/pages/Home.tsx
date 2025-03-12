
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Our Booking System
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Schedule appointments, manage reservations, and more.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Button
                className="w-full flex items-center justify-center px-8 py-3"
                onClick={() => navigate('/reservations')}
              >
                Book an Appointment
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button
                className="w-full flex items-center justify-center px-8 py-3"
                variant="outline"
                onClick={() => navigate('/clinics')}
              >
                View Clinics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
