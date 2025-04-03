
import React from 'react';
import { Calendar, Clock, Phone, Mail, Globe } from 'lucide-react';
import { Doctor } from '@/types/doctor';
import { Button } from '@/components/ui/button';

interface AppointmentInfoProps {
  doctor: Doctor;
  onBookAppointment: () => void;
}

const AppointmentInfo = ({ doctor, onBookAppointment }: AppointmentInfoProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Appointment Info</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="ml-3 text-gray-700">Available Mon-Fri</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-primary" />
          <span className="ml-3 text-gray-700">9:00 AM - 5:00 PM</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-primary" />
          <span className="ml-3 text-gray-700">(555) 123-4567</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-primary" />
          <span className="ml-3 text-gray-700">contact@example.com</span>
        </div>
        <div className="flex items-center">
          <Globe className="h-5 w-5 text-primary" />
          <span className="ml-3 text-gray-700">www.example.com</span>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Consultation Fee</span>
          <span className="font-bold">${doctor.consultationFee}</span>
        </div>
        
        {doctor.offerPercentage > 0 && (
          <div className="flex justify-between">
            <span className="font-medium text-primary">Discount</span>
            <span className="font-bold text-primary">{doctor.offerPercentage}% OFF</span>
          </div>
        )}
        
        <Button 
          className="w-full mt-4" 
          onClick={onBookAppointment}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default AppointmentInfo;
