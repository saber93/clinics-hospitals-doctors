
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clinic } from "@/types/clinic";
import { clinics as mockClinics } from "@/data/clinicData";

export const useClinicDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['clinic', id],
    queryFn: async () => {
      // Handle undefined or empty ID
      if (!id) {
        console.log("No clinic ID provided");
        throw new Error("No clinic ID provided");
      }

      // Normalize the ID format - try to match by numeric part if ID contains a dash
      let clinicId = id;
      const idParts = id.split('-');
      const numericId = idParts.length > 1 ? idParts[1] : id;
      
      // First try to find the clinic by direct ID match
      let mockClinic = mockClinics.find(c => c.id === id);
      
      // If not found, try to find by numeric part of ID
      if (!mockClinic) {
        mockClinic = mockClinics.find(c => c.id === numericId);
      }

      if (!mockClinic) {
        console.log(`Clinic not found for ID: ${id}`);
        throw new Error("Clinic not found");
      }
      
      // Get current user's ID for reservation check
      let hasReservation = false;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        // If user is authenticated, check for reservations separately
        if (user) {
          const { data: reservations } = await supabase
            .from('reservations')
            .select('client_id')
            .eq('client_id', user.id)
            .eq('status', 'confirmed');
            
          hasReservation = reservations && reservations.length > 0;
        }
      } catch (authError) {
        console.log("Auth check error:", authError);
        // Continue with mock data even if auth check fails
      }
      
      return {
        ...mockClinic,
        hasReservation
      } as Clinic;
    },
    retry: false // Disable retries to prevent multiple error messages
  });
};
