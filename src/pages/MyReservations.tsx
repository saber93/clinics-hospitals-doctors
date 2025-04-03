
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
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Reservations</h1>
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
    </div>
  );
};

export default MyReservations;
