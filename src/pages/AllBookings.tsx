import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getUserReservations } from '@/utils/reservationsData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, XCircle, CheckCircle, Calendar, Clock, Store, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AllBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  const showBackButton = source === 'total' || source === 'pending' || 
                        source === 'confirmed' || source === 'completed';

  // Generate demo bookings function (same as in ClientDashboard)
  const generateDemoBookings = () => {
    return [
      {
        id: '1',
        services: { name: 'Facial Treatment', price: 89.99 },
        vendors: { name: 'Beauty Spa Center' },
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        time: '10:00 AM',
        status: 'confirmed'
      },
      {
        id: '2',
        services: { name: 'Deep Tissue Massage', price: 129.99 },
        vendors: { name: 'Wellness Retreat' },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        time: '2:30 PM',
        status: 'pending'
      },
      {
        id: '3',
        services: { name: 'Hot Stone Therapy', price: 149.99 },
        vendors: { name: 'Serenity Spa' },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        time: '11:15 AM',
        status: 'confirmed'
      },
      {
        id: '4',
        services: { name: 'Hair Styling', price: 75.00 },
        vendors: { name: 'Glamour Salon' },
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        time: '3:00 PM',
        status: 'completed'
      },
      {
        id: '5',
        services: { name: 'Manicure & Pedicure', price: 65.00 },
        vendors: { name: 'Nail Studio' },
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
        time: '1:15 PM',
        status: 'completed'
      }
    ];
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log("Fetching user data and reservations...");
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to access bookings");
          setLoading(false);
          return;
        }
        
        const currentUserId = session.user.id;
        setUserId(currentUserId);
        console.log("Current user ID:", currentUserId);
        
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
        
        const role = profile?.role || 'client';
        setUserRole(role);
        console.log("User role:", role);
        
        const reservationsData = await getUserReservations(currentUserId, role);
        console.log("Fetched reservations data:", reservationsData);
        
        if (reservationsData && Array.isArray(reservationsData) && reservationsData.length > 0) {
          setReservations(reservationsData);
        } else {
          console.log("No real reservations found, using demo data");
          // Use demo data if no real reservations
          setReservations(generateDemoBookings());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load booking data");
        // Use demo data on error
        setReservations(generateDemoBookings());
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
      
      setReservations(reservations.map(res => 
        res.id === reservationId ? { ...res, status: newStatus } : res
      ));
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    if (activeFilter === 'all') return true;
    return reservation.status === activeFilter;
  });

  const getStatusCount = (status) => {
    return reservations.filter(res => res.status === status).length;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <Button 
            variant="back" 
            onClick={() => navigate('/client-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className={`cursor-pointer ${activeFilter === 'all' ? 'bg-primary/10 border-primary' : ''}`} onClick={() => setActiveFilter('all')}>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <p className="font-semibold">All Bookings</p>
              <p className="text-2xl font-bold">{reservations.length}</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeFilter === 'pending' ? 'bg-yellow-50 border-yellow-400' : ''}`} onClick={() => setActiveFilter('pending')}>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <p className="font-semibold">Pending</p>
              <p className="text-2xl font-bold">{getStatusCount('pending')}</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeFilter === 'confirmed' ? 'bg-green-50 border-green-400' : ''}`} onClick={() => setActiveFilter('confirmed')}>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="font-semibold">Confirmed</p>
              <p className="text-2xl font-bold">{getStatusCount('confirmed')}</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer ${activeFilter === 'completed' ? 'bg-blue-50 border-blue-400' : ''}`} onClick={() => setActiveFilter('completed')}>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="font-semibold">Completed</p>
              <p className="text-2xl font-bold">{getStatusCount('completed')}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {activeFilter === 'all' ? 'All Bookings' : 
                   activeFilter === 'pending' ? 'Pending Bookings' :
                   activeFilter === 'confirmed' ? 'Confirmed Bookings' :
                   activeFilter === 'completed' ? 'Completed Bookings' : 'Bookings'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {activeFilter === 'all' ? 'View and manage all your bookings' :
                   activeFilter === 'pending' ? 'Bookings awaiting confirmation' :
                   activeFilter === 'confirmed' ? 'Your confirmed appointments' :
                   activeFilter === 'completed' ? 'Your past appointments' : 'Your bookings'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/reservations')}
              >
                Book New Appointment
              </Button>
            </div>
          </div>
          
          {filteredReservations && filteredReservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
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
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <Store className="h-4 w-4 text-gray-400 mr-2" />
                          {reservation.vendors?.name || 'Unknown Provider'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.services?.name || 'Unknown Service'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(reservation.date)}
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              {reservations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Provider
                        </th>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <Store className="h-4 w-4 text-gray-400 mr-2" />
                              {reservation.vendors?.name || 'Unknown Provider'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {reservation.services?.name || 'Unknown Service'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(reservation.date)}
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
