
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-6">
      <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Button variant="outline" onClick={() => navigate("/reservations")}>Book New Appointment</Button>
        <Button variant="outline" onClick={() => navigate("/all-bookings")}>Manage Bookings</Button>
        <Button variant="outline" onClick={() => navigate("/offers")}>Browse Offers</Button>
      </div>
    </div>
  );
};

export default QuickActions;
