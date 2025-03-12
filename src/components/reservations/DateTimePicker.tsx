
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DateTimePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (time: string | null) => void;
  timeSlots: string[];
  handleBookAppointment: () => void;
  selectedService: string | null;
}

const DateTimePicker = ({ 
  selectedDate, 
  setSelectedDate, 
  selectedTimeSlot, 
  setSelectedTimeSlot, 
  timeSlots,
  handleBookAppointment,
  selectedService
}: DateTimePickerProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input 
          type="date" 
          id="date"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
        />
      </div>
      
      {selectedDate && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`p-2 text-sm border rounded ${selectedTimeSlot === time ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary/50'}`}
                onClick={() => setSelectedTimeSlot(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <Button
          className="w-full"
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTimeSlot || !selectedService}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DateTimePicker;
