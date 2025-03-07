import { useState, useEffect } from "react";
import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { seedTestData } from "@/utils/seedTestData";
import "../utils/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Store, Calendar, TrendingUp, Activity, Package, BarChartIcon, ArrowLeft } from "lucide-react";
import { getUserReservations } from "@/utils/reservationsData";

const vendorStats = [
  { name: 'Jan', count: 5 },
  { name: 'Feb', count: 8 },
  { name: 'Mar', count: 12 },
  { name: 'Apr', count: 10 },
  { name: 'May', count: 15 },
  { name: 'Jun', count: 24 },
];

const categoryData = [
  { name: 'Beauty', value: 35 },
  { name: 'Health', value: 25 },
  { name: 'Fitness', value: 20 },
  { name: 'Wellness', value: 15 },
  { name: 'Spa', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

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
          toast.error("Please login to view your bookings");
          return;
        }
        
        const reservationsData = await getUserReservations(session.user.id, 'client');
        
        if (reservationsData) {
          const upcoming = reservationsData.filter(r => 
            (r.status === 'confirmed' || r.status === 'pending') && 
            new Date(r.date).getTime() >= new Date().getTime()
          ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);
          
          setUpcomingBookings(upcoming);
        }
      } catch (error) {
        console.error("Error fetching client bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientBookings();
  }, []);
  
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
                        <p className="text-sm text-gray-600">{booking.vendors?.name || 'Unknown Provider'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{formatDate(booking.date)}</p>
                        <p className="text-sm text-gray-600">{booking.time}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                        {booking.status}
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

const VendorDashboard = () => {
  const navigate = useNavigate();
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
                  navigate("/dashboard");
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
                  navigate("/dashboard");
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
                  navigate("/dashboard");
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
                  navigate("/dashboard");
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

const AdminDashboard = ({ handleSeedData }: { handleSeedData: () => Promise<void> }) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/vendors")}>
              View all vendors
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">159</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/clients")}>
              View all clients
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/reservations")}>
              View all bookings
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendor Growth</CardTitle>
            <CardDescription>New vendor registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="p-1">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="New Vendors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/reports/vendors")}>
              View detailed report
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
            <CardDescription>Distribution of service types</CardDescription>
          </CardHeader>
          <CardContent className="p-1">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/reports/categories")}>
              View category analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-sm">New vendor <span className="font-medium">Beauty Salon</span> registered</p>
                <span className="ml-auto text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                <p className="text-sm">Client <span className="font-medium">Jane Doe</span> made a reservation</p>
                <span className="ml-auto text-xs text-gray-500">5h ago</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                <p className="text-sm">New special offer created by <span className="font-medium">Spa Center</span></p>
                <span className="ml-auto text-xs text-gray-500">1d ago</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                <p className="text-sm">New voucher claimed by <span className="font-medium">John Smith</span></p>
                <span className="ml-auto text-xs text-gray-500">2d ago</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/activity-log")}>
              View all activity
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Resource utilization and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database storage</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">API usage</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => navigate("/system/settings")}>
              System Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSeedData}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
            >
              Generate Test Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          setIsAuthenticated(true);
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
            
          if (profile) {
            setUserRole(profile.role);
            
            if (!searchParams.get("userType")) {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("userType", profile.role === 'admin' ? 'admin' : 
                                       profile.role === 'vendor' ? 'vendor' : 'client');
              setSearchParams(newParams);
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUserRole(profile.role);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams, setSearchParams]);
  
  const handleSeedData = async () => {
    try {
      toast.loading("Generating test data...");
      await seedTestData();
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      console.error("Error in seed data:", error);
      toast.error("Failed to seed test data");
    }
  };
  
  const handleViewChange = (view: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("userType", view);
    setSearchParams(newParams);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="ml-2 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }
  
  if (isAuthenticated === false) {
    toast.error("Please login to access the dashboard");
    return <Navigate to="/auth" />;
  }
  
  const effectiveUserType = userRole === 'admin' ? 
                           (userType === 'admin' ? 'admin' : userType) : 
                           userRole === 'vendor' ? 
                           (userType === 'vendor' || userType === 'admin' ? userType : 'vendor') : 
                           'client';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                  effectiveUserType === "client"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => handleViewChange("client")}
              >
                Client View
              </button>
              <button
                className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                  effectiveUserType === "vendor"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => handleViewChange("vendor")}
              >
                Vendor View
              </button>
              {userRole === 'admin' && (
                <button
                  className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                    effectiveUserType === "admin"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => handleViewChange("admin")}
                >
                  Admin View
                </button>
              )}
              <div className="ml-auto mr-4 flex items-center">
                <Button 
                  variant="outline" 
                  onClick={() => window.logoutUser()}
                  size="sm"
                  className="text-gray-600"
                >
                  Logout
                </Button>
              </div>
            </nav>
          </div>
          <div>
            {effectiveUserType === "client" && <ClientDashboard />}
            {effectiveUserType === "vendor" && <VendorDashboard />}
            {effectiveUserType === "admin" && <AdminDashboard handleSeedData={handleSeedData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
