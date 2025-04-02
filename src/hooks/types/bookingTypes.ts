
import { Booking as ClientBooking } from '@/components/client-dashboard/BookingItem';

export type Booking = ClientBooking;

export interface BookingUtils {
  formatDate: (date: string) => string;
  getStatusCount: (bookings: Booking[], status: string) => number;
  filterBookingsByStatus: (bookings: Booking[], filter: string) => Booking[];
}

export interface BookingActions {
  handleUpdateStatus: (id: string, status: string) => Promise<boolean>;
}
