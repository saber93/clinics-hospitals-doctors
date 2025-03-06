import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { seedTestData } from "@/utils/seedTestData";
import "../utils/auth";

const ClientDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">My Appointments</h3>
        <p className="text-gray-600 mb-4">You have no upcoming appointments</p>
        <Button variant="default">Book Now</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">My Vouchers</h3>
        <p className="text-gray-600 mb-4">You have no active vouchers</p>
        <Button variant="outline">Browse Offers</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
        <p className="text-gray-600 mb-4">Check out the latest deals!</p>
        <Button variant="outline">View All</Button>
      </div>
    </div>
  </div>
);

const VendorDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Appointments Today</h3>
        <p className="text-gray-600 mb-4">No appointments scheduled for today</p>
        <Button variant="default">View Calendar</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Active Offers</h3>
        <p className="text-gray-600 mb-4">You have no active offers</p>
        <Button variant="outline">Create Offer</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Voucher Management</h3>
        <p className="text-gray-600 mb-4">Create and manage vouchers</p>
        <Button variant="outline">Manage Vouchers</Button>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ handleSeedData }: { handleSeedData: () => Promise<void> }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Vendors</h3>
        <p className="text-gray-600 mb-4">Manage vendor accounts</p>
        <Button variant="default">View All</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Clients</h3>
        <p className="text-gray-600 mb-4">Manage client accounts</p>
        <Button variant="outline">View All</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">System Analytics</h3>
        <p className="text-gray-600 mb-4">View platform statistics</p>
        <Button variant="outline">View Reports</Button>
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Development Tools</h3>
      <p className="text-gray-600 mb-4">Create test accounts and sample data</p>
      <Button 
        variant="outline" 
        onClick={handleSeedData}
        className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
      >
        Generate Test Data
      </Button>
    </div>
  </div>
);

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
