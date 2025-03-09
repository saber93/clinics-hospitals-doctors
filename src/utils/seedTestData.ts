
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDateString } from "./dateUtils";

// Create a test user account via edge function
const createTestUser = async (email: string, password: string, role: string, name: string) => {
  console.log(`Creating ${role} account...`);
  const { data, error } = await supabase.functions.invoke('create-test-user', {
    body: { email, password, role, name }
  });
  
  if (error) {
    console.error(`Error calling create-test-user function for ${role}:`, error);
    throw new Error(error.message || `Unknown error creating ${role}`);
  } 
  
  if (!data?.success) {
    console.error(`Error creating ${role} account:`, data?.error);
    throw new Error(data?.error || `Unknown error creating ${role}`);
  }
  
  console.log(`${role} account created or updated successfully`, data);
  return data;
};

// Create chat settings if they don't exist
const createChatSettings = async () => {
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
      throw new Error(settingsError.message || 'Unknown error creating chat settings');
    }
    
    console.log("Chat settings created successfully");
  }
};

// Create doctor chat settings
const createDoctorChatSettings = async (doctorId: string) => {
  console.log("Creating doctor chat settings...");
  const { error: doctorSettingsError } = await supabase
    .from('doctor_chat_settings')
    .upsert({
      doctor_id: doctorId,
      offers_free_consultation: true,
      session_price: 85
    });
    
  if (doctorSettingsError) {
    console.error("Error creating doctor chat settings:", doctorSettingsError);
    throw new Error(doctorSettingsError.message || 'Unknown error creating doctor chat settings');
  }
  
  console.log("Doctor chat settings created successfully");
};

// Create vendor doctor chat settings
const createVendorDoctorSettings = async (vendorId: string) => {
  console.log("Creating vendor doctor chat settings...");
  const { error: vendorSettingsError } = await supabase
    .from('doctor_chat_settings')
    .upsert({
      doctor_id: vendorId,
      offers_free_consultation: true,
      session_price: 75
    });
    
  if (vendorSettingsError) {
    console.error("Error creating vendor doctor chat settings:", vendorSettingsError);
    throw new Error(vendorSettingsError.message || 'Unknown error creating vendor doctor chat settings');
  }
  
  console.log("Vendor doctor chat settings created successfully");
};

// Create a chat session
const createChatSession = async (patientId: string, doctorId: string, isFree: boolean, daysAgo: number, hoursAgo: number) => {
  console.log("Creating chat session...");
  const { data: sessionData, error: sessionError } = await supabase
    .from('chat_sessions')
    .insert({
      patient_id: patientId,
      doctor_id: doctorId,
      is_free: isFree,
      status: 'active',
      started_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      last_activity: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
    })
    .select()
    .single();
    
  if (sessionError) {
    console.error("Error creating chat session:", sessionError);
    throw new Error(sessionError.message || 'Unknown error creating chat session');
  }
  
  console.log("Chat session created successfully:", sessionData);
  return sessionData;
};

// Create chat messages for a session
const createChatMessages = async (sessionId: string, messages: any[]) => {
  console.log("Creating chat messages...");
  
  const { error: messagesError } = await supabase
    .from('chat_messages')
    .insert(messages);
    
  if (messagesError) {
    console.error("Error creating chat messages:", messagesError);
    throw new Error(messagesError.message || 'Unknown error creating chat messages');
  }
  
  console.log("Chat messages created successfully");
};

// Create a free chat session between doctor and client with messages
const createFreeChatSession = async (doctorId: string, clientId: string) => {
  // Create session 2 days ago with last activity 6 hours ago
  const sessionData = await createChatSession(clientId, doctorId, true, 2, 6);
  
  // Create chat messages
  const messages = [
    {
      session_id: sessionData.id,
      sender_id: doctorId,
      message: "Hello! How can I help you today?",
      is_read: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      session_id: sessionData.id,
      sender_id: clientId,
      message: "Hi doctor, I have a question about my recent skin condition.",
      is_read: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString() // 2 days ago + 5 minutes
    },
    {
      session_id: sessionData.id,
      sender_id: doctorId,
      message: "Of course, I'd be happy to help. Could you describe the symptoms you're experiencing?",
      is_read: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString() // 2 days ago + 10 minutes
    },
    {
      session_id: sessionData.id,
      sender_id: clientId,
      message: "I have a red rash that appeared yesterday. It's slightly itchy and on my forearm.",
      is_read: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString() // 2 days ago + 15 minutes
    },
    {
      session_id: sessionData.id,
      sender_id: doctorId,
      message: "Thank you for the details. Have you used any new skincare products or detergents recently?",
      is_read: false,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
    }
  ];
  
  await createChatMessages(sessionData.id, messages);
  return sessionData;
};

