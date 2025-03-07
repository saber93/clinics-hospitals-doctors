
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to seed test data for the application
export const seedTestData = async () => {
  try {
    toast.loading("Creating test accounts and sample data...");
    
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
      toast.dismiss();
      toast.error(`Failed to create admin account: ${adminError.message || 'Unknown error'}`);
      return;
    } 
    
    if (!adminData?.success) {
      console.error("Error creating admin account:", adminData?.error);
      toast.dismiss();
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
      toast.dismiss();
      toast.error(`Failed to create vendor account: ${vendorError.message || 'Unknown error'}`);
      return;
    }
    
    if (!vendorData?.success) {
      console.error("Error creating vendor account:", vendorData?.error);
      toast.dismiss();
      toast.error(`Failed to create vendor account: ${vendorData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Vendor account created or updated successfully", vendorData);
    
    // Create client account
    console.log("Creating client account...");
    const { data: clientData, error: clientError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'client@skinnect.com',
        password: 'Client123!',
        role: 'client',
        name: 'Client User'
      }
    });
    
    if (clientError) {
      console.error("Error calling create-test-user function for client:", clientError);
      toast.dismiss();
      toast.error(`Failed to create client account: ${clientError.message || 'Unknown error'}`);
      return;
    }
    
    if (!clientData?.success) {
      console.error("Error creating client account:", clientData?.error);
      toast.dismiss();
      toast.error(`Failed to create client account: ${clientData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Client account created or updated successfully", clientData);
    
    // Create services
    console.log("Creating sample services...");
    const vendorId = vendorData?.userId;
    
    if (!vendorId) {
      console.error("Missing vendor ID, cannot create services");
      toast.dismiss();
      toast.error("Failed to create services due to missing vendor ID");
      return;
    }
    
    const services = [
      {
        vendor_id: vendorId,
        name: "Facial Treatment",
        description: "Revitalizing facial treatment for all skin types",
        duration: 60,
        price: 89.99
      },
      {
        vendor_id: vendorId,
        name: "Deep Tissue Massage",
        description: "Therapeutic massage focusing on deeper muscle layers",
        duration: 90,
        price: 129.99
      }
    ];
    
    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .upsert(services, { onConflict: 'vendor_id, name' })
      .select();
      
    if (servicesError) {
      console.error("Error creating services:", servicesError);
      toast.dismiss();
      toast.error(`Failed to create services: ${servicesError.message || 'Unknown error'}`);
      return;
    }
    
    console.log("Services created successfully:", servicesData);
    
    // Create reservations
    if (servicesData && servicesData.length > 0 && clientData?.userId) {
      console.log("Creating sample reservations...");
      
      // Get today's date and format it as YYYY-MM-DD
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const formatDate = (date) => {
        return date.toISOString().split('T')[0];
      };
      
      const reservations = [
        {
          client_id: clientData.userId,
          vendor_id: vendorId,
          service_id: servicesData[0].id,
          date: formatDate(tomorrow),
          time: "10:00 AM",
          status: "pending"
        },
        {
          client_id: clientData.userId,
          vendor_id: vendorId,
          service_id: servicesData[1].id,
          date: formatDate(nextWeek),
          time: "2:00 PM",
          status: "confirmed"
        }
      ];
      
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .upsert(reservations)
        .select();
        
      if (reservationsError) {
        console.error("Error creating reservations:", reservationsError);
        toast.dismiss();
        toast.error(`Failed to create reservations: ${reservationsError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Reservations created successfully:", reservationsData);
    }
    
    toast.dismiss();
    toast.success("Test accounts and sample data created successfully!\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!\nClient: client@skinnect.com / Client123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
