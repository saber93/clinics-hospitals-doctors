
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatPayment } from "@/types/chat";

// Create a payment record
export const createChatPayment = async (
  sessionId: string,
  patientId: string,
  doctorId: string,
  amount: number,
  commissionPercentage: number,
  paymentMethod: string,
  paymentProvider: string
) => {
  try {
    const commissionAmount = (amount * commissionPercentage) / 100;
    const doctorAmount = amount - commissionAmount;
    
    const { data, error } = await supabase
      .from('chat_payments')
      .insert({
        session_id: sessionId,
        patient_id: patientId,
        doctor_id: doctorId,
        amount,
        commission_percentage: commissionPercentage,
        commission_amount: commissionAmount,
        doctor_amount: doctorAmount,
        payment_method: paymentMethod,
        payment_status: 'pending',
        payment_provider: paymentProvider
      })
      .select()
      .single();

    if (error) throw error;
    return data as ChatPayment;
  } catch (error) {
    console.error('Error creating payment record:', error);
    toast.error('Failed to create payment record');
    return null;
  }
};

// Update payment status
export const updatePaymentStatus = async (
  paymentId: string,
  status: 'pending' | 'completed' | 'failed',
  transactionId?: string
) => {
  try {
    const { data, error } = await supabase
      .from('chat_payments')
      .update({
        payment_status: status,
        transaction_id: transactionId
      })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data as ChatPayment;
  } catch (error) {
    console.error('Error updating payment status:', error);
    toast.error('Failed to update payment status');
    return null;
  }
};

// Get payment methods (Tabby, Tamara, etc.)
export const getPaymentMethods = async () => {
  // This would normally fetch from the database, but for now we'll return hardcoded values
  return [
    {
      id: 'tabby',
      name: 'Tabby',
      logo: '/tabby-logo.png',
      supports_installments: true
    },
    {
      id: 'tamara',
      name: 'Tamara',
      logo: '/tamara-logo.png',
      supports_installments: true
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      logo: '/credit-card.png',
      supports_installments: false
    }
  ];
};
