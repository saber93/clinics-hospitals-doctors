
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarPanelProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  appointmentDates: Date[];
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ 
  date,
  setDate,
  appointmentDates
}) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default CalendarPanel;
