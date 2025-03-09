
import { toast } from "sonner";
import { createChatSettings, createDoctorChatSettings, createVendorDoctorSettings, createFreeChatSession, createPaidChatSession } from "./seedChatData";
import { createServices, createReservations } from "./seedServiceData";
import { createTestUser } from "./seedUserData";

/**
 * Function to seed test data for the application
 */
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
