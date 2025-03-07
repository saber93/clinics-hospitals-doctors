
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
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
            
            // Redirect based on user role
            if (profile.role === 'admin') {
              navigate('/admin-dashboard');
            } else if (profile.role === 'vendor') {
              navigate('/vendor-dashboard');
            } else {
              navigate('/client-dashboard');
            }
          } else {
            // Default to client if no profile found
            navigate('/client-dashboard');
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
  }, [navigate]);
  
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
  
  // This component just redirects, so we don't need to return anything substantial
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <p className="ml-2 text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
