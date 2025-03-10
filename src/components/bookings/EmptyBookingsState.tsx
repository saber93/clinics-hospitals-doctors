
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EmptyBookingsStateProps {
  activeFilter: string;
}

const EmptyBookingsState: React.FC<EmptyBookingsStateProps> = ({ activeFilter }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <Calendar className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeFilter !== 'all' ? activeFilter : ''} bookings found</h3>
      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        {activeFilter === 'all' 
          ? "You don't have any bookings yet. Book an appointment to get started."
          : activeFilter === 'pending'
          ? "You don't have any pending bookings awaiting confirmation."
          : activeFilter === 'confirmed'
          ? "You don't have any confirmed upcoming appointments."
          : "You don't have any completed past appointments."}
      </p>
      <Button 
        variant="default" 
        className="mt-2"
        onClick={() => navigate('/reservations')}
      >
        Book an Appointment
      </Button>
    </div>
  );
};

export default EmptyBookingsState;
