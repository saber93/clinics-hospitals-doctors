
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations, getAvailableServices, createReservation } from "@/utils/reservationsData";

const Reservations = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Mock time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access reservations");
          return;
        }
        
        setUserId(session.user.id);
        
        // Get user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUserRole(profile.role);
        }
        
        // Get services
        const servicesData = await getAvailableServices();
        setServices(servicesData);
        
        // Get reservations
        if (session.user.id) {
          const role = profile?.role || 'client';
          const reservationsData = await getUserReservations(session.user.id, role);
          setReservations(reservationsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      // Get service details
      const service = services.find(s => s.id === selectedService);
      
      if (!service) {
        toast.error("Invalid service selected");
        return;
      }
      
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      // Create reservation
      await createReservation(
        userId,
        service.vendor_id,
        selectedService,
        formattedDate,
        selectedTimeSlot
      );
      
      toast.success("Appointment booked successfully!");
      
      // Reset form
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);
      setSelectedService(null);
      
      // Refresh reservations
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
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">{userType === "client" ? "Book an Appointment" : "Manage Appointments"}</h1>
        
        {userType === "client" ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
                <div className="space-y-4">
                  {services.map((service) => (
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
                  ))}
                  
                  {services.length === 0 && (
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-gray-500">No services available. Try seeding test data from the admin dashboard.</p>
                    </div>
                  )}
                </div>
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
                  <button 
                    className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition"
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTimeSlot || !selectedService}
                  >
                    Book Appointment
                  </button>
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
              <h2 className="text-xl font-semibold">Appointment Calendar</h2>
              <p className="text-gray-500">View and manage upcoming appointments</p>
            </div>
            <div className="p-6">
              {reservations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.clients?.name || 'Unknown Client'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.services?.name || 'Unknown Service'}</td>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-primary hover:text-primary/80 mr-2">Confirm</button>
                            <button className="text-red-500 hover:text-red-600">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No appointments scheduled yet</p>
                  {userType === "vendor" && (
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded">
                      Update Available Time Slots
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
