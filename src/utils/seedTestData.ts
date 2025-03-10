
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createComprehensiveDoctorData } from "./seedServiceData";

// Define all possible return types explicitly
interface SeedDataResult {
  success: boolean;
  doctorId?: string;
  clientId?: string;
}

// Define the user creation result type with simple types
interface UserCreationResult {
  userId?: string;
  success: boolean;
  error?: string;
}

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
  } catch (error: any) {
    console.error("Error seeding test data:", error);
    toast.dismiss();
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
    return { success: false };
  }
};

// Helper function with explicit types and simplified response handling
const createUserSafely = async (
  email: string, 
  password: string, 
  role: string, 
  name: string
): Promise<UserCreationResult> => {
  try {
    // Call edge function to create user with service role
    const { data, error } = await supabase.functions.invoke('create-test-user', {
      body: { email, password, role, name }
    });
    
    if (!data || error) {
      throw new Error(error?.message || 'Failed to create user');
    }
    
    // Use explicit casting without complex type inference
    const userData = data as Record<string, any>;
    
    return { 
      userId: userData.userId as string | undefined,
      success: !!userData.success,
      error: userData.error as string | undefined
    };
  } catch (error: any) {
    console.error(`Error creating ${role} account:`, error);
    throw error;
  }
};
