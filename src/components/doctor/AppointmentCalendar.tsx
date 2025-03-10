
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAppointments } from "./hooks/useAppointments";
import { filterAppointmentsByDate } from "./utils/appointmentUtils";
import CalendarPanel from "./CalendarPanel";
import AppointmentList from "./AppointmentList";

interface AppointmentCalendarProps {
  doctorId: string;
}

const AppointmentCalendar = ({ doctorId }: AppointmentCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { allAppointments, loading, appointmentDates, setAppointments } = useAppointments(doctorId);
  
  useEffect(() => {
    // Filter appointments based on selected date
    const filtered = filterAppointmentsByDate(allAppointments, date);
    setAppointments(filtered);
  }, [date, allAppointments, setAppointments]);
  
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
            {filterAppointmentsByDate(allAppointments, date).length} appointments scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentList 
            appointments={filterAppointmentsByDate(allAppointments, date)}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
