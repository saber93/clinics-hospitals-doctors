
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
import { useTranslation } from "@/hooks/useTranslation";

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
  
  const { t } = useTranslation();
  
  return (
    <div className="h-full w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('reservations.yourReservations')}</h1>
        
        <BookingsTabs 
          activeTab={activeFilter} 
          onTabChange={setActiveFilter}
          className="max-w-fit"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('reservations.yourReservations')}</CardTitle>
          <CardDescription>{t('reservations.viewAndManage')}</CardDescription>
        </CardHeader>
        
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
      </Card>
    </div>
  );
};

export default MyReservations;
