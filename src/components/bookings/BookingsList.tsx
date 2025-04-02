
import React from "react";
import { EnrichedReservation } from "@/types/reservations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Calendar, Clock } from "lucide-react";

interface BookingsListProps {
  bookings: EnrichedReservation[];
  getStatusColor: (status: string) => string;
  formatDate: (date: string) => string;
  handleStatusChange: (id: string, status: string) => void;
}

const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  getStatusColor,
  formatDate,
  handleStatusChange
}) => {
  return (
    <div className="divide-y">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <h3 className="font-medium">{booking.services?.name || 'Unknown Service'}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Store className="h-3.5 w-3.5 mr-1 text-gray-400" />
                {booking.vendors?.name || 'Unknown Provider'}
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <div className="flex items-center text-sm mb-1">
                <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                {formatDate(booking.date)}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                {booking.time}
              </div>
            </div>
            
            <div className="sm:col-span-2 flex flex-col justify-center">
              <Badge className={`self-start ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            
            <div className="sm:col-span-2 flex justify-end items-center space-x-2">
              {booking.status === 'pending' && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                >
                  Cancel
                </Button>
              )}
              {booking.status === 'confirmed' && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
