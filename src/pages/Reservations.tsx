
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations, getAvailableServices, createReservation } from "@/utils/reservations";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import ServiceSelection from "@/components/reservations/ServiceSelection";
import DateTimePicker from "@/components/reservations/DateTimePicker";
import BookingsList from "@/components/reservations/BookingsList";
import VendorPanel from "@/components/reservations/VendorPanel";
import LoadingState from "@/components/reservations/LoadingState";

const Reservations = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching user data and services...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access reservations");
          return;
        }
        
        setUserId(session.user.id);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUserRole(profile.role);
        }
        
        // Fetch available services
        console.log("Getting available services...");
        const servicesData = await getAvailableServices();
        console.log("Services data:", servicesData);
        setServices(servicesData);
        
        if (session.user.id) {
          const role = profile?.role || 'client';
          const reservationsData = await getUserReservations(session.user.id, role);
          setReservations(reservationsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load services data");
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
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
      
      if (userId && userRole) {
        const reservationsData = await getUserReservations(userId, userRole);
        setReservations(reservationsData);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment");
    }
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Book an Appointment</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/all-bookings')}
            className="flex items-center"
          >
            <List className="mr-2 h-4 w-4" />
            View All Bookings
          </Button>
        </div>
        
        {userType === "client" ? (
          <div className="bg-white rounded-lg shadow p-6">
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
            
            <BookingsList reservations={reservations} />
          </div>
        ) : (
          <VendorPanel />
        )}
      </div>
    </div>
  );
};

export default Reservations;
