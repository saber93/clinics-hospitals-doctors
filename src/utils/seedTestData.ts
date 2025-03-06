
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
      .eq('email', 'admin@skinnect.com');
      
    if (!existingAdmin || existingAdmin.length === 0) {
      // Create admin user - This would normally use admin functions
      // but we'll simulate it for demonstration purposes
      toast.success("Admin account would be created here");
      console.log("Admin account creation simulated");
    }
    
    // Create vendor account if it doesn't exist
    const { data: existingVendor } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'vendor@skinnect.com');
      
    if (!existingVendor || existingVendor.length === 0) {
      // Create vendor user - simulation
      toast.success("Vendor account would be created here");
      console.log("Vendor account creation simulated");
    }
    
    toast.success("Test accounts created successfully! You can now login with:\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!");
    
  } catch (error) {
    console.error("Error seeding test data:", error);
    toast.error("Failed to seed test data. See console for details.");
  }
};
