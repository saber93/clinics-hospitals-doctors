
import { supabase } from "@/integrations/supabase/client";
import { getRandomPastDate } from "../dateUtils";

export const createDemoPatients = async (doctorId: string) => {
  try {
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
    
    const conditions = [
      'Eczema',
      'Acne',
      'Psoriasis',
      'Rosacea',
      'Dermatitis'
    ];
    
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
    
    return patientIds;
  } catch (error) {
    console.error("Error creating demo patients:", error);
    throw error;
  }
};
