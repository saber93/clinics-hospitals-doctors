
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatSettings, DoctorChatSettings } from "@/types/chat";

// Get chat settings
export const getChatSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('chat_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data as ChatSettings;
  } catch (error) {
    console.error('Error fetching chat settings:', error);
    toast.error('Failed to load chat settings');
    return null;
  }
};

// Get doctor chat settings
export const getDoctorChatSettings = async (doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .select('*')
      .eq('doctor_id', doctorId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    if (!data) {
      // Create default settings if none exist
      const settings = await createDoctorChatSettings(doctorId);
      return settings;
    }
    
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error fetching doctor chat settings:', error);
    toast.error('Failed to load doctor settings');
    return null;
  }
};

// Create default doctor chat settings
export const createDoctorChatSettings = async (doctorId: string) => {
  try {
    const chatSettings = await getChatSettings();
    const sessionPrice = chatSettings ? chatSettings.default_session_price : 50;
    
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .insert({
        doctor_id: doctorId,
        offers_free_consultation: false,
        session_price: sessionPrice
      })
      .select()
      .single();

    if (error) throw error;
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error creating doctor chat settings:', error);
    return null;
  }
};

// Update doctor chat settings
export const updateDoctorChatSettings = async (
  doctorId: string, 
  offersFreeConsultation: boolean, 
  sessionPrice: number | null
) => {
  try {
    const { data, error } = await supabase
      .from('doctor_chat_settings')
      .update({
        offers_free_consultation: offersFreeConsultation,
        session_price: sessionPrice,
        updated_at: new Date().toISOString()
      })
      .eq('doctor_id', doctorId)
      .select()
      .single();

    if (error) throw error;
    toast.success('Settings updated successfully');
    return data as DoctorChatSettings;
  } catch (error) {
    console.error('Error updating doctor chat settings:', error);
    toast.error('Failed to update settings');
    return null;
  }
};
