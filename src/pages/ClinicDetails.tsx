
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Imported refactored components
import ClinicDetailHeader from "@/components/clinics/ClinicDetailHeader";
import ClinicDescription from "@/components/clinics/ClinicDescription";
import ProductVouchers from "@/components/clinics/ProductVouchers";
import ReservationCard from "@/components/clinics/ReservationCard";
import ClinicDetailsLoading from "@/components/clinics/ClinicDetailsLoading";
import ClinicDetailsError from "@/components/clinics/ClinicDetailsError";
import { Clinic } from "@/types/clinic";
import { clinics as mockClinics } from "@/data/clinicData";

const ClinicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch clinic details and check if user has reservations
  const { data: clinic, isLoading, error } = useQuery({
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

  const handleReservation = () => {
    // Check if user is authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        toast.error("Please login to make a reservation");
        navigate("/login");
        return;
      }
      
      // If authenticated, navigate to reservations page
      navigate("/reservations", { 
        state: { 
          clinicId: id,
          clinicName: clinic?.name 
        }
      });
    });
  };

  if (isLoading) {
    return <ClinicDetailsLoading />;
  }

  if (error || !clinic) {
    return <ClinicDetailsError />;
  }

  // If the clinic has no product vouchers, add some demo ones
  const vouchers = clinic.productsVoucher && clinic.productsVoucher.length > 0 
    ? clinic.productsVoucher 
    : [
        {
          productName: "Anti-Aging Serum",
          description: "Advanced formula with retinol for reducing fine lines and wrinkles",
          discount: 15,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          imageUrl: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop",
          additionalImages: [
            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
          ]
        },
        {
          productName: "Hydrating Facial Mask",
          description: "Deep moisture treatment with hyaluronic acid and ceramides",
          discount: 20,
          validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          imageUrl: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=800&auto=format&fit=crop",
          additionalImages: [
            "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=800&auto=format&fit=crop"
          ]
        },
        {
          productName: "Skin Brightening Cream",
          description: "Vitamin C enriched formula to even skin tone and boost radiance",
          discount: 10,
          imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
          additionalImages: [
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614159102522-35260209ffa7?q=80&w=800&auto=format&fit=crop"
          ]
        }
      ];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Clinic details and vouchers */}
        <div className="lg:col-span-2">
          <ClinicDetailHeader clinic={clinic} />
          <ClinicDescription description={clinic.description} />
          <ProductVouchers 
            vouchers={vouchers} 
            hasReservation={clinic.hasReservation}
            onReservation={handleReservation}
          />
        </div>

        {/* Right column: Reservation card */}
        <div>
          <ReservationCard 
            clinicName={clinic.name} 
            offerPercentage={clinic.offerPercentage}
            vouchers={vouchers.map(v => ({ 
              productName: v.productName, 
              discount: v.discount 
            }))}
            onReservation={handleReservation}
          />
        </div>
      </div>
    </div>
  );
};

export default ClinicDetails;
