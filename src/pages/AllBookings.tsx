
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useBookings } from '@/hooks/useBookings';
import StatusFilterCards from '@/components/bookings/StatusFilterCards';
import BookingsTable from '@/components/bookings/BookingsTable';
import EmptyBookingsState from '@/components/bookings/EmptyBookingsState';

const AllBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    reservations,
    filteredReservations,
    loading,
    userRole,
    activeFilter,
    setActiveFilter,
    getStatusCount,
    handleUpdateStatus,
    formatDate
  } = useBookings();

  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  const showBackButton = source === 'total' || source === 'pending' || 
                        source === 'confirmed' || source === 'completed';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <Button 
            variant="back" 
            onClick={() => navigate('/client-dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Button>
        </div>
        
        <StatusFilterCards 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          totalCount={reservations.length}
          getStatusCount={getStatusCount}
        />
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {activeFilter === 'all' ? 'All Bookings' : 
                   activeFilter === 'pending' ? 'Pending Bookings' :
                   activeFilter === 'confirmed' ? 'Confirmed Bookings' :
                   activeFilter === 'completed' ? 'Completed Bookings' : 'Bookings'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {activeFilter === 'all' ? 'View and manage all your bookings' :
                   activeFilter === 'pending' ? 'Bookings awaiting confirmation' :
                   activeFilter === 'confirmed' ? 'Your confirmed appointments' :
                   activeFilter === 'completed' ? 'Your past appointments' : 'Your bookings'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/reservations')}
              >
                Book New Appointment
              </Button>
            </div>
          </div>
          
          {filteredReservations && filteredReservations.length > 0 ? (
            <BookingsTable 
              bookings={filteredReservations}
              userRole={userRole}
              formatDate={formatDate}
              handleUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <div className="text-center py-12">
              {reservations.length > 0 ? (
                <BookingsTable 
                  bookings={reservations}
                  userRole={userRole}
                  formatDate={formatDate}
                  handleUpdateStatus={handleUpdateStatus}
                />
              ) : (
                <EmptyBookingsState activeFilter={activeFilter} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
