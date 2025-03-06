
import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { seedTestData } from "@/utils/seedTestData";

// Placeholder components - these will be implemented later
const ClientDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">My Appointments</h3>
        <p className="text-gray-600 mb-4">You have no upcoming appointments</p>
        <button className="skinnect-button-primary">Book Now</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">My Vouchers</h3>
        <p className="text-gray-600 mb-4">You have no active vouchers</p>
        <button className="skinnect-button-outline">Browse Offers</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
        <p className="text-gray-600 mb-4">Check out the latest deals!</p>
        <button className="skinnect-button-outline">View All</button>
      </div>
    </div>
  </div>
);

const VendorDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Appointments Today</h3>
        <p className="text-gray-600 mb-4">No appointments scheduled for today</p>
        <button className="skinnect-button-primary">View Calendar</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Active Offers</h3>
        <p className="text-gray-600 mb-4">You have no active offers</p>
        <button className="skinnect-button-outline">Create Offer</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Voucher Management</h3>
        <p className="text-gray-600 mb-4">Create and manage vouchers</p>
        <button className="skinnect-button-outline">Manage Vouchers</button>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({ handleSeedData }: { handleSeedData: () => Promise<void> }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Vendors</h3>
        <p className="text-gray-600 mb-4">Manage vendor accounts</p>
        <button className="skinnect-button-primary">View All</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">Clients</h3>
        <p className="text-gray-600 mb-4">Manage client accounts</p>
        <button className="skinnect-button-outline">View All</button>
      </div>
      <div className="skinnect-card">
        <h3 className="text-lg font-semibold mb-2">System Analytics</h3>
        <p className="text-gray-600 mb-4">View platform statistics</p>
        <button className="skinnect-button-outline">View Reports</button>
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
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        
        // Fetch user profile to get role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUserRole(profile.role);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleSeedData = async () => {
    await seedTestData();
  };
  
  if (!isAuthenticated) {
    toast.error("Please login to access the dashboard");
    return <Navigate to="/auth" />;
  }
  
  // If user is admin, default to admin view
  const effectiveUserType = userRole === 'admin' ? 'admin' : 
                           userRole === 'vendor' ? 'vendor' : 
                           userType;
  
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
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("userType", "client");
                  window.history.pushState({}, "", `?${newParams.toString()}`);
                  window.location.reload();
                }}
              >
                Client View
              </button>
              <button
                className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                  effectiveUserType === "vendor"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("userType", "vendor");
                  window.history.pushState({}, "", `?${newParams.toString()}`);
                  window.location.reload();
                }}
              >
                Vendor View
              </button>
              <button
                className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                  effectiveUserType === "admin"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("userType", "admin");
                  window.history.pushState({}, "", `?${newParams.toString()}`);
                  window.location.reload();
                }}
              >
                Admin View
              </button>
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
