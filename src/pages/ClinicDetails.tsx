
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Components
import ClinicDetailsLayout from "@/components/clinics/ClinicDetailsLayout";
import ClinicDetailsLoading from "@/components/clinics/ClinicDetailsLoading";
import ClinicDetailsError from "@/components/clinics/ClinicDetailsError";

// Hooks and utilities
import { useClinicDetails } from "@/hooks/useClinicDetails";
import { getDefaultVouchers } from "@/utils/clinics/voucherUtils";
import { getSpecialtyTheme } from "@/utils/clinics/specialtyThemes";

const ClinicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch clinic details and check if user has reservations
  const { clinic, isLoading, error } = useClinicDetails(id);

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
    : getDefaultVouchers();
    
  // Get specialty theme based on clinic data
  // First check for custom theme from database, then fallback to category/subcategory matching
  const specialtyTheme = getSpecialtyTheme(clinic.category, clinic.subCategory, clinic.theme);

  return (
    <ClinicDetailsLayout 
      clinic={clinic} 
      vouchers={vouchers} 
      onReservation={handleReservation}
      specialtyTheme={specialtyTheme}
    />
  );
};

export default ClinicDetails;
