
import { Calendar, Clock, Store } from "lucide-react";

interface BookingItemProps {
  booking: {
    id: string;
    services?: { name: string; price?: number };
    vendors?: { name: string };
    date: string;
    time: string;
    status: string;
  };
  formatDate: (dateString: string) => string;
}

const BookingItem = ({ booking, formatDate }: BookingItemProps) => {
  return (
    <div className="border-b pb-3 last:border-0">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{booking.services?.name || 'Unknown Service'}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Store className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {booking.vendors?.name || 'Unknown Provider'}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {formatDate(booking.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {booking.time}
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className={`px-2 py-1 text-xs rounded-full 
          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
          'bg-yellow-100 text-yellow-800'}`}>
          {booking.status}
        </span>
        <span className="text-sm font-medium">
          ${booking.services?.price?.toFixed(2) || '0.00'}
        </span>
      </div>
    </div>
  );
};

export default BookingItem;
