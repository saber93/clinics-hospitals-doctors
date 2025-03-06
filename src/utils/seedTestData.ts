
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to seed test data for the application
export const seedTestData = async () => {
  try {
    toast.loading("Creating test accounts...");
    
    // Create admin account
    console.log("Creating admin account...");
    const { data: adminData, error: adminError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'admin@skinnect.com', 
        password: 'Admin123!',
        role: 'admin',
        name: 'Admin User'
      }
    });
    
    if (adminError) {
      console.error("Error calling create-test-user function for admin:", adminError);
      toast.error(`Failed to create admin account: ${adminError.message || 'Unknown error'}`);
      return;
    } 
    
    if (!adminData?.success) {
      console.error("Error creating admin account:", adminData?.error);
      toast.error(`Failed to create admin account: ${adminData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Admin account created or updated successfully", adminData);
    
    // Create vendor account
    console.log("Creating vendor account...");
    const { data: vendorData, error: vendorError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'vendor@skinnect.com',
        password: 'Vendor123!',
        role: 'vendor',
        name: 'Vendor User'
      }
    });
    
    if (vendorError) {
      console.error("Error calling create-test-user function for vendor:", vendorError);
      toast.error(`Failed to create vendor account: ${vendorError.message || 'Unknown error'}`);
      return;
    }
    
    if (!vendorData?.success) {
      console.error("Error creating vendor account:", vendorData?.error);
      toast.error(`Failed to create vendor account: ${vendorData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Vendor account created or updated successfully", vendorData);
    
    toast.dismiss();
    toast.success("Test accounts created successfully!\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
