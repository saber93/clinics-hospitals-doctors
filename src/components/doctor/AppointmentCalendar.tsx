
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAppointments } from "./hooks/useAppointments";
import { filterAppointmentsByDate } from "./utils/appointmentUtils";
import CalendarPanel from "./CalendarPanel";
import AppointmentList from "./AppointmentList";
import { toast } from "sonner";

interface AppointmentCalendarProps {
  doctorId: string;
}

const AppointmentCalendar = ({ doctorId }: AppointmentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { allAppointments, loading, appointmentDates, setAppointments } = useAppointments(doctorId);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  
  useEffect(() => {
    if (!doctorId) {
      console.error("No doctor ID provided to AppointmentCalendar");
      toast.error("Missing doctor information");
      return;
    }
    
    console.log("AppointmentCalendar - doctorId:", doctorId);
    console.log("AppointmentCalendar - date changed or appointments loaded:", date?.toISOString(), "total appointments:", allAppointments?.length || 0);
    
    // Filter appointments based on selected date
    const filtered = filterAppointmentsByDate(allAppointments, date);
    console.log("Setting filtered appointments:", filtered.length);
    setFilteredAppointments(filtered);
    setAppointments(filtered);
  }, [date, allAppointments, doctorId, setAppointments]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CalendarPanel 
        date={date}
        setDate={setDate}
        appointmentDates={appointmentDates}
      />
      
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
            {filteredAppointments.length} appointments scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentList 
            appointments={filteredAppointments}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
