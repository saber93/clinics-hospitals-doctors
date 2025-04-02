
import { useSearchParams, useLocation } from "react-router-dom";
import { useReservations } from "@/hooks/useReservations";
import { useAuth } from "@/contexts/AuthContext";
import ReservationsHeader from "@/components/reservations/ReservationsHeader";
import AppointmentBookingForm from "@/components/reservations/AppointmentBookingForm";
import BookingsList from "@/components/reservations/BookingsList";
import VendorPanel from "@/components/reservations/VendorPanel";
import LoadingState from "@/components/reservations/LoadingState";
import AuthRequiredMessage from "@/components/reservations/AuthRequiredMessage";

const Reservations = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { session, user } = useAuth();
  
  const clinicId = location.state?.clinicId;
  const clinicName = location.state?.clinicName;
  
  const userType = searchParams.get("userType") || "client";
  
  const {
    services,
    loading,
    error,
    userRole,
    userId,
    reservations,
    refreshReservations
  } = useReservations(clinicId, clinicName);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (!session || !user) {
    return <AuthRequiredMessage />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReservationsHeader clinicName={clinicName} />
        
        {userType === "client" ? (
          <div className="bg-white rounded-lg shadow p-6">
            <AppointmentBookingForm 
              services={services}
              clinicId={clinicId}
              clinicName={clinicName}
              userId={user.id}
              userRole={userRole}
              onBookingComplete={refreshReservations}
              error={error}
            />
            
            <BookingsList reservations={reservations} />
          </div>
        ) : (
          <VendorPanel />
        )}
      </div>
    </div>
  );
};

export default Reservations;
