
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations } from "@/utils/reservations";
import { Booking } from "../BookingItem";

export const useClientBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientBookings = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, using demo data");
          setLoading(false);
          return;
        }
        
        console.log("Fetching reservations for user:", session.user.id);
        const reservationsData = await getUserReservations(session.user.id, 'client');
        
        if (reservationsData && reservationsData.length > 0) {
          const upcoming = reservationsData
            .filter(r => 
              (r.status === 'confirmed' || r.status === 'pending') && 
              new Date(r.date).getTime() >= new Date().getTime()
            )
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
          
          console.log("Upcoming bookings:", upcoming);
          
          if (upcoming.length > 0) {
            setUpcomingBookings(upcoming);
          } else {
            setUpcomingBookings(generateDemoBookings());
          }
        } else {
          setUpcomingBookings(generateDemoBookings());
        }
      } catch (error) {
        console.error("Error fetching client bookings:", error);
        setUpcomingBookings(generateDemoBookings());
      } finally {
        setLoading(false);
      }
    };
    
    fetchClientBookings();
  }, []);

  const generateDemoBookings = (): Booking[] => {
    return [
      {
        id: '1',
        services: { name: 'Facial Treatment', price: 89.99 },
        vendors: { name: 'Beauty Spa Center' },
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '10:00 AM',
        status: 'confirmed'
      },
      {
        id: '2',
        services: { name: 'Deep Tissue Massage', price: 129.99 },
        vendors: { name: 'Wellness Retreat' },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '2:30 PM',
        status: 'pending'
      },
      {
        id: '3',
        services: { name: 'Hot Stone Therapy', price: 149.99 },
        vendors: { name: 'Serenity Spa' },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '11:15 AM',
        status: 'confirmed'
      },
      {
        id: '4',
        services: { name: 'Hair Styling', price: 75.00 },
        vendors: { name: 'Glamour Salon' },
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '3:00 PM',
        status: 'confirmed'
      }
    ];
  };

  return {
    upcomingBookings,
    loading
  };
};
