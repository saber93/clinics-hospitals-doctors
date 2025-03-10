
import { supabase } from "@/integrations/supabase/client";

/**
 * Create a chat session
 */
export const createChatSession = async (patientId: string, doctorId: string, isFree: boolean, daysAgo: number, hoursAgo: number) => {
  console.log("Creating chat session...");
  try {
    // Check if doctor and patient exist before creating session
    const { data: doctorExists, error: doctorError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', doctorId)
      .maybeSingle();
      
    if (doctorError || !doctorExists) {
      throw new Error(`Doctor with ID ${doctorId} does not exist`);
    }
    
    const { data: patientExists, error: patientError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', patientId)
      .maybeSingle();
      
    if (patientError || !patientExists) {
      throw new Error(`Patient with ID ${patientId} does not exist`);
    }
    
    // Check if session already exists between these users
    const { data: existingSession } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .maybeSingle();
      
    if (existingSession) {
      console.log("Chat session already exists between these users, skipping creation");
      return existingSession;
    }
    
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
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

/**
 * Create payment record for a chat session
 */
export const createPaymentRecord = async (sessionId: string, clientId: string, vendorId: string) => {
  console.log("Creating payment record...");
  
  const { error: paymentError } = await supabase
    .from('chat_payments')
    .insert({
      session_id: sessionId,
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
};
