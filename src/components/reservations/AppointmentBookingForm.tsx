
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createReservation } from "@/utils/reservations";
import ServiceSelection from "@/components/reservations/ServiceSelection";
import DateTimePicker from "@/components/reservations/DateTimePicker";

interface AppointmentBookingFormProps {
  services: any[];
  clinicId?: string;
  clinicName?: string;
  userId: string;
  userRole: string | null;
  onBookingComplete: () => void;
  error: string | null;
}

const AppointmentBookingForm = ({ 
  services, 
  clinicId,
  clinicName,
  userId,
  userRole,
  onBookingComplete,
  error
}: AppointmentBookingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(
    clinicId && services.length > 0 ? services[0].id : null
  );
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedService || !userId) {
      toast.error("Please select a date, time and service");
      return;
    }
    
    try {
      const service = services.find(s => s.id === selectedService);
      
      if (!service) {
        toast.error("Invalid service selected");
        return;
      }
      
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      await createReservation(
        userId,
        service.vendor_id,
        selectedService,
        formattedDate,
        selectedTimeSlot
      );
      
      toast.success("Appointment booked successfully!");
      
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);
      setSelectedService(null);
      
      onBookingComplete();
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      toast.error(error.message || "Failed to book appointment");
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ServiceSelection 
        services={services}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        error={error}
      />
      
      <DateTimePicker 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        timeSlots={timeSlots}
        handleBookAppointment={handleBookAppointment}
        selectedService={selectedService}
      />
    </div>
  );
};

export default AppointmentBookingForm;
