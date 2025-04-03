
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useBookings } from "@/hooks/useBookings";
import BookingsTable from "@/components/bookings/BookingsTable";
import BookingsLoading from "@/components/bookings/BookingsLoading";
import BookingsEmpty from "@/components/bookings/BookingsEmpty";
import BookingsTabs from "@/components/bookings/BookingsTabs";

const MyReservations = () => {
  const {
    filteredReservations,
    loading,
    userRole,
    activeFilter,
    setActiveFilter,
    handleUpdateStatus,
    formatDate
  } = useBookings();
  
  return (
    <div className="h-full w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Reservations</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Reservations</CardTitle>
          <CardDescription>View and manage your upcoming appointments</CardDescription>
        </CardHeader>
        
        <div className="px-6">
          <BookingsTabs 
            activeTab={activeFilter} 
            onTabChange={setActiveFilter}
          >
            <CardContent className="p-0">
              {loading ? (
                <BookingsLoading />
              ) : filteredReservations.length === 0 ? (
                <BookingsEmpty activeTab={activeFilter} />
              ) : (
                <BookingsTable 
                  bookings={filteredReservations}
                  userRole={userRole}
                  formatDate={formatDate}
                  handleUpdateStatus={handleUpdateStatus}
                />
              )}
            </CardContent>
          </BookingsTabs>
        </div>
      </Card>
    </div>
  );
};

export default MyReservations;
