
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Appointment {
  id: string;
  client: {
    id: string;
    name: string;
  };
  service: {
    name: string;
  };
  date: string;
  time: string;
  status: string;
}

export const useAppointments = (doctorId: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointmentDates, setAppointmentDates] = useState<Date[]>([]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!doctorId) return;
      
      try {
        setLoading(true);
        
        // Fetch reservations
        const { data: reservationsData, error: reservationsError } = await supabase
          .from('reservations')
          .select(`
            id,
            date,
            time,
            status,
            client_id,
            service_id
          `)
          .eq('vendor_id', doctorId)
          .order('date', { ascending: true });
          
        if (reservationsError) throw reservationsError;
        
        // Get client profiles in a separate query
        const clientIds = reservationsData
          .map(item => item.client_id)
          .filter(Boolean) as string[];
          
        const { data: clientsData, error: clientsError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', clientIds.length > 0 ? clientIds : ['00000000-0000-0000-0000-000000000099']);
        
        if (clientsError) throw clientsError;
        
        // Create a lookup map for clients
        const clientsMap = (clientsData || []).reduce((acc, client) => {
          acc[client.id] = client;
          return acc;
        }, {} as Record<string, any>);
        
        // Get services in a separate query
        const serviceIds = reservationsData
          .map(item => item.service_id)
          .filter(Boolean) as string[];
          
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, name')
          .in('id', serviceIds.length > 0 ? serviceIds : ['00000000-0000-0000-0000-000000000099']);
        
        if (servicesError) throw servicesError;
        
        // Create a lookup map for services
        const servicesMap = (servicesData || []).reduce((acc, service) => {
          acc[service.id] = service;
          return acc;
        }, {} as Record<string, any>);
        
        // Map the data to our expected structure
        const formattedAppointments = (reservationsData || []).map(item => ({
          id: item.id,
          client: {
            id: item.client_id || 'unknown',
            name: item.client_id && clientsMap[item.client_id] 
              ? clientsMap[item.client_id].name 
              : 'Unknown Client'
          },
          service: {
            name: item.service_id && servicesMap[item.service_id] 
              ? servicesMap[item.service_id].name 
              : 'Unknown Service'
          },
          date: item.date,
          time: item.time,
          status: item.status
        }));
        
        setAllAppointments(formattedAppointments);
        
        // Create a list of dates with appointments for calendar highlighting
        const dates = formattedAppointments.map(appointment => 
          new Date(appointment.date)
        );
        setAppointmentDates(dates);
        
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointments();
  }, [doctorId]);

  return { 
    appointments,
    setAppointments,
    allAppointments, 
    loading, 
    appointmentDates 
  };
};
