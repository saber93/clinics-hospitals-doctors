import { supabase } from "@/integrations/supabase/client";
import { createDemoPatients } from "./seed/patients";
import { createDoctorServices } from "./seed/services";
import { createAppointments } from "./seed/appointments";
import { createDemoPayments } from "./seed/payments";
import { formatDateString } from "./dateUtils";

/**
 * Create comprehensive data for a doctor to showcase day-to-day tasks
 */
export const createComprehensiveDoctorData = async (doctorId: string, primaryClientId: string) => {
  try {
    console.log("Creating comprehensive doctor demo data...");
    
    // First delete any existing demo data for this doctor
    await cleanupExistingDemoData(doctorId);
    
    // Create additional test patients
    const patientIds = await createDemoPatients(doctorId);
    console.log("Created demo patients:", patientIds.length);
    
    // Create services
    const services = await createDoctorServices(doctorId);
    console.log("Created demo services:", services.length);
    
    // Create appointments for all patients including the primary client
    await createAppointments([...patientIds, primaryClientId], doctorId, services);
    
    // Create sample payment history using the created patients
    await createDemoPayments(doctorId, [...patientIds, primaryClientId]);
    
    return true;
  } catch (error) {
    console.error("Error creating comprehensive doctor data:", error);
    throw error;
  }
};

/**
 * Clean up existing demo data before creating new ones
 */
const cleanupExistingDemoData = async (doctorId: string) => {
  try {
    console.log("Cleaning up existing demo data...");
    
    // Delete existing services
    const { error: servicesError } = await supabase
      .from('services')
      .delete()
      .eq('vendor_id', doctorId);
      
    if (servicesError) {
      console.error("Error deleting services:", servicesError);
    }
    
    // Delete existing appointments/reservations
    const { error: reservationsError } = await supabase
      .from('reservations')
      .delete()
      .eq('vendor_id', doctorId);
      
    if (reservationsError) {
      console.error("Error deleting reservations:", reservationsError);
    }
    
    // Delete existing chat payments
    const { error: paymentsError } = await supabase
      .from('chat_payments')
      .delete()
      .eq('doctor_id', doctorId);
      
    if (paymentsError) {
      console.error("Error deleting payments:", paymentsError);
    }
    
    // Add a small delay to ensure deletions are processed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Cleanup completed");
  } catch (error) {
    console.error("Error cleaning up demo data:", error);
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

/**
 * Create demo data for a seller
 */
export const createSellerDemoData = async (sellerId: string) => {
  try {
    // Create demo products
    const productsData = [
      {
        name: "Hydrating Facial Serum",
        description: "Advanced hydration for all skin types with hyaluronic acid and vitamin C.",
        price: 39.99,
        stock_quantity: 45,
        discount_percentage: 15,
        low_stock_threshold: 10,
        seller_id: sellerId
      },
      {
        name: "Anti-Aging Night Cream",
        description: "Rejuvenating formula with retinol and peptides to reduce fine lines and wrinkles.",
        price: 65.00,
        stock_quantity: 30,
        discount_percentage: 0,
        low_stock_threshold: 8,
        seller_id: sellerId
      },
      {
        name: "Gentle Exfoliating Scrub",
        description: "Natural exfoliant with bamboo particles to remove dead skin cells and promote radiance.",
        price: 28.50,
        stock_quantity: 12,
        discount_percentage: 0,
        low_stock_threshold: 15,
        seller_id: sellerId
      },
      {
        name: "SPF 50 Mineral Sunscreen",
        description: "Broad-spectrum protection with zinc oxide and antioxidants.",
        price: 34.99,
        stock_quantity: 5,
        discount_percentage: 10,
        low_stock_threshold: 10,
        seller_id: sellerId
      }
    ];
    
    // Insert products
    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(productsData)
      .select('id');
    
    if (productError) throw productError;
    
    // Create some vouchers
    const vouchersData = [
      {
        code: "WELCOME25",
        discount_percentage: 25,
        is_active: true,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        max_uses: 100,
        current_uses: 0,
        seller_id: sellerId
      },
      {
        code: "SUMMER10",
        discount_percentage: 10,
        is_active: true,
        start_date: new Date().toISOString(),
        end_date: null, // No end date
        max_uses: null, // Unlimited uses
        current_uses: 0,
        seller_id: sellerId
      }
    ];
    
    // Insert vouchers
    const { error: voucherError } = await supabase
      .from('vouchers')
      .insert(vouchersData);
    
    if (voucherError) throw voucherError;
    
    console.log("Created demo data for seller");
    return true;
  } catch (error) {
    console.error("Error creating seller demo data:", error);
    return false;
  }
};
