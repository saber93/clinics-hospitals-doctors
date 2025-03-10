
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatSession } from "@/types/chat";
import { formatSessionData, handleSessionError } from "./utils/sessionHelpers";

// Fetch chat sessions for the current user
export const fetchUserChatSessions = async (userId: string, isDoctor: boolean = false) => {
  try {
    const field = isDoctor ? 'doctor_id' : 'patient_id';
    
    // Modified query to avoid relationship issues
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        patient:patient_id(id, name),
        doctor:doctor_id(id, name)
      `)
      .eq(field, userId)
      .order('last_activity', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match our ChatSession type with proper type safety
    const typedData = data.map(session => formatSessionData(session)) as ChatSession[];
    
    return typedData;
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    toast.error('Failed to load chat sessions');
    return [];
  }
};

// Get a chat session by ID
export const getChatSessionById = async (sessionId: string) => {
  try {
    // Modified query to avoid relationship issues
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        patient:patient_id(id, name),
        doctor:doctor_id(id, name)
      `)
      .eq('id', sessionId)
      .maybeSingle();

    if (error) throw error;
    
    if (!data) {
      return null;
    }
    
    // Create a properly formatted session object
    const formattedSession = formatSessionData(data);
    
    return formattedSession;
  } catch (error) {
    return handleSessionError(error, 'Failed to load chat session');
  }
};

// Check if a free session exists between patient and doctor
export const checkFreeSessionExists = async (patientId: string, doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .eq('is_free', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows returned
    return !!data;
  } catch (error) {
    console.error('Error checking free session:', error);
    return false;
  }
};
