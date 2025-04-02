
import { Booking } from '@/hooks/types/bookingTypes';

export const generateDemoBookings = (): Booking[] => {
  return [
    {
      id: '1',
      services: { name: 'Facial Treatment', price: 89.99 },
      vendors: { name: 'Beauty Spa Center' },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      services: { name: 'Deep Tissue Massage', price: 129.99 },
      vendors: { name: 'Wellness Retreat' },
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      time: '2:30 PM',
      status: 'pending'
    },
    {
      id: '3',
      services: { name: 'Hot Stone Therapy', price: 149.99 },
      vendors: { name: 'Serenity Spa' },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      time: '11:15 AM',
      status: 'confirmed'
    },
    {
      id: '4',
      services: { name: 'Hair Styling', price: 75.00 },
      vendors: { name: 'Glamour Salon' },
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      time: '3:00 PM',
      status: 'confirmed'
    },
    {
      id: '5',
      services: { name: 'Manicure & Pedicure', price: 65.00 },
      vendors: { name: 'Nail Studio' },
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
      time: '1:15 PM',
      status: 'completed'
    }
  ];
};
