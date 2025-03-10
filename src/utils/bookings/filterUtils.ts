
import { Booking } from '@/hooks/types/bookingTypes';
import { format } from 'date-fns';

export const filterBookingsByStatus = (
  reservations: Booking[], 
  activeFilter: string
): Booking[] => {
  if (activeFilter === 'all') return reservations;
  return reservations.filter(reservation => reservation.status === activeFilter);
};

export const getStatusCount = (
  reservations: Booking[], 
  status: string
): number => {
  return reservations.filter(res => res.status === status).length;
};

export const formatBookingDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch (e) {
    console.error("Date formatting error:", e);
    return dateString;
  }
};
