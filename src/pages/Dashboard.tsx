
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log("No session found, redirecting to auth");
          navigate("/auth");
          return;
        }

        console.log("Checking user profile for ID:", session.user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }

        console.log("User profile data:", profile);
        const role = profile?.role || session.user.user_metadata?.role;
        setUserRole(role);

        // Auto-redirect based on role
        if (role === 'admin') {
          navigate("/admin-dashboard");
        } else if (role === 'doctor' || (role === 'vendor' && session.user.email?.includes('dr-'))) {
          console.log("Doctor role detected, navigating to doctor dashboard");
          navigate("/doctor-dashboard");
        } else if (role === 'vendor' || role === 'center') {
          navigate("/vendor-dashboard");
        } else if (role === 'seller') {
          navigate("/seller-dashboard");
        } else if (role === 'client') {
          navigate("/client-dashboard");
        }
      } catch (error) {
        console.error("Error in checking user role:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="space-y-4">
        {userRole === 'admin' && (
          <Button onClick={() => navigate("/admin-dashboard")} className="w-full md:w-auto">
            Go to Admin Dashboard
          </Button>
        )}
        
        {(userRole === 'doctor' || userRole === 'vendor' || userRole === 'center') && (
          <div className="space-y-2">
            {(userRole === 'vendor' || userRole === 'center') && (
              <Button onClick={() => navigate("/vendor-dashboard")} className="w-full md:w-auto">
                Go to Vendor Dashboard
              </Button>
            )}
            {userRole === 'doctor' && (
              <Button onClick={() => navigate("/doctor-dashboard")} className="w-full md:w-auto">
                Go to Doctor Dashboard
              </Button>
            )}
          </div>
        )}
        
        {userRole === 'seller' && (
          <Button onClick={() => navigate("/seller-dashboard")} className="w-full md:w-auto">
            Go to Seller Dashboard
          </Button>
        )}
        
        {userRole === 'client' && (
          <Button onClick={() => navigate("/client-dashboard")} className="w-full md:w-auto">
            Go to Client Dashboard
          </Button>
        )}

        {!userRole && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Your user role is not set. Please contact an administrator.</p>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
