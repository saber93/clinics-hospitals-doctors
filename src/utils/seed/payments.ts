
import { supabase } from "@/integrations/supabase/client";
import { getRandomPastDate } from "../dateUtils";

export const createDemoPayments = async (doctorId: string, patientIds: string[]) => {
  try {
    const paymentData = [];
    for (let i = 0; i < 8; i++) {
      // Alternate between patients
      const patientId = i % 2 === 0 ? patientIds[0] : patientIds[i % patientIds.length];
      
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
    return paymentData;
  } catch (error) {
    console.error("Error creating demo payments:", error);
    throw error;
  }
};