// Create a paid chat session between vendor and client with messages and payment
const createPaidChatSession = async (vendorId: string, clientId: string) => {
  // Create session 5 days ago with last activity 1 day ago
  const paidSessionData = await createChatSession(clientId, vendorId, false, 5, 24);
  
  // Create payment record
  console.log("Creating payment record...");
  const { error: paymentError } = await supabase
    .from('chat_payments')
    .insert({
      session_id: paidSessionData.id,
      patient_id: clientId,
      doctor_id: vendorId,
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
    throw new Error(paymentError.message || 'Unknown error creating payment record');
  }
  
  console.log("Payment record created successfully");
  
  // Create chat messages for paid session
  const paidMessages = [
    {
      session_id: paidSessionData.id,
      sender_id: vendorId,
      message: "Welcome to your paid consultation. How may I assist you today?",
      is_read: true,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
      session_id: paidSessionData.id,
      sender_id: clientId,
      message: "Thank you. I'm looking for advice on a good skincare routine for combination skin.",
      is_read: true,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString() // 5 days ago + 30 minutes
    },
    {
      session_id: paidSessionData.id,
      sender_id: vendorId,
      message: "For combination skin, I recommend a gentle cleanser, alcohol-free toner, lightweight moisturizer and sunscreen during the day. Would you like specific product recommendations?",
      is_read: true,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
      session_id: paidSessionData.id,
      sender_id: clientId,
      message: "Yes, please. I would appreciate some specific products to try.",
      is_read: true,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString() // 1 day ago + 2 hours
    }
  ];
  
  await createChatMessages(paidSessionData.id, paidMessages);
  return paidSessionData;
};

// Create services using service role
const createServices = async (vendorId: string) => {
  console.log("Creating sample services...");
  
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
    throw new Error(servicesError.message || 'Unknown error creating services');
  }
  
  if (!servicesData?.success) {
    console.error("Error creating services:", servicesData?.error);
    throw new Error(servicesData?.error || 'Unknown error creating services');
  }
  
  console.log("Services created successfully:", servicesData);
  return servicesData.services;
};

// Create reservations for services
const createReservations = async (clientId: string, vendorId: string, services: any[]) => {
  console.log("Creating sample reservations...");
  
  // Get today's date and format it as YYYY-MM-DD
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const reservations = [
    {
      client_id: clientId,
      vendor_id: vendorId,
      service_id: services[0].id,
      date: formatDateString(tomorrow),
      time: "10:00 AM",
      status: "pending"
    },
    {
      client_id: clientId,
      vendor_id: vendorId,
      service_id: services[1].id,
      date: formatDateString(nextWeek),
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
    throw new Error(reservationsError.message || 'Unknown error creating reservations');
  }
  
  if (!reservationsData?.success) {
    console.error("Error creating reservations:", reservationsData?.error);
    throw new Error(reservationsData?.error || 'Unknown error creating reservations');
  }
  
  console.log("Reservations created successfully:", reservationsData);
  return reservationsData;
};

// Function to seed test data for the application
export const seedTestData = async () => {
  try {
    toast.loading("Creating test accounts and sample data...");
    
    // Create test accounts
    const adminData = await createTestUser('admin@skinnect.com', 'Admin123!', 'admin', 'Admin User');
    const vendorData = await createTestUser('vendor@skinnect.com', 'Vendor123!', 'vendor', 'Vendor User');
    const doctorData = await createTestUser('doctor@skinnect.com', 'Doctor123!', 'doctor', 'Dr. Sarah Johnson');
    const clientData = await createTestUser('client@skinnect.com', 'Client123!', 'client', 'Client User');
    
    // Create chat settings
    await createChatSettings();
    
    // Create doctor-specific settings
    if (doctorData?.userId) {
      await createDoctorChatSettings(doctorData.userId);
    }
    
    // Create vendor doctor settings
    if (vendorData?.userId) {
      await createVendorDoctorSettings(vendorData.userId);
    }
    
    // Create a free chat session between doctor and client
    if (doctorData?.userId && clientData?.userId) {
      await createFreeChatSession(doctorData.userId, clientData.userId);
    }
    
    // Create a paid chat session between vendor and client
    if (vendorData?.userId && clientData?.userId) {
      await createPaidChatSession(vendorData.userId, clientData.userId);
    }
    
    // Create services and reservations
    if (vendorData?.userId && clientData?.userId) {
      const services = await createServices(vendorData.userId);
      if (services && services.length > 0) {
        await createReservations(clientData.userId, vendorData.userId, services);
      }
    }
    
    toast.dismiss();
    toast.success("Test accounts and sample data created successfully!\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!\nDoctor: doctor@skinnect.com / Doctor123!\nClient: client@skinnect.com / Client123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};
