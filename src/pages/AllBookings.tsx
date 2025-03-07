
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations } from "@/utils/reservationsData";
import { Button } from "@/components/ui/button";
import { Calendar, List, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

const AllBookings = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data and reservations...");
        
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access bookings");
          setLoading(false);
          return;
        }
        
        const currentUserId = session.user.id;
        setUserId(currentUserId);
        console.log("Current user ID:", currentUserId);
        
        // Get user role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUserId)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Error loading user profile");
          setLoading(false);
          return;
        }
        
        const userRole = profile?.role || 'client';
        setUserRole(userRole);
        console.log("User role:", userRole);
        
        // Get reservations
        const reservationsData = await getUserReservations(currentUserId, userRole);
        console.log("Fetched reservations:", reservationsData);
        
        if (reservationsData && reservationsData.length > 0) {
          setReservations(reservationsData);
        } else {
          console.log("No reservations found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load booking data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleUpdateStatus = async (reservationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId);
      
      if (error) throw error;
      
      // Update local state after successful update
      setReservations(reservations.map(res => 
        res.id === reservationId ? { ...res, status: newStatus } : res
      ));
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading bookings...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">All Bookings</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
            <Button variant="outline" size="sm" className="flex items-center bg-primary/10 text-primary">
              <List className="mr-2 h-4 w-4" />
              List View
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Bookings</h2>
                <p className="text-gray-500 text-sm">View and manage all your bookings</p>
              </div>
              {userRole === 'vendor' && (
                <Button variant="outline" size="sm">
                  Export Bookings
                </Button>
              )}
            </div>
          </div>
          
          {reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {userRole === 'vendor' && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                    )}
                    {userRole === 'client' && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                    )}
                    {userRole === 'admin' && (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Provider
                        </th>
                      </>
                    )}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      {userRole === 'vendor' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reservation.clients?.name || 'Unknown Client'}
                        </td>
                      )}
                      {userRole === 'client' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {reservation.vendors?.name || 'Unknown Provider'}
                        </td>
                      )}
                      {userRole === 'admin' && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {reservation.clients?.name || 'Unknown Client'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {reservation.vendors?.name || 'Unknown Provider'}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.services?.name || 'Unknown Service'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.date ? format(new Date(reservation.date), 'MMM dd, yyyy') : 'Unknown Date'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            reservation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {userRole === 'client' && reservation.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                          {userRole === 'vendor' && reservation.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-green-600 hover:bg-green-50"
                                onClick={() => handleUpdateStatus(reservation.id, 'confirmed')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </>
                          )}
                          {userRole === 'vendor' && reservation.status === 'confirmed' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:bg-blue-50"
                              onClick={() => handleUpdateStatus(reservation.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                          {userRole === 'admin' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:bg-blue-50"
                              onClick={() => handleUpdateStatus(reservation.id, reservation.status === 'pending' ? 'confirmed' : 'completed')}
                            >
                              Update Status
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Calendar className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                {userRole === 'client' 
                  ? "You don't have any bookings yet. Book an appointment to get started."
                  : userRole === 'admin'
                  ? "No bookings have been made in the system yet."
                  : "No bookings have been made with your services yet."}
              </p>
              <Button 
                variant="default" 
                className="mt-2"
                onClick={() => window.location.href = '/reservations'}
              >
                {userRole === 'client' ? 'Book an Appointment' : 'Update Available Times'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
