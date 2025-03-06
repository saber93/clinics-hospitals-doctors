
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
    const { data: existingAdmin } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@skinnect.com')
      .single();
      
    if (!existingAdmin) {
      // Create admin user
      const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
        email: 'admin@skinnect.com',
        password: 'Admin123!',
        user_metadata: {
          name: 'Admin User',
          role: 'admin'
        },
        email_confirm: true
      });
      
      if (adminError) {
        console.error("Failed to create admin user:", adminError);
        toast.error("Failed to create admin user");
      } else {
        console.log("Admin user created:", adminData);
        
        // Update the profile
        await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', adminData.user.id);
      }
    }
    
    // Create vendor account if it doesn't exist
    const { data: existingVendor } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'vendor@skinnect.com')
      .single();
      
    if (!existingVendor) {
      // Create vendor user
      const { data: vendorData, error: vendorError } = await supabase.auth.admin.createUser({
        email: 'vendor@skinnect.com',
        password: 'Vendor123!',
        user_metadata: {
          name: 'Sample Vendor',
          role: 'vendor'
        },
        email_confirm: true
      });
      
      if (vendorError) {
        console.error("Failed to create vendor user:", vendorError);
        toast.error("Failed to create vendor user");
      } else {
        console.log("Vendor user created:", vendorData);
        
        // Update the profile
        await supabase
          .from('profiles')
          .update({ role: 'vendor' })
          .eq('id', vendorData.user.id);
      }
    }
    
    // Create sample reservations and services
    // This would require additional tables to be set up in Supabase
    // We'll simulate this with a success message for now
    
    toast.success("Test accounts created successfully! You can now login with:\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.error("Failed to seed test data. See console for details.");
  }
};
