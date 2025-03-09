
import { supabase } from "@/integrations/supabase/client";
import { formatDateString } from "./dateUtils";

/**
 * Create services using service role
 */
export const createServices = async (vendorId: string) => {
  console.log("Creating sample services...");
  
  const services = [
    {
      vendor_id: vendorId,
      name: "Facial Treatment",
      description: "Revitalizing facial treatment for all skin types",
      duration: 60,
      price: 89.99
    },
    {
      vendor_id: vendorId,
      name: "Deep Tissue Massage",
      description: "Therapeutic massage focusing on deeper muscle layers",
      duration: 90,
      price: 129.99
    }
  ];
  
  // Use an edge function to bypass RLS when creating services
  const { data: servicesData, error: servicesError } = await supabase.functions.invoke('create-test-services', {
    body: { services }
  });
    
  if (servicesError) {
    console.error("Error creating services:", servicesError);
    throw new Error(servicesError.message || 'Unknown error creating services');
  }
  
  if (!servicesData?.success) {
    console.error("Error creating services:", servicesData?.error);
    throw new Error(servicesData?.error || 'Unknown error creating services');
  }
  
  console.log("Services created successfully:", servicesData);
  return servicesData.services;
};

/**
 * Create reservations for services
 */
export const createReservations = async (clientId: string, vendorId: string, services: any[]) => {
  console.log("Creating sample reservations...");
  
  // Get today's date and format it as YYYY-MM-DD
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const reservations = [
    {
      client_id: clientId,
      vendor_id: vendorId,
      service_id: services[0].id,
      date: formatDateString(tomorrow),
      time: "10:00 AM",
      status: "pending"
    },
    {
      client_id: clientId,
      vendor_id: vendorId,
      service_id: services[1].id,
      date: formatDateString(nextWeek),
      time: "2:00 PM",
      status: "confirmed"
    }
  ];
  
  // Use an edge function to bypass RLS when creating reservations
  const { data: reservationsData, error: reservationsError } = await supabase.functions.invoke('create-test-reservations', {
    body: { reservations }
  });
    
  if (reservationsError) {
    console.error("Error creating reservations:", reservationsError);
    throw new Error(reservationsError.message || 'Unknown error creating reservations');
  }
  
  if (!reservationsData?.success) {
    console.error("Error creating reservations:", reservationsData?.error);
    throw new Error(reservationsData?.error || 'Unknown error creating reservations');
  }
  
  console.log("Reservations created successfully:", reservationsData);
  return reservationsData;
};
