
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatReadableDate } from "@/utils/dateUtils";
import { EnrichedReservation } from "@/types/reservations";
import { Calendar, Clock, Store, ArrowLeft, Filter } from "lucide-react";

const AllBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<EnrichedReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("Please login to view your bookings");
          navigate("/auth");
          return;
        }
        
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        const role = profile?.role || 'client';
        
        // Fetch reservations
        const { data: reservations, error } = await supabase
          .from('reservations')
          .select(`
            *,
            clients:profiles!reservations_client_id_fkey(name),
            vendors:profiles!reservations_vendor_id_fkey(name),
            services(name, price)
          `)
          .eq(role === 'client' ? 'client_id' : 'vendor_id', user.id)
          .order('date', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        // Safely cast the data to the right type
        const typedReservations = (reservations || []).map(res => ({
          ...res,
          clients: { name: res.clients?.name || 'Unknown Client' },
          vendors: { name: res.vendors?.name || 'Unknown Vendor' },
          services: { 
            name: res.services?.name || 'Unknown Service',
            price: res.services?.price || 0
          }
        })) as EnrichedReservation[];
        
        setBookings(typedReservations);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [navigate]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);
  
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) {
        throw error;
      }
      
      // Update the local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus as any } 
            : booking
        )
      );
      
      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your appointments and reservations</CardDescription>
          </CardHeader>
          
          <div className="px-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtered by {activeTab === 'all' ? 'all statuses' : activeTab}
                </div>
              </div>
              
              <TabsContent value={activeTab}>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p>Loading your bookings...</p>
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">No {activeTab === 'all' ? '' : activeTab} bookings found</p>
                      <Button onClick={() => navigate('/reservations')}>
                        Book an Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredBookings.map((booking) => (
                        <div key={booking.id} className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            <div className="sm:col-span-5">
                              <h3 className="font-medium">{booking.services?.name || 'Unknown Service'}</h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Store className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                {booking.vendors?.name || 'Unknown Provider'}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <div className="flex items-center text-sm mb-1">
                                <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                {formatReadableDate(booking.date)}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                {booking.time}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-2 flex flex-col justify-center">
                              <Badge className={`self-start ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="sm:col-span-2 flex justify-end items-center space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {booking.status === 'confirmed' && (
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AllBookings;
