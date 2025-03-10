
import { supabase } from "@/integrations/supabase/client";

export const createDoctorServices = async (doctorId: string) => {
  try {
    const services = [
      {
        vendor_id: doctorId,
        name: "Initial Dermatology Consultation",
        description: "Comprehensive first visit to assess skin conditions and develop treatment plans",
        duration: 45,
        price: 120.00
      },
      {
        vendor_id: doctorId,
        name: "Skin Cancer Screening",
        description: "Thorough examination to detect potential skin cancers and concerning lesions",
        duration: 30,
        price: 90.00
      },
      {
        vendor_id: doctorId,
        name: "Acne Treatment Session",
        description: "Specialized treatment for acne including extraction and personalized advice",
        duration: 40,
        price: 85.00
      },
      {
        vendor_id: doctorId,
        name: "Eczema Management",
        description: "Assessment and treatment planning for eczema and related conditions",
        duration: 30,
        price: 75.00
      },
      {
        vendor_id: doctorId,
        name: "Cosmetic Dermatology Consultation",
        description: "Discussion of skin rejuvenation options and aesthetic procedures",
        duration: 60,
        price: 150.00
      }
    ];
    
    // Use an edge function to bypass RLS when creating services
    const { data: servicesData } = await supabase.functions.invoke('create-test-services', {
      body: { services }
    });
    
    if (!servicesData?.services || servicesData.services.length === 0) {
      throw new Error("Failed to create services");
    }
    
    console.log(`Created ${servicesData.services.length} services for doctor`);
    return servicesData.services;
  } catch (error) {
    console.error("Error creating doctor services:", error);
    throw error;
  }
};
