
import React from 'react';
import { MapPin } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DoctorHeaderProps {
  doctor: Doctor;
  handleBookAppointment: () => void;
}

const DoctorHeader = ({ doctor, handleBookAppointment }: DoctorHeaderProps) => {
  const handleContactDoctor = () => {
    toast.success("Contact request sent to the doctor");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img 
            className="h-56 w-full object-cover md:w-56" 
            src={doctor.imageUrl || 'https://via.placeholder.com/300'} 
            alt={doctor.name} 
          />
        </div>
        <div className="p-8 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="mt-2 text-xl text-primary">{doctor.specialty} • {doctor.subSpecialty}</p>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(doctor.rating || 0) ? 'fill-current' : 'fill-gray-300'}`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{doctor.rating} ({doctor.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center mt-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="ml-2 text-gray-600">{doctor.location}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                className="px-6" 
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                className="px-6"
                onClick={handleContactDoctor}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
