
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Schedule appointments, manage reservations, and connect with healthcare providers all in one place.
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

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Online Booking</h3>
                <p className="text-gray-600">Schedule appointments with healthcare providers at your convenience, 24/7.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Health Records</h3>
                <p className="text-gray-600">Securely access and manage your health records and appointment history.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Telemedicine</h3>
                <p className="text-gray-600">Connect with healthcare providers through secure video consultations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
