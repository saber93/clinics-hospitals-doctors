
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatSession } from "@/types/chat";

// Fetch chat sessions for the current user
export const fetchUserChatSessions = async (userId: string, isDoctor: boolean = false) => {
  try {
    const field = isDoctor ? 'doctor_id' : 'patient_id';
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        profiles!chat_sessions_patient_id_fkey(name),
        doctor:profiles!chat_sessions_doctor_id_fkey(name)
      `)
      .eq(field, userId)
      .order('last_activity', { ascending: false });

    if (error) throw error;
    
    // Transform the data to match our ChatSession type
    const typedData = data.map(session => ({
      ...session,
      status: session.status as "active" | "expired" | "completed",
      patient: session.profiles,
      doctor: session.doctor
    })) as unknown as ChatSession[];
    
    return typedData;
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    toast.error('Failed to load chat sessions');
    return [];
  }
};

// Create a new chat session
export const createChatSession = async (patientId: string, doctorId: string, isFree: boolean = false) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        patient_id: patientId,
        doctor_id: doctorId,
        is_free: isFree,
        status: 'active',
        started_at: new Date().toISOString(),
        last_activity: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatSession;
  } catch (error) {
    console.error('Error creating chat session:', error);
    toast.error('Failed to create chat session');
    return null;
  }
};

// Get a chat session by ID
export const getChatSessionById = async (sessionId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        profiles!chat_sessions_patient_id_fkey(name),
        doctor:profiles!chat_sessions_doctor_id_fkey(name)
      `)
      .eq('id', sessionId)
      .single();

    if (error) throw error;
    
    return {
      ...data,
      status: data.status as "active" | "expired" | "completed",
      patient: data.profiles,
      doctor: data.doctor
    } as ChatSession;
  } catch (error) {
    console.error('Error fetching chat session:', error);
    toast.error('Failed to load chat session');
    return null;
  }
};

// Update session last activity timestamp
export const updateSessionActivity = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('chat_sessions')
      .update({
        last_activity: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating session activity:', error);
    return false;
  }
};

// Mark all messages in a session as read for a user
export const markAllMessagesAsRead = async (sessionId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .update({
        is_read: true
      })
      .eq('session_id', sessionId)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
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
