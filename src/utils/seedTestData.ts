
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
    const { error: adminError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'admin@skinnect.com', 
        password: 'Admin123!',
        role: 'admin',
        name: 'Admin User'
      }
    });
    
    if (adminError) {
      console.error("Error creating admin account:", adminError);
      toast.error("Failed to create admin account");
    } else {
      console.log("Admin account created or updated successfully");
    }
    
    // Create vendor account
    const { error: vendorError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'vendor@skinnect.com',
        password: 'Vendor123!',
        role: 'vendor',
        name: 'Vendor User'
      }
    });
    
    if (vendorError) {
      console.error("Error creating vendor account:", vendorError);
      toast.error("Failed to create vendor account");
    } else {
      console.log("Vendor account created or updated successfully");
    }
    
    toast.dismiss();
    toast.success("Test accounts created! You can login with:\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error("Failed to seed test data. See console for details.");
  }
};
