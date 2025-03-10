
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createComprehensiveDoctorData } from "./seedServiceData";

export const seedTestData = async () => {
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
    
    // Create doctor account
    const doctorData = await createUserSafely('dr-mix@skinnect.com', 'Doctor123!', 'doctor', 'Dr. Mix (Demo)');
    console.log("Doctor account created:", doctorData?.userId || 'Failed');
    
    // Create a test client account
    const clientData = await createUserSafely('client@skinnect.com', 'Client123!', 'client', 'Client User');
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
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
    return { success: false };
  }
};

// The type signature here was causing infinite recursion
// Explicitly define the return type to avoid excessive type instantiation
const createUserSafely = async (
  email: string, 
  password: string, 
  role: string, 
  name: string
): Promise<{ userId?: string, success?: boolean, error?: string }> => {
  try {
    // Call edge function to create user with service role
    const { data, error } = await supabase.functions.invoke('create-test-user', {
      body: { email, password, role, name }
    });
    
    if (error || !data?.success) {
      throw new Error(error?.message || data?.error || 'Failed to create user');
    }
    
    return data;
  } catch (error) {
    console.error(`Error creating ${role} account:`, error);
    throw error;
  }
};
