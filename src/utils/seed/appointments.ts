
import { supabase } from "@/integrations/supabase/client";
import { formatDateString, getRandomTimeSlot, getRandomFutureDate, getRandomPastDate } from "../dateUtils";

/**
 * Create a mix of upcoming and past appointments
 */
export const createAppointments = async (patientIds: string[], doctorId: string, services: any[]) => {
  try {
    const allReservations = [];
    
    // Create appointments for all patients with all services spread over next 14 days and past 14 days
    for (const patientId of patientIds) {
      for (const service of services) {
        // Create 1-2 future appointments per patient per service
        const numberOfFuture = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberOfFuture; i++) {
          const futureDate = getRandomFutureDate(14);
          allReservations.push({
            client_id: patientId,
            vendor_id: doctorId,
            service_id: service.id,
            date: formatDateString(futureDate),
            time: getRandomTimeSlot(),
            status: Math.random() > 0.7 ? 'confirmed' : 'pending'
          });
        }
        
        // Create 0-2 past appointments per patient per service
        const numberOfPast = Math.floor(Math.random() * 3);
        for (let i = 0; i < numberOfPast; i++) {
          const pastDate = getRandomPastDate(14);
          allReservations.push({
            client_id: patientId,
            vendor_id: doctorId,
            service_id: service.id,
            date: formatDateString(pastDate),
            time: getRandomTimeSlot(),
            status: Math.random() > 0.3 ? 'completed' : 'cancelled'
          });
        }
      }
    }
    
    // Create reservations in batches of 10 to avoid timeout
    const batchSize = 10;
    for (let i = 0; i < allReservations.length; i += batchSize) {
      const batch = allReservations.slice(i, i + batchSize);
      await supabase.functions.invoke('create-test-reservations', {
        body: { reservations: batch }
      });
    }
    
    console.log(`Created ${allReservations.length} appointments`);
    return allReservations;
  } catch (error) {
    console.error("Error creating appointments:", error);
    throw error;
  }
};
