
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to seed test data for the application
export const seedTestData = async () => {
  try {
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("You must be logged in to seed test data");
      return;
    }
    
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
    
    if (adminError || !adminData?.success) {
      console.error("Error creating admin account:", adminError || adminData?.error);
      toast.error(`Failed to create admin account: ${adminError?.message || adminData?.error || 'Unknown error'}`);
    } else {
      console.log("Admin account created or updated successfully", adminData);
    }
    
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
    
    if (vendorError || !vendorData?.success) {
      console.error("Error creating vendor account:", vendorError || vendorData?.error);
      toast.error(`Failed to create vendor account: ${vendorError?.message || vendorData?.error || 'Unknown error'}`);
    } else {
      console.log("Vendor account created or updated successfully", vendorData);
    }
    
    toast.dismiss();
    
    if ((adminData?.success || vendorData?.success)) {
      toast.success("Test accounts created! You can login with:\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    } else {
      toast.error("Failed to create test accounts. See console for details.");
    }
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
