
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createComprehensiveDoctorData } from "./seedServiceData";

// Define result type interface
type SeedDataResult = {
  success: boolean;
  doctorId?: string;
  clientId?: string;
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
    
    // Create doctor account without complex typing
    const doctorResponse = await supabase.functions.invoke('create-test-user', {
      body: { email: 'dr-mix@skinnect.com', password: 'Doctor123!', role: 'doctor', name: 'Dr. Mix (Demo)' }
    });
    
    const doctorData = {
      userId: doctorResponse.data?.userId,
      success: Boolean(doctorResponse.data?.success),
    };
    
    console.log("Doctor account created:", doctorData?.userId || 'Failed');
    
    // Create a test client account with the same approach
    const clientResponse = await supabase.functions.invoke('create-test-user', {
      body: { email: 'client@skinnect.com', password: 'Client123!', role: 'client', name: 'Client User' }
    });
    
    const clientData = {
      userId: clientResponse.data?.userId,
      success: Boolean(clientResponse.data?.success),
    };
    
    console.log("Client account created:", clientData?.userId || 'Failed');
    
    // Create comprehensive demo data
    if (doctorData?.userId && clientData?.userId) {
      await createComprehensiveDoctorData(doctorData.userId, clientData.userId);
      console.log("Created comprehensive doctor demo data");
    }
    
    toast.dismiss();
    toast.success("Demo data created successfully! Refresh the page to see the changes.");
    
    return {
      success: true,
      doctorId: doctorData?.userId,
      clientId: clientData?.userId
    };
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.dismiss();
    toast.error(`Failed to seed test data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false };
  }
};
