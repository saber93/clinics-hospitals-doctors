
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

const VendorPanel = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Appointment Management</h2>
        <p className="text-gray-500">Manage your availability and appointment settings</p>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <CalendarCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Your Appointments</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Set your available time slots, services, and manage incoming appointments
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/all-bookings')}>
              View All Bookings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPanel;
