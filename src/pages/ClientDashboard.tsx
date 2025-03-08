
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations } from "@/utils/reservationsData";
import { Calendar, Clock, Store } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchClientBookings = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If not logged in, we'll use demo data
          console.log("No session found, using demo data");
          setLoading(false);
          return;
        }
        
        console.log("Fetching reservations for user:", session.user.id);
        const reservationsData = await getUserReservations(session.user.id, 'client');
        
        if (reservationsData && reservationsData.length > 0) {
          const upcoming = reservationsData
            .filter(r => 
              (r.status === 'confirmed' || r.status === 'pending') && 
              new Date(r.date).getTime() >= new Date().getTime()
            )
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
          
          console.log("Upcoming bookings:", upcoming);
          
          // Only override demo data if we actually have real data
          if (upcoming.length > 0) {
            setUpcomingBookings(upcoming);
          } else {
            // Use demo data if no upcoming bookings
            setUpcomingBookings(generateDemoBookings());
          }
        } else {
          // If no reservations data, use demo data
          setUpcomingBookings(generateDemoBookings());
        }
      } catch (error) {
        console.error("Error fetching client bookings:", error);
        // On error, use demo data
        setUpcomingBookings(generateDemoBookings());
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientBookings();
  }, []);
  
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
        status: 'confirmed'
      }
    ];
  };
  
  const specialOffers = [
    { id: 1, title: "30% Off First Massage", provider: "Wellness Spa", validUntil: "2023-12-31" },
    { id: 2, title: "Buy 3 Sessions, Get 1 Free", provider: "Fitness Studio", validUntil: "2023-11-30" },
    { id: 3, title: "Free Consultation", provider: "Beauty Clinic", validUntil: "2023-12-15" },
    { id: 4, title: "Holiday Package Discount", provider: "Health Center", validUntil: "2023-12-25" },
    { id: 5, title: "Refer a Friend - 20% Off", provider: "Yoga Studio", validUntil: "2023-11-20" },
  ];
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      
      <div className="border rounded-lg p-4 shadow-sm bg-white mb-6">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => navigate("/reservations")}>Book New Appointment</Button>
          <Button variant="outline" onClick={() => navigate("/all-bookings")}>Manage Bookings</Button>
          <Button variant="outline" onClick={() => navigate("/offers")}>Browse Offers</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
            <CardDescription>Your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{booking.services?.name || 'Unknown Service'}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Store className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {booking.vendors?.name || 'Unknown Provider'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {formatDate(booking.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                        {booking.status}
                      </span>
                      <span className="text-sm font-medium">
                        ${booking.services?.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-3">You don't have any upcoming appointments</p>
                <Button variant="outline" size="sm" onClick={() => navigate("/reservations")}>
                  Book Now
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/all-bookings")}>
              View All Bookings
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Special Offers</CardTitle>
            <CardDescription>Latest deals and promotions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specialOffers.map((offer) => (
                <div key={offer.id} className="border-b pb-3 last:border-0">
                  <p className="font-medium">{offer.title}</p>
                  <p className="text-sm text-gray-600">From: {offer.provider}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Valid until: {formatDate(offer.validUntil)}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/offers")}>
              View All Offers
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
