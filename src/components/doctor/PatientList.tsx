
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Calendar, Search } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  last_activity?: string;
  has_upcoming_appointment?: boolean;
  session_id?: string;
}

interface PatientListProps {
  doctorId: string;
}

const PatientList = ({ doctorId }: PatientListProps) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
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
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
        <CardDescription>
          Total of {patients.length} patients under your care
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredPatients.length > 0 ? (
          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <div 
                key={patient.id} 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{patient.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last active: {formatDate(patient.last_activity)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {patient.has_upcoming_appointment && (
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Upcoming Appointment
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate(`/chats/${patient.session_id}`)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate(`/reservations?patient=${patient.id}`)}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
