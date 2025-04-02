
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createComprehensiveDoctorData } from "./seedServiceData";

// Define result type interface
type SeedDataResult = {
  success: boolean;
  doctorId?: string;
  clientId?: string;
  vendorId?: string;
  centerId?: string;
  adminId?: string;
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
    
    // Create accounts for all roles
    const accounts = [
      { email: 'admin@zames.com', password: 'Admin123!', role: 'admin', name: 'Admin User' },
      { email: 'dr.skin@zames.com', password: 'Doctor123!', role: 'doctor', name: 'Dr. Skin (Demo)' },
      { email: 'client@zames.com', password: 'Client123!', role: 'client', name: 'Client User' },
      { email: 'vendor@zames.com', password: 'Vendor123!', role: 'vendor', name: 'Vendor Business' },
      { email: 'center@zames.com', password: 'Center123!', role: 'center', name: 'Medical Center' }
    ];
    
    const results: Record<string, string | undefined> = {};
    
    // Create all accounts
    for (const account of accounts) {
      console.log(`Creating ${account.role} account: ${account.email}`);
      
      // Create account using edge function
      const response: TestUserResponse = await supabase.functions.invoke('create-test-user', {
        body: account
      });
      
      if (response.data?.userId) {
        results[account.role] = response.data.userId;
        console.log(`Created ${account.role} account with ID: ${response.data.userId}`);
      } else {
        console.error(`Failed to create ${account.role} account:`, response.error || response.data?.message);
      }
    }
    
    // Create comprehensive demo data for doctor and client
    if (results.doctor && results.client) {
      await createComprehensiveDoctorData(results.doctor, results.client);
      console.log("Created comprehensive doctor demo data");
    }
    
    toast.dismiss();
    toast.success("All demo accounts and data created successfully!");
    
    return {
      success: true,
      doctorId: results.doctor,
      clientId: results.client,
      vendorId: results.vendor,
      centerId: results.center,
      adminId: results.admin
    };
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.dismiss();
    toast.error(`Failed to seed test data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false };
  }
};
