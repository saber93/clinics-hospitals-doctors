
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
    
    // Create doctor account
    console.log("Creating doctor account...");
    const { data: doctorData, error: doctorError } = await supabase.functions.invoke('create-test-user', {
      body: {
        email: 'doctor@skinnect.com',
        password: 'Doctor123!',
        role: 'doctor',
        name: 'Dr. Sarah Johnson'
      }
    });
    
    if (doctorError) {
      console.error("Error calling create-test-user function for doctor:", doctorError);
      toast.dismiss();
      toast.error(`Failed to create doctor account: ${doctorError.message || 'Unknown error'}`);
      return;
    }
    
    if (!doctorData?.success) {
      console.error("Error creating doctor account:", doctorData?.error);
      toast.dismiss();
      toast.error(`Failed to create doctor account: ${doctorData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Doctor account created or updated successfully", doctorData);
    
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
    
    // Create chat settings
    console.log("Creating chat settings...");
    let { data: existingSettings } = await supabase
      .from('chat_settings')
      .select()
      .limit(1);
      
    if (!existingSettings || existingSettings.length === 0) {
      const { error: settingsError } = await supabase
        .from('chat_settings')
        .insert({
          default_session_price: 50,
          default_commission_percentage: 15,
          session_duration_days: 7
        });
        
      if (settingsError) {
        console.error("Error creating chat settings:", settingsError);
        toast.dismiss();
        toast.error(`Failed to create chat settings: ${settingsError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Chat settings created successfully");
    }
    
    // Create doctor chat settings
    if (doctorData?.userId) {
      console.log("Creating doctor chat settings...");
      const { error: doctorSettingsError } = await supabase
        .from('doctor_chat_settings')
        .upsert({
          doctor_id: doctorData.userId,
          offers_free_consultation: true,
          session_price: 85
        });
        
      if (doctorSettingsError) {
        console.error("Error creating doctor chat settings:", doctorSettingsError);
        toast.dismiss();
        toast.error(`Failed to create doctor chat settings: ${doctorSettingsError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Doctor chat settings created successfully");
    }
    
    // Create vendor doctor chat settings
    if (vendorData?.userId) {
      console.log("Creating vendor doctor chat settings...");
      const { error: vendorSettingsError } = await supabase
        .from('doctor_chat_settings')
        .upsert({
          doctor_id: vendorData.userId,
          offers_free_consultation: true,
          session_price: 75
        });
        
      if (vendorSettingsError) {
        console.error("Error creating vendor doctor chat settings:", vendorSettingsError);
        toast.dismiss();
        toast.error(`Failed to create vendor doctor chat settings: ${vendorSettingsError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Vendor doctor chat settings created successfully");
    }
    
    // Create a chat session between doctor and client
    if (doctorData?.userId && clientData?.userId) {
      console.log("Creating chat session...");
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          patient_id: clientData.userId,
          doctor_id: doctorData.userId,
          is_free: true,
          status: 'active',
          started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          last_activity: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
        })
        .select()
        .single();
        
      if (sessionError) {
        console.error("Error creating chat session:", sessionError);
        toast.dismiss();
        toast.error(`Failed to create chat session: ${sessionError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Chat session created successfully:", sessionData);
      
      // Create chat messages
      console.log("Creating chat messages...");
      
      const messages = [
        {
          session_id: sessionData.id,
          sender_id: doctorData.userId,
          message: "Hello! How can I help you today?",
          is_read: true,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
          session_id: sessionData.id,
          sender_id: clientData.userId,
          message: "Hi doctor, I have a question about my recent skin condition.",
          is_read: true,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString() // 2 days ago + 5 minutes
        },
        {
          session_id: sessionData.id,
          sender_id: doctorData.userId,
          message: "Of course, I'd be happy to help. Could you describe the symptoms you're experiencing?",
          is_read: true,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString() // 2 days ago + 10 minutes
        },
        {
          session_id: sessionData.id,
          sender_id: clientData.userId,
          message: "I have a red rash that appeared yesterday. It's slightly itchy and on my forearm.",
          is_read: true,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString() // 2 days ago + 15 minutes
        },
        {
          session_id: sessionData.id,
          sender_id: doctorData.userId,
          message: "Thank you for the details. Have you used any new skincare products or detergents recently?",
          is_read: false,
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
        }
      ];
      
      const { error: messagesError } = await supabase
        .from('chat_messages')
        .insert(messages);
        
      if (messagesError) {
        console.error("Error creating chat messages:", messagesError);
        toast.dismiss();
        toast.error(`Failed to create chat messages: ${messagesError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Chat messages created successfully");
    }
    
    // Create a paid chat session between vendor and client
    if (vendorData?.userId && clientData?.userId) {
      console.log("Creating paid chat session...");
      const { data: paidSessionData, error: paidSessionError } = await supabase
        .from('chat_sessions')
        .insert({
          patient_id: clientData.userId,
          doctor_id: vendorData.userId,
          is_free: false,
          status: 'active',
          started_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          last_activity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
        })
        .select()
        .single();
        
      if (paidSessionError) {
        console.error("Error creating paid chat session:", paidSessionError);
        toast.dismiss();
        toast.error(`Failed to create paid chat session: ${paidSessionError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Paid chat session created successfully:", paidSessionData);
      
      // Create payment record
      console.log("Creating payment record...");
      const { error: paymentError } = await supabase
        .from('chat_payments')
        .insert({
          session_id: paidSessionData.id,
          patient_id: clientData.userId,
          doctor_id: vendorData.userId,
          amount: 75.00,
          commission_percentage: 15.00,
          commission_amount: 11.25,
          doctor_amount: 63.75,
          payment_method: 'credit_card',
          payment_status: 'completed',
          payment_provider: 'stripe'
        });
        
      if (paymentError) {
        console.error("Error creating payment record:", paymentError);
        toast.dismiss();
        toast.error(`Failed to create payment record: ${paymentError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Payment record created successfully");
      
      // Create chat messages for paid session
      console.log("Creating paid chat messages...");
      
      const paidMessages = [
        {
          session_id: paidSessionData.id,
          sender_id: vendorData.userId,
          message: "Welcome to your paid consultation. How may I assist you today?",
          is_read: true,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        },
        {
          session_id: paidSessionData.id,
          sender_id: clientData.userId,
          message: "Thank you. I'm looking for advice on a good skincare routine for combination skin.",
          is_read: true,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString() // 5 days ago + 30 minutes
        },
        {
          session_id: paidSessionData.id,
          sender_id: vendorData.userId,
          message: "For combination skin, I recommend a gentle cleanser, alcohol-free toner, lightweight moisturizer and sunscreen during the day. Would you like specific product recommendations?",
          is_read: true,
          created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
        },
        {
          session_id: paidSessionData.id,
          sender_id: clientData.userId,
          message: "Yes, please. I would appreciate some specific products to try.",
          is_read: true,
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString() // 1 day ago + 2 hours
        }
      ];
      
      const { error: paidMessagesError } = await supabase
        .from('chat_messages')
        .insert(paidMessages);
        
      if (paidMessagesError) {
        console.error("Error creating paid chat messages:", paidMessagesError);
        toast.dismiss();
        toast.error(`Failed to create paid chat messages: ${paidMessagesError.message || 'Unknown error'}`);
        return;
      }
      
      console.log("Paid chat messages created successfully");
    }
    
    // Create services using service role from an edge function to bypass RLS
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
    
    // Use an edge function to bypass RLS when creating services
    const { data: servicesData, error: servicesError } = await supabase.functions.invoke('create-test-services', {
      body: { services }
    });
      
    if (servicesError) {
      console.error("Error creating services:", servicesError);
      toast.dismiss();
      toast.error(`Failed to create services: ${servicesError.message || 'Unknown error'}`);
      return;
    }
    
    if (!servicesData?.success) {
      console.error("Error creating services:", servicesData?.error);
      toast.dismiss();
      toast.error(`Failed to create services: ${servicesData?.error || 'Unknown error'}`);
      return;
    }
    
    console.log("Services created successfully:", servicesData);
    
    // Create reservations
    if (servicesData?.services && servicesData.services.length > 0 && clientData?.userId) {
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
          service_id: servicesData.services[0].id,
          date: formatDate(tomorrow),
          time: "10:00 AM",
          status: "pending"
        },
        {
          client_id: clientData.userId,
          vendor_id: vendorId,
          service_id: servicesData.services[1].id,
          date: formatDate(nextWeek),
          time: "2:00 PM",
          status: "confirmed"
        }
      ];
      
      // Use an edge function to bypass RLS when creating reservations
      const { data: reservationsData, error: reservationsError } = await supabase.functions.invoke('create-test-reservations', {
        body: { reservations }
      });
        
      if (reservationsError) {
        console.error("Error creating reservations:", reservationsError);
        toast.dismiss();
        toast.error(`Failed to create reservations: ${reservationsError.message || 'Unknown error'}`);
        return;
      }
      
      if (!reservationsData?.success) {
        console.error("Error creating reservations:", reservationsData?.error);
        toast.dismiss();
        toast.error(`Failed to create reservations: ${reservationsData?.error || 'Unknown error'}`);
        return;
      }
      
      console.log("Reservations created successfully:", reservationsData);
    }
    
    toast.dismiss();
    toast.success("Test accounts and sample data created successfully!\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!\nDoctor: doctor@skinnect.com / Doctor123!\nClient: client@skinnect.com / Client123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
