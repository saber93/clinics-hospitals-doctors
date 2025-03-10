
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar as CalendarIcon } from "lucide-react";

interface Appointment {
  id: string;
  client: {
    id: string;
    name: string;
  };
  service: {
    name: string;
  };
  date: string;
  time: string;
  status: string;
}

interface AppointmentCalendarProps {
  doctorId: string;
}

const AppointmentCalendar = ({ doctorId }: AppointmentCalendarProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointmentDates, setAppointmentDates] = useState<Date[]>([]);
  
  useEffect(() => {
    const loadAppointments = async () => {
      if (!doctorId) return;
      
      try {
        setLoading(true);
        
        // Fetch reservations
        const { data: reservationsData, error: reservationsError } = await supabase
          .from('reservations')
          .select(`
            id,
            date,
            time,
            status,
            client_id,
            service_id
          `)
          .eq('vendor_id', doctorId)
          .order('date', { ascending: true });
          
        if (reservationsError) throw reservationsError;
        
        // Get client profiles in a separate query
        const clientIds = reservationsData
          .map(item => item.client_id)
          .filter(Boolean) as string[];
          
        const { data: clientsData, error: clientsError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', clientIds.length > 0 ? clientIds : ['00000000-0000-0000-0000-000000000099']);
        
        if (clientsError) throw clientsError;
        
        // Create a lookup map for clients
        const clientsMap = (clientsData || []).reduce((acc, client) => {
          acc[client.id] = client;
          return acc;
        }, {} as Record<string, any>);
        
        // Get services in a separate query
        const serviceIds = reservationsData
          .map(item => item.service_id)
          .filter(Boolean) as string[];
          
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, name')
          .in('id', serviceIds.length > 0 ? serviceIds : ['00000000-0000-0000-0000-000000000099']);
        
        if (servicesError) throw servicesError;
        
        // Create a lookup map for services
        const servicesMap = (servicesData || []).reduce((acc, service) => {
          acc[service.id] = service;
          return acc;
        }, {} as Record<string, any>);
        
        // Map the data to our expected structure
        const formattedAppointments = (reservationsData || []).map(item => ({
          id: item.id,
          client: {
            id: item.client_id || 'unknown',
            name: item.client_id && clientsMap[item.client_id] 
              ? clientsMap[item.client_id].name 
              : 'Unknown Client'
          },
          service: {
            name: item.service_id && servicesMap[item.service_id] 
              ? servicesMap[item.service_id].name 
              : 'Unknown Service'
          },
          date: item.date,
          time: item.time,
          status: item.status
        }));
        
        setAllAppointments(formattedAppointments);
        
        // Create a list of dates with appointments for calendar highlighting
        const dates = formattedAppointments.map(appointment => 
          new Date(appointment.date)
        );
        setAppointmentDates(dates);
        
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointments();
  }, [doctorId]);
  
  useEffect(() => {
    // Filter appointments based on selected date
    if (date) {
      const selectedDateStr = date.toISOString().split('T')[0];
      const filtered = allAppointments.filter(a => a.date === selectedDateStr);
      setAppointments(filtered);
    }
  }, [date, allAppointments]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>
            Select a date to view appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              booked: appointmentDates
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: 'rgb(243, 232, 255)',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/reservations')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Manage Schedule
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {date ? (
              <>
                Appointments for {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </>
            ) : 'All Appointments'}
          </CardTitle>
          <CardDescription>
            {appointments.length} appointments scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  className="p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{appointment.service.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {appointment.client.name}
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {appointment.time}
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/all-bookings?id=${appointment.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No appointments for this date</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-4"
                onClick={() => navigate('/reservations')}
              >
                Manage Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
