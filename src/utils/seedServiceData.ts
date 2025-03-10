
import { supabase } from "@/integrations/supabase/client";
import { formatDateString, getRandomTimeSlot, getRandomFutureDate, getRandomPastDate } from "./dateUtils";

/**
 * Create comprehensive data for a doctor to showcase day-to-day tasks
 */
export const createComprehensiveDoctorData = async (doctorId: string, primaryClientId: string) => {
  try {
    console.log("Creating comprehensive doctor demo data...");
    
    // Create additional test patients
    const patientEmails = [
      'patient1@example.com', 
      'patient2@example.com', 
      'patient3@example.com', 
      'patient4@example.com',
      'patient5@example.com'
    ];
    
    const patientNames = [
      'Sarah Johnson', 
      'Michael Smith', 
      'Emma Davis', 
      'Robert Wilson',
      'Olivia Brown'
    ];
    
    // Create patients with various conditions
    const conditions = [
      'Eczema',
      'Acne',
      'Psoriasis',
      'Rosacea',
      'Dermatitis'
    ];
    
    // Create patients
    const patientIds = [];
    for (let i = 0; i < patientEmails.length; i++) {
      const { data: userData } = await supabase.functions.invoke('create-test-user', {
        body: {
          email: patientEmails[i],
          password: 'Patient123!',
          role: 'client',
          name: patientNames[i]
        }
      });
      
      if (userData?.userId) {
        patientIds.push(userData.userId);
        console.log(`Created patient: ${patientNames[i]} with ID: ${userData.userId}`);
        
        // Create a chat session for each patient
        const { data: sessionData } = await supabase
          .from('chat_sessions')
          .insert({
            doctor_id: doctorId,
            patient_id: userData.userId,
            started_at: getRandomPastDate(14).toISOString(),
            is_free: Math.random() > 0.5,
            status: 'active',
            last_activity: getRandomPastDate(3).toISOString()
          })
          .select()
          .single();
          
        if (sessionData?.id) {
          console.log(`Created chat session for patient ${patientNames[i]}`);
          
          // Add sample messages to the chat
          const initialMessages = [
            {
              session_id: sessionData.id,
              sender_id: userData.userId,
              message: `Hello doctor, I've been having some issues with ${conditions[i]}. Can you help?`,
              created_at: getRandomPastDate(3).toISOString()
            },
            {
              session_id: sessionData.id,
              sender_id: doctorId,
              message: `Hello ${patientNames[i]}, I'd be happy to help with your ${conditions[i]}. Can you tell me how long you've been experiencing symptoms?`,
              created_at: getRandomPastDate(2).toISOString()
            },
            {
              session_id: sessionData.id,
              sender_id: userData.userId,
              message: `It's been about 2 weeks now and it seems to be getting worse.`,
              created_at: getRandomPastDate(1).toISOString()
            }
          ];
          
          await supabase.from('chat_messages').insert(initialMessages);
        }
      }
    }
    
    // Create a more extensive range of services
    const services = [
      {
        vendor_id: doctorId,
        name: "Initial Dermatology Consultation",
        description: "Comprehensive first visit to assess skin conditions and develop treatment plans",
        duration: 45,
        price: 120.00
      },
      {
        vendor_id: doctorId,
        name: "Skin Cancer Screening",
        description: "Thorough examination to detect potential skin cancers and concerning lesions",
        duration: 30,
        price: 90.00
      },
      {
        vendor_id: doctorId,
        name: "Acne Treatment Session",
        description: "Specialized treatment for acne including extraction and personalized advice",
        duration: 40,
        price: 85.00
      },
      {
        vendor_id: doctorId,
        name: "Eczema Management",
        description: "Assessment and treatment planning for eczema and related conditions",
        duration: 30,
        price: 75.00
      },
      {
        vendor_id: doctorId,
        name: "Cosmetic Dermatology Consultation",
        description: "Discussion of skin rejuvenation options and aesthetic procedures",
        duration: 60,
        price: 150.00
      }
    ];
    
    // Use an edge function to bypass RLS when creating services
    const { data: createdServices } = await supabase.functions.invoke('create-test-services', {
      body: { services }
    });
    
    if (!createdServices?.services || createdServices.services.length === 0) {
      throw new Error("Failed to create services");
    }
    
    console.log(`Created ${createdServices.services.length} services for doctor`);
    
    // Create a mix of upcoming and past appointments with various statuses
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const allReservations = [];
    
    // Create appointments for all patients with all services spread over next 14 days and past 14 days
    for (const patientId of [...patientIds, primaryClientId]) {
      for (const service of createdServices.services) {
        // Create 1-2 future appointments per patient per service
        const numberOfFuture = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberOfFuture; i++) {
          const futureDate = getRandomFutureDate(14);
          allReservations.push({
            client_id: patientId,
            vendor_id: doctorId,
            service_id: service.id,
            date: formatDateString(futureDate),
            time: getRandomTimeSlot(),
            status: Math.random() > 0.7 ? 'confirmed' : 'pending'
          });
        }
        
        // Create 0-2 past appointments per patient per service
        const numberOfPast = Math.floor(Math.random() * 3);
        for (let i = 0; i < numberOfPast; i++) {
          const pastDate = getRandomPastDate(14);
          allReservations.push({
            client_id: patientId,
            vendor_id: doctorId,
            service_id: service.id,
            date: formatDateString(pastDate),
            time: getRandomTimeSlot(),
            status: Math.random() > 0.3 ? 'completed' : 'cancelled'
          });
        }
      }
    }
    
    // Create reservations in batches of 10 to avoid timeout
    const batchSize = 10;
    for (let i = 0; i < allReservations.length; i += batchSize) {
      const batch = allReservations.slice(i, i + batchSize);
      await supabase.functions.invoke('create-test-reservations', {
        body: { reservations: batch }
      });
    }
    
    console.log(`Created ${allReservations.length} appointments for doctor`);
    
    // Create sample payment history
    const paymentData = [];
    for (let i = 0; i < 8; i++) {
      // Alternate between patients
      const patientId = i % 2 === 0 ? primaryClientId : patientIds[i % patientIds.length];
      
      paymentData.push({
        doctor_id: doctorId,
        patient_id: patientId,
        amount: 75 + (Math.floor(Math.random() * 10) * 5), // Random amount between $75 and $120
        doctor_amount: 60 + (Math.floor(Math.random() * 10) * 4), // 80% of total
        commission_amount: 15 + (Math.floor(Math.random() * 10) * 1), // 20% of total
        commission_percentage: 20,
        payment_status: 'completed',
        payment_provider: 'stripe',
        payment_method: 'card',
        transaction_id: `demo-tx-${Date.now()}-${i}`,
        created_at: getRandomPastDate(i * 2 + 1).toISOString()
      });
    }
    
    await supabase.from('chat_payments').insert(paymentData);
    console.log(`Created ${paymentData.length} payment records for doctor`);
    
    return true;
  } catch (error) {
    console.error("Error creating comprehensive doctor data:", error);
    throw error;
  }
};

/**
 * Create services using service role
 */
export const createServices = async (vendorId: string) => {
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

/**
 * Create reservations for services
 */
export const createReservations = async (clientId: string, vendorId: string, services: any[]) => {
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
