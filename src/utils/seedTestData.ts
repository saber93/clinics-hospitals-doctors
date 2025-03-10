
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

// Use a simplified approach with minimal type inference
const createUserSafely = async (
  email: string, 
  password: string, 
  role: string, 
  name: string
): Promise<UserCreationResult> => {
  try {
    // Avoid deep type inference by using any for the intermediate response
    const response: any = await supabase.functions.invoke('create-test-user', {
      body: { email, password, role, name }
    });
    
    // Simple validation of response
    if (!response.data) {
      throw new Error(response.error?.message || 'Failed to create user');
    }
    
    // Return a new object with explicit types instead of passing through response data
    return { 
      userId: typeof response.data.userId === 'string' ? response.data.userId : undefined,
      success: Boolean(response.data.success),
      error: typeof response.data.error === 'string' ? response.data.error : undefined
    };
  } catch (error: any) {
    console.error(`Error creating ${role} account:`, error);
    throw error;
  }
};
