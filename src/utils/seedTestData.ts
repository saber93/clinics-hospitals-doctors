
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
    
    // Create admin account if it doesn't exist
    const { error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@skinnect.com',
      password: 'Admin123!',
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'Admin User'
      }
    });
    
    if (adminError) {
      console.log("Admin account might already exist:", adminError.message);
      // Try to update the user role instead
      const { data: adminUserData } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('email', 'admin@skinnect.com')
        .select();
        
      if (adminUserData) {
        toast.success("Admin user role updated");
      }
    } else {
      toast.success("Admin account created successfully");
    }
    
    // Create vendor account if it doesn't exist
    const { error: vendorError } = await supabase.auth.admin.createUser({
      email: 'vendor@skinnect.com',
      password: 'Vendor123!',
      email_confirm: true,
      user_metadata: {
        role: 'vendor',
        name: 'Vendor User'
      }
    });
    
    if (vendorError) {
      console.log("Vendor account might already exist:", vendorError.message);
      // Try to update the user role instead
      const { data: vendorUserData } = await supabase
        .from('profiles')
        .update({ role: 'vendor' })
        .eq('email', 'vendor@skinnect.com')
        .select();
        
      if (vendorUserData) {
        toast.success("Vendor user role updated");
      }
    } else {
      toast.success("Vendor account created successfully");
    }
    
    toast.success("Test accounts created! You can login with:\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.error("Failed to seed test data. See console for details.");
  }
};
