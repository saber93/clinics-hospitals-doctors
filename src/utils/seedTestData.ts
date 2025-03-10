
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
    
    // Create test accounts with proper error handling
    console.log("Starting account creation process...");
    const adminData = await createUserSafely('admin@skinnect.com', 'Admin123!', 'admin', 'Admin User');
    console.log("Admin account created:", adminData?.userId || 'Failed');
    
    const vendorData = await createUserSafely('vendor@skinnect.com', 'Vendor123!', 'vendor', 'Vendor User');
    console.log("Vendor account created:", vendorData?.userId || 'Failed');
    
    // Use the new doctor email format
    const doctorData = await createUserSafely('dr-mix@skinnect.com', 'Doctor123!', 'doctor', 'Dr. Mix (Demo)');
    console.log("Doctor account created:", doctorData?.userId || 'Failed');
    
    const clientData = await createUserSafely('client@skinnect.com', 'Client123!', 'client', 'Client User');
    console.log("Client account created:", clientData?.userId || 'Failed');
    
    // Create chat settings
    await createChatSettings();
    
    // Only create doctor-specific settings if doctor account was successfully created
    if (doctorData?.userId) {
      console.log(`Creating doctor chat settings for doctor ID: ${doctorData.userId}`);
      await createDoctorChatSettings(doctorData.userId);
      
      // Create multiple chat sessions between doctor and client if client account was created
      if (clientData?.userId) {
        console.log(`Creating chat sessions between doctor ${doctorData.userId} and client ${clientData.userId}`);
        
        // Create a free consultation chat session
        await createFreeChatSession(doctorData.userId, clientData.userId, 2, 6, "consultation");
        
        // Create a skin condition discussion chat session
        await createFreeChatSession(doctorData.userId, clientData.userId, 5, 12, "skin-condition");
        
        // Create a treatment follow-up chat session
        await createFreeChatSession(doctorData.userId, clientData.userId, 1, 2, "follow-up");
      }
    } else {
      console.log("Skipping doctor chat settings creation as doctor account was not created");
    }
    
    // Only create vendor doctor settings if vendor account was successfully created
    if (vendorData?.userId) {
      console.log(`Creating vendor doctor settings for vendor ID: ${vendorData.userId}`);
      await createVendorDoctorSettings(vendorData.userId);
      
      // Create multiple chat sessions between vendor and client if client account was created
      if (clientData?.userId) {
        console.log(`Creating chat sessions between vendor ${vendorData.userId} and client ${clientData.userId}`);
        
        // Create a paid product recommendation chat session
        await createPaidChatSession(vendorData.userId, clientData.userId, 5, 24, "products");
        
        // Create a paid treatment plan chat session
        await createPaidChatSession(vendorData.userId, clientData.userId, 3, 8, "treatment-plan");
      }
    } else {
      console.log("Skipping vendor doctor settings creation as vendor account was not created");
    }
    
    // Only create services and reservations if both required accounts exist
    if (vendorData?.userId && clientData?.userId) {
      console.log(`Creating services for vendor ID: ${vendorData.userId}`);
      const services = await createServices(vendorData.userId);
      if (services && services.length > 0) {
        console.log(`Creating reservations between client ${clientData.userId} and vendor ${vendorData.userId}`);
        await createReservations(clientData.userId, vendorData.userId, services);
      }
    } else {
      console.log("Skipping services and reservations creation as either vendor or client account was not created");
    }
    
    toast.dismiss();
    toast.success("Test accounts and sample data created successfully!\n\nAdmin: admin@skinnect.com / Admin123!\nVendor: vendor@skinnect.com / Vendor123!\nDoctor: dr-mix@skinnect.com / Doctor123!\nClient: client@skinnect.com / Client123!");
    
  } catch (error) {
    toast.dismiss();
    console.error("Error seeding test data:", error);
    toast.error(`Failed to seed test data: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Helper function to safely create a user with proper error handling
 */
const createUserSafely = async (email: string, password: string, role: string, name: string) => {
  try {
    return await createTestUser(email, password, role, name);
  } catch (error) {
    console.error(`Error creating ${role} account:`, error);
    // Return null instead of throwing to allow other operations to continue
    return null;
  }
};
