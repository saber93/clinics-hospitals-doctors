
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";

const Reservations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { session, user } = useAuth();
  
  const clinicId = location.state?.clinicId;
  const clinicName = location.state?.clinicName;
  
  const userType = searchParams.get("userType") || "client";
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if we have a session
        if (!session || !user) {
          console.log("No session or user found, redirecting to login");
          toast.error("Please login to book appointments");
          navigate("/login");
          return;
        }
        
        console.log('User logged in:', user.id);
        
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          console.log('User role:', profile.role);
          setUserRole(profile.role);
        }
        
        // Get available services
        console.log('Fetching services...');
        const servicesData = await getAvailableServices();
        console.log('Services fetched:', servicesData.length);
        
        // Filter by clinic if needed
        const filteredServices = clinicId 
          ? servicesData.filter(service => service.vendor_id === clinicId)
          : servicesData;
          
        setServices(filteredServices);
        
        if (clinicId && filteredServices.length > 0) {
          setSelectedService(filteredServices[0].id);
          toast.success(`Booking appointment at ${clinicName}`);
        }
        
        // Get user reservations
        if (user.id && profile?.role) {
          console.log('Fetching reservations...');
          const reservationsData = await getUserReservations(user.id, profile.role);
          console.log('Reservations fetched:', reservationsData.length);
          setReservations(reservationsData);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load services data");
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [clinicId, clinicName, navigate, session, user]);
  
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedService || !user?.id) {
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
        user.id,
        service.vendor_id,
        selectedService,
        formattedDate,
        selectedTimeSlot
      );
      
      toast.success("Appointment booked successfully!");
      
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);
      setSelectedService(null);
      
      if (user.id && userRole) {
        const reservationsData = await getUserReservations(user.id, userRole);
        setReservations(reservationsData);
      }
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      toast.error(error.message || "Failed to book appointment");
    }
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!session || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-6">Please log in to book appointments.</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {clinicName ? `Book at ${clinicName}` : "Book an Appointment"}
          </h1>
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
