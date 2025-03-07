
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations, getAvailableServices, createReservation } from "@/utils/reservationsData";
import { Button } from "@/components/ui/button";
import { List, CalendarCheck, AlertCircle } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-lg">Loading services...</p>
        </div>
      </div>
    );
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
              <div>
                <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
                {error ? (
                  <div className="p-4 border rounded-lg bg-red-50 text-red-700 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Error loading services</p>
                      <p className="text-sm">{error}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => window.location.reload()}
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <div 
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer ${selectedService === service.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{service.name}</h3>
                            <span className="text-primary font-medium">${service.price}</span>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{service.duration} minutes</p>
                          <p className="text-gray-500 text-sm mt-1">Provider: {service.vendors?.name || 'Unknown'}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 border rounded-lg text-center">
                        <p className="text-gray-500">No services available. Try seeding test data from the admin dashboard.</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate('/dashboard')}
                        >
                          Go to Dashboard
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    id="date"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                
                {selectedDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          className={`p-2 text-sm border rounded ${selectedTimeSlot === time ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary/50'}`}
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8">
                  <Button
                    className="w-full"
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTimeSlot || !selectedService}
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
            
            {reservations.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.services?.name || 'Unknown Service'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.vendors?.name || 'Unknown Provider'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(reservation.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'}`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Appointment Management</h2>
              <p className="text-gray-500">Manage your availability and appointment settings</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <CalendarCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Your Appointments</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Set your available time slots, services, and manage incoming appointments
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => navigate('/all-bookings')}>
                    View All Bookings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
