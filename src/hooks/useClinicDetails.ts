
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clinic } from "@/types/clinic";
import { clinics as mockClinics } from "@/data/clinicData";

export const useClinicDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['clinic', id],
    queryFn: async () => {
      try {
        // First try to find the clinic in mock data
        const mockClinic = mockClinics.find(c => c.id === id);
        if (!mockClinic) {
          console.log("Clinic not found in mock data");
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
      } catch (error) {
        console.error("Error fetching clinic:", error);
        throw error;
      }
    }
  });
};
