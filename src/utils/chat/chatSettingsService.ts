
import { supabase } from "@/integrations/supabase/client";

/**
 * Create chat settings if they don't exist
 */
export const createChatSettings = async () => {
  console.log("Creating chat settings...");
  try {
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
    } else {
      console.log("Chat settings already exist, skipping creation");
    }
  } catch (error) {
    console.error("Error checking/creating chat settings:", error);
    throw error;
  }
};

/**
 * Create doctor chat settings
 */
export const createDoctorChatSettings = async (doctorId: string) => {
  console.log("Creating doctor chat settings...");
  try {
    // Check if settings already exist for this doctor
    const { data: existingSettings } = await supabase
      .from('doctor_chat_settings')
      .select()
      .eq('doctor_id', doctorId)
      .maybeSingle();
      
    if (existingSettings) {
      console.log("Doctor chat settings already exist, updating instead of creating");
    }
    
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
  } catch (error) {
    console.error("Error creating doctor chat settings:", error);
    throw error;
  }
};

/**
 * Create vendor doctor chat settings
 */
export const createVendorDoctorSettings = async (vendorId: string) => {
  console.log("Creating vendor doctor chat settings...");
  try {
    // Check if settings already exist for this vendor
    const { data: existingSettings } = await supabase
      .from('doctor_chat_settings')
      .select()
      .eq('doctor_id', vendorId)
      .maybeSingle();
      
    if (existingSettings) {
      console.log("Vendor doctor chat settings already exist, updating instead of creating");
    }
    
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
  } catch (error) {
    console.error("Error creating vendor doctor settings:", error);
    throw error;
  }
};
