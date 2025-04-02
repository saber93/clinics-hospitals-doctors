
import React from "react";

const BookingsLoading: React.FC = () => {
  return (
    <div className="py-8 text-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
      <p>Loading your bookings...</p>
    </div>
  );
};

export default BookingsLoading;
