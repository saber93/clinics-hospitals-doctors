import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// This page is specifically for centers, while vendors will have their own dashboard
const CenterDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please login to access your dashboard");
        navigate("/auth");
        return;
      }
      
      // Check if user is a center
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error || profile?.role !== 'center') {
        toast.error("You don't have permission to view this page");
        navigate("/dashboard");
      }
    };
    
    checkUserRole();
  }, [navigate]);

  return (
    <div className="p-6 mt-16 sm:mt-20">
      <h2 className="text-2xl font-bold mb-4">Center Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Welcome to your Center Dashboard. Manage your medical center operations from here.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Manage Doctors</h3>
          <p className="text-gray-600 mb-4">Assign and manage doctors at your center</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => toast.info("Doctor management coming soon")}
          >
            View Doctors
          </button>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Center Calendar</h3>
          <p className="text-gray-600 mb-4">View and manage center appointments</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => navigate("/reservations")}
          >
            Open Calendar
          </button>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Center Statistics</h3>
          <p className="text-gray-600 mb-4">View performance metrics and analytics</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={() => toast.info("Statistics dashboard coming soon")}
          >
            View Statistics
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent Bookings</h3>
        <p className="text-gray-600 mb-4">No recent bookings found</p>
        <button 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          onClick={() => navigate("/all-bookings")}
        >
          View All Bookings
        </button>
      </div>
    </div>
  );
};

export default CenterDashboard;
