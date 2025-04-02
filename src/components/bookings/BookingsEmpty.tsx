
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BookingsEmptyProps {
  activeTab: string;
}

const BookingsEmpty: React.FC<BookingsEmptyProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  
  return (
    <div className="py-8 text-center">
      <p className="text-muted-foreground mb-4">No {activeTab === 'all' ? '' : activeTab} bookings found</p>
      <Button onClick={() => navigate('/reservations')}>
        Book an Appointment
      </Button>
    </div>
  );
};

export default BookingsEmpty;
