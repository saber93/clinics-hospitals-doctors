
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const loadDoctorStats = async (doctorId: string) => {
  try {
    // Get total patients (unique patients from chat sessions)
    const { data: chatSessions, error: chatError } = await supabase
      .from('chat_sessions')
      .select('patient_id')
      .eq('doctor_id', doctorId);
      
    if (chatError) {
      console.error("Error fetching chat sessions:", chatError);
      throw chatError;
    }
    
    console.log("Chat sessions loaded:", chatSessions?.length || 0);
    
    // Count unique patients
    const uniquePatients = new Set(chatSessions?.map(session => session.patient_id) || []);
    
    // Get appointment counts
    const { data: appointments, error: appointmentsError } = await supabase
      .from('reservations')
      .select('status')
      .eq('vendor_id', doctorId);
      
    if (appointmentsError) {
      console.error("Error fetching appointments:", appointmentsError);
      throw appointmentsError;
    }
    
    console.log("Appointments loaded:", appointments?.length || 0);
    
    const pendingAppointments = appointments?.filter(a => a.status === 'pending' || a.status === 'confirmed').length || 0;
    const completedAppointments = appointments?.filter(a => a.status === 'completed').length || 0;
    
    return {
      totalPatients: uniquePatients.size,
      pendingAppointments,
      completedAppointments,
      chatSessions: chatSessions?.length || 0
    };
  } catch (error) {
    console.error("Error loading doctor stats:", error);
    throw error;
  }
};

export const loadDoctorServices = async (doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('vendor_id', doctorId)
      .order('name');
      
    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
    
    console.log("Services loaded:", data?.length || 0);
    return data || [];
  } catch (error) {
    console.error("Error loading doctor services:", error);
    throw error;
  }
};

export const loadRecentPayments = async (doctorId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_payments')
      .select(`
        id,
        amount,
        doctor_amount,
        payment_status,
        created_at,
        patient_id
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
    
    console.log("Payments loaded:", data?.length || 0);
    
    // Get patient profiles in a separate query
    if (data && data.length > 0) {
      const patientIds = data.map(payment => payment.patient_id);
      
      const { data: patients, error: patientsError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', patientIds);
        
      if (patientsError) {
        console.error("Error fetching patient profiles:", patientsError);
        throw patientsError;
      }
      
      // Create a lookup map for patients
      const patientsMap = (patients || []).reduce((acc, patient) => {
        acc[patient.id] = patient.name;
        return acc;
      }, {} as Record<string, any>);
      
      // Add patient names to payments
      const paymentsWithPatients = data.map(payment => ({
        ...payment,
        patientName: patientsMap[payment.patient_id] || 'Unknown Patient'
      }));
      
      return paymentsWithPatients;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading recent payments:", error);
    throw error;
  }
};
