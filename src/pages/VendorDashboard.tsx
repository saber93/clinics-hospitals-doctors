import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Package, Activity, ArrowLeft } from "lucide-react";
import { getUserReservations } from "@/utils/reservations";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [bookingsByMonth, setBookingsByMonth] = useState([]);
  const [showBackButtons, setShowBackButtons] = useState({
    total: false,
    pending: false,
    confirmed: false,
    completed: false
  });
  
  useEffect(() => {
    const fetchVendorStats = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to view your dashboard");
          return;
        }
        
        const reservationsData = await getUserReservations(session.user.id, 'vendor');
        
        if (reservationsData) {
          const totalBookings = reservationsData.length;
          const pendingBookings = reservationsData.filter(r => r.status === 'pending').length;
          const confirmedBookings = reservationsData.filter(r => r.status === 'confirmed').length;
          const completedBookings = reservationsData.filter(r => r.status === 'completed').length;
          const cancelledBookings = reservationsData.filter(r => r.status === 'cancelled').length;
          
          setStats({
            totalBookings,
            pendingBookings,
            confirmedBookings,
            completedBookings,
            cancelledBookings
          });
          
          const monthlyData = [
            { name: 'Jan', bookings: 0 },
            { name: 'Feb', bookings: 0 },
            { name: 'Mar', bookings: 0 },
            { name: 'Apr', bookings: 0 },
            { name: 'May', bookings: 0 },
            { name: 'Jun', bookings: 0 },
            { name: 'Jul', bookings: 0 },
            { name: 'Aug', bookings: 0 },
            { name: 'Sep', bookings: 0 },
            { name: 'Oct', bookings: 0 },
            { name: 'Nov', bookings: 0 },
            { name: 'Dec', bookings: 0 },
          ];
          
          reservationsData.forEach(reservation => {
            if (reservation.date) {
              const month = new Date(reservation.date).getMonth();
              if (month >= 0 && month < 12) {
                monthlyData[month].bookings += 1;
              }
            }
          });
          
          setBookingsByMonth(monthlyData);
        }
      } catch (error) {
        console.error("Error fetching vendor stats:", error);
        toast.error("Failed to load vendor statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorStats();
  }, []);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    
    if (currentUrl === '/all-bookings') {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('source');
      
      if (source === 'total') {
        setShowBackButtons({...showBackButtons, total: true});
      } else if (source === 'pending') {
        setShowBackButtons({...showBackButtons, pending: true});
      } else if (source === 'confirmed') {
        setShowBackButtons({...showBackButtons, confirmed: true});
      } else if (source === 'completed') {
        setShowBackButtons({...showBackButtons, completed: true});
      }
    }
  }, []);
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];
  
  const statusData = [
    { name: 'Pending', value: stats.pendingBookings },
    { name: 'Confirmed', value: stats.confirmedBookings },
    { name: 'Completed', value: stats.completedBookings },
    { name: 'Cancelled', value: stats.cancelledBookings },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            {showBackButtons.total ? (
              <Button 
                variant="back" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/vendor-dashboard");
                  setShowBackButtons({...showBackButtons, total: false});
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/all-bookings?source=total");
                  setShowBackButtons({...showBackButtons, total: true});
                }}
              >
                View all bookings
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            {showBackButtons.pending ? (
              <Button 
                variant="back" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/vendor-dashboard");
                  setShowBackButtons({...showBackButtons, pending: false});
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/all-bookings?source=pending");
                  setShowBackButtons({...showBackButtons, pending: true});
                }}
              >
                Manage pending
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">Upcoming appointments</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            {showBackButtons.confirmed ? (
              <Button 
                variant="back" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/vendor-dashboard");
                  setShowBackButtons({...showBackButtons, confirmed: false});
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/all-bookings?source=confirmed");
                  setShowBackButtons({...showBackButtons, confirmed: true});
                }}
              >
                View schedule
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedBookings}</div>
            <p className="text-xs text-muted-foreground">Finished appointments</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 w-full">
            {showBackButtons.completed ? (
              <Button 
                variant="back" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/vendor-dashboard");
                  setShowBackButtons({...showBackButtons, completed: false});
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => {
                  navigate("/all-bookings?source=completed");
                  setShowBackButtons({...showBackButtons, completed: true});
                }}
              >
                View history
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bookings Over Time</CardTitle>
            <CardDescription>Monthly booking statistics</CardDescription>
          </CardHeader>
          <CardContent className="p-1">
            <div className="h-[300px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsByMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/all-bookings")}>
              View all bookings
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>Distribution of booking statuses</CardDescription>
          </CardHeader>
          <CardContent className="p-1">
            <div className="h-[300px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/all-bookings")}>
              Manage bookings
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Appointments Today</h3>
          <p className="text-gray-600 mb-4">No appointments scheduled for today</p>
          <Button variant="default" onClick={() => navigate("/reservations")}>Manage Calendar</Button>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">All Bookings</h3>
          <p className="text-gray-600 mb-4">View and manage all bookings</p>
          <Button variant="outline" onClick={() => navigate("/all-bookings")}>View All</Button>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Voucher Management</h3>
          <p className="text-gray-600 mb-4">Create and manage vouchers</p>
          <Button variant="outline" onClick={() => navigate("/vouchers")}>Manage Vouchers</Button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
