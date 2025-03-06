
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
    
    if (adminError) {
      console.error("Error calling create-test-user function for admin:", adminError);
      toast.error(`Failed to create admin account: ${adminError.message || 'Unknown error'}`);
    } else if (!adminData?.success) {
      console.error("Error creating admin account:", adminData?.error);
      toast.error(`Failed to create admin account: ${adminData?.error || 'Unknown error'}`);
    } else {
      console.log("Admin account created or updated successfully", adminData);
      if (adminData.warning) {
        console.warn("Warning for admin account:", adminData.warning);
      }
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
    
    if (vendorError) {
      console.error("Error calling create-test-user function for vendor:", vendorError);
      toast.error(`Failed to create vendor account: ${vendorError.message || 'Unknown error'}`);
    } else if (!vendorData?.success) {
      console.error("Error creating vendor account:", vendorData?.error);
      toast.error(`Failed to create vendor account: ${vendorData?.error || 'Unknown error'}`);
    } else {
      console.log("Vendor account created or updated successfully", vendorData);
      if (vendorData.warning) {
        console.warn("Warning for vendor account:", vendorData.warning);
      }
    }
    
    toast.dismiss();
    
    const adminSuccess = adminData?.success;
    const vendorSuccess = vendorData?.success;
    
    if (adminSuccess || vendorSuccess) {
      let successMessage = "Test accounts created!\n\n";
      
      if (adminSuccess) {
        successMessage += "Admin: admin@skinnect.com / Admin123!\n";
      }
      
      if (vendorSuccess) {
        successMessage += "Vendor: vendor@skinnect.com / Vendor123!";
      }
      
      toast.success(successMessage);
      
      // If there were warnings, show them
      if (adminData?.warning || vendorData?.warning) {
        toast.warning("Accounts created, but there might be login issues. Check console for details.");
      }
    } else {
      toast.error("Failed to create test accounts. See console for details.");
    }
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
