
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

// Imported refactored components
import ClinicDetailHeader from "@/components/clinics/ClinicDetailHeader";
import ClinicDescription from "@/components/clinics/ClinicDescription";
import ProductVouchers from "@/components/clinics/ProductVouchers";
import ReservationCard from "@/components/clinics/ReservationCard";
import ClinicDetailsLoading from "@/components/clinics/ClinicDetailsLoading";
import ClinicDetailsError from "@/components/clinics/ClinicDetailsError";

const ClinicDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch clinic details and check if user has reservations
  const { data: clinic, isLoading, error } = useQuery({
    queryKey: ['clinic', id],
    queryFn: async () => {
      // First fetch the clinic data
      const { data: clinicData, error: clinicError } = await supabase
        .from('clinics')
        .select('*')
        .eq('id', id)
        .single();

      if (clinicError) {
        throw clinicError;
      }

      // Get current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      
      // If user is authenticated, check for reservations separately
      let hasReservation = false;
      if (user) {
        const { data: reservations } = await supabase
          .from('reservations')
          .select('client_id')
          .eq('client_id', user.id)
          .eq('status', 'confirmed');
          
        hasReservation = reservations && reservations.length > 0;
      }
      
      return {
        id: clinicData.id,
        name: clinicData.name,
        description: clinicData.description,
        location: clinicData.location,
        category: clinicData.category,
        subCategory: clinicData.sub_category,
        offerPercentage: clinicData.offer_percentage,
        imageUrl: clinicData.image_url || "/placeholder.svg",
        productsVoucher: clinicData.products_voucher || [],
        hasReservation
      };
    }
  });

  const handleReservation = () => {
    // For now just show a toast; in a real app, this would navigate to a reservation form
    toast.success("Reservation feature coming soon!");
  };

  if (isLoading) {
    return <ClinicDetailsLoading />;
  }

  if (error || !clinic) {
    return <ClinicDetailsError />;
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Clinic details and vouchers */}
        <div className="lg:col-span-2">
          <ClinicDetailHeader clinic={clinic} />
          <ClinicDescription description={clinic.description} />
          <ProductVouchers 
            vouchers={clinic.productsVoucher || []} 
            hasReservation={clinic.hasReservation}
            onReservation={handleReservation}
          />
        </div>

        {/* Right column: Reservation card */}
        <div>
          <ReservationCard 
            clinicName={clinic.name} 
            offerPercentage={clinic.offerPercentage}
            vouchers={clinic.productsVoucher?.map(v => ({ 
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
