
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createComprehensiveDoctorData } from "./seedServiceData";
import { createSellerDemoData } from "./seedServiceData";

// Define result type interface
type SeedDataResult = {
  success: boolean;
  doctorId?: string;
  clientId?: string;
  sellerId?: string;
};

// Define explicit type for the edge function response
type TestUserResponse = {
  data: {
    success: boolean;
    userId?: string;
    message?: string;
  } | null;
  error: Error | null;
};

// Export function with explicit return type
export const seedTestData = async (): Promise<SeedDataResult> => {
  try {
    toast.loading("Creating test accounts and sample data...");
    
    // First cleanup any existing test data
    const { data: existingDoctorData } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'dr-mix@skinnect.com')
      .single();
      
    if (existingDoctorData?.id) {
      await supabase.functions.invoke('create-test-user', {
        body: {
          userId: existingDoctorData.id,
          delete: true
        }
      });
    }
    
    // Create doctor account with explicit typing
    const doctorResponse: TestUserResponse = await supabase.functions.invoke('create-test-user', {
      body: { email: 'dr-mix@skinnect.com', password: 'Doctor123!', role: 'doctor', name: 'Dr. Mix (Demo)' }
    });
    
    console.log("Doctor account created:", doctorResponse.data?.userId || 'Failed');
    
    // Create a test client account with explicit typing
    const clientResponse: TestUserResponse = await supabase.functions.invoke('create-test-user', {
      body: { email: 'client@skinnect.com', password: 'Client123!', role: 'client', name: 'Client User' }
    });
    
    console.log("Client account created:", clientResponse.data?.userId || 'Failed');
    
    // Create a test seller account
    const sellerResponse: TestUserResponse = await supabase.functions.invoke('create-test-user', {
      body: { email: 'seller@skinnect.com', password: 'Seller123!', role: 'seller', name: 'Seller User' }
    });
    
    console.log("Seller account created:", sellerResponse.data?.userId || 'Failed');
    
    // Create comprehensive demo data
    if (doctorResponse.data?.userId && clientResponse.data?.userId) {
      await createComprehensiveDoctorData(doctorResponse.data.userId, clientResponse.data.userId);
      console.log("Created comprehensive doctor demo data");
    }
    
    // Create seller demo data
    if (sellerResponse.data?.userId) {
      await createSellerDemoData(sellerResponse.data.userId);
      console.log("Created seller demo data");
    }
    
    toast.dismiss();
    toast.success("Demo data created successfully! Refresh the page to see the changes.");
    
    return {
      success: true,
      doctorId: doctorResponse.data?.userId,
      clientId: clientResponse.data?.userId,
      sellerId: sellerResponse.data?.userId
    };
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.dismiss();
    toast.error(`Failed to seed test data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false };
  }
};
