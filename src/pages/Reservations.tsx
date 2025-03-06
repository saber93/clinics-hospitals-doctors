
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Reservations = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Mock time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  // Mock services
  const services = [
    { id: 1, name: "Facial Treatment", duration: 60, price: 120 },
    { id: 2, name: "Body Massage", duration: 90, price: 150 },
    { id: 3, name: "Skin Consultation", duration: 30, price: 75 },
    { id: 4, name: "Anti-Aging Treatment", duration: 45, price: 200 },
  ];
  
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTimeSlot || !selectedService) {
      toast.error("Please select a date, time and service");
      return;
    }
    
    // Mock booking success
    toast.success("Appointment booked successfully!");
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
    setSelectedService(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">{userType === "client" ? "Book an Appointment" : "Manage Appointments"}</h1>
        
        {userType === "client" ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer ${selectedService === service.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{service.name}</h3>
                        <span className="text-primary font-medium">${service.price}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{service.duration} minutes</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    id="date"
                    className="skinnect-input"
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
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
                  <button 
                    className="skinnect-button-primary w-full"
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTimeSlot || !selectedService}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Appointment Calendar</h2>
              <p className="text-gray-500">View and manage upcoming appointments</p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No appointments scheduled for today</p>
                {userType === "vendor" && (
                  <button className="skinnect-button-outline">
                    Update Available Time Slots
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
