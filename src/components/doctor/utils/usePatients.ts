
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Patient {
  id: string;
  name: string;
  last_activity?: string;
  has_upcoming_appointment?: boolean;
  session_id?: string;
}

export const usePatients = (doctorId: string) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      if (!doctorId) return;
      
      try {
        setLoading(true);
        
        // Get patients from chat sessions
        const { data: sessions, error: sessionsError } = await supabase
          .from('chat_sessions')
          .select(`
            id,
            patient_id,
            last_activity
          `)
          .eq('doctor_id', doctorId)
          .order('last_activity', { ascending: false });
          
        if (sessionsError) throw sessionsError;
        
        // Get patient profiles separately
        const patientIds = sessions?.map(session => session.patient_id) || [];
        
        if (patientIds.length === 0) {
          setPatients([]);
          setLoading(false);
          return;
        }
        
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', patientIds);
          
        if (profilesError) throw profilesError;
        
        // Create a map of patient profiles
        const profilesMap = (profilesData || []).reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>);
        
        // Get patients with upcoming appointments
        const { data: appointments, error: appointmentsError } = await supabase
          .from('reservations')
          .select(`
            client_id,
            status,
            date
          `)
          .eq('vendor_id', doctorId)
          .in('status', ['pending', 'confirmed'])
          .gte('date', new Date().toISOString().split('T')[0]); // Today or future dates
          
        if (appointmentsError) throw appointmentsError;
        
        // Create a map of patient IDs with upcoming appointments
        const patientsWithAppointments = new Map();
        appointments?.forEach(appointment => {
          patientsWithAppointments.set(appointment.client_id, true);
        });
        
        // Process unique patients from sessions
        const uniquePatients = new Map();
        
        sessions?.forEach(session => {
          if (!uniquePatients.has(session.patient_id)) {
            const patientProfile = profilesMap[session.patient_id];
            uniquePatients.set(session.patient_id, {
              id: session.patient_id,
              name: patientProfile ? patientProfile.name : 'Unknown Patient',
              last_activity: session.last_activity,
              has_upcoming_appointment: patientsWithAppointments.has(session.patient_id),
              session_id: session.id
            });
          }
        });
        
        setPatients(Array.from(uniquePatients.values()));
      } catch (error) {
        console.error("Error loading patients:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPatients();
  }, [doctorId]);

  return { patients, loading };
};
