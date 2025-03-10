
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import GlassyNavbar from "./components/layout/GlassyNavbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TotalClients from "./pages/TotalClients";
import TotalVendors from "./pages/TotalVendors";
import Reservations from "./pages/Reservations";
import Offers from "./pages/Offers";
import Vouchers from "./pages/Vouchers";
import AllBookings from "./pages/AllBookings";
import ClinicDirectory from "./pages/ClinicDirectory";
import ClinicDetails from "./pages/ClinicDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ChatSessions from "./pages/ChatSessions";
import ChatPage from "./pages/ChatPage";
import ChatSettings from "./pages/ChatSettings";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        const { data } = await supabase.auth.getSession();
        console.log("Session data:", data);
        setSession(data.session);
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
      }
    };
    
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session ? "Has session" : "No session");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <GlassyNavbar />
            <div className="pt-24">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/dashboard" />} />
                <Route path="/clinics" element={<ClinicDirectory />} />
                <Route path="/clinics/:id" element={<ClinicDetails />} />
                
                <Route 
                  path="/dashboard" 
                  element={session ? <Dashboard /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/client-dashboard" 
                  element={session ? <ClientDashboard /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/vendor-dashboard" 
                  element={session ? <VendorDashboard /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/doctor-dashboard" 
                  element={session ? <DoctorDashboard /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/admin-dashboard" 
                  element={session ? <AdminDashboard /> : <Navigate to="/auth" />} 
                />
                
                <Route 
                  path="/clients" 
                  element={session ? <TotalClients /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/vendors" 
                  element={session ? <TotalVendors /> : <Navigate to="/auth" />} 
                />
                
                <Route 
                  path="/reservations" 
                  element={session ? <Reservations /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/all-bookings" 
                  element={session ? <AllBookings /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/offers" 
                  element={session ? <Offers /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/vouchers" 
                  element={session ? <Vouchers /> : <Navigate to="/auth" />} 
                />
                
                {/* Chat Routes */}
                <Route 
                  path="/chats" 
                  element={session ? <ChatSessions /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/chats/:sessionId" 
                  element={session ? <ChatPage /> : <Navigate to="/auth" />} 
                />
                <Route 
                  path="/chat-settings" 
                  element={session ? <ChatSettings /> : <Navigate to="/auth" />} 
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
