
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useAllBookings } from "@/hooks/useAllBookings";
import BookingsList from "@/components/bookings/BookingsList";
import BookingsLoading from "@/components/bookings/BookingsLoading";
import BookingsEmpty from "@/components/bookings/BookingsEmpty";
import BookingsTabs from "@/components/bookings/BookingsTabs";

const AllBookings = () => {
  const navigate = useNavigate();
  const {
    filteredBookings,
    loading,
    activeTab,
    setActiveTab,
    handleStatusChange,
    getStatusColor,
    formatDate
  } = useAllBookings();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your appointments and reservations</CardDescription>
          </CardHeader>
          
          <div className="px-6">
            <BookingsTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            >
              <CardContent className="p-0">
                {loading ? (
                  <BookingsLoading />
                ) : filteredBookings.length === 0 ? (
                  <BookingsEmpty activeTab={activeTab} />
                ) : (
                  <BookingsList 
                    bookings={filteredBookings}
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                    handleStatusChange={handleStatusChange}
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

export default AllBookings;
