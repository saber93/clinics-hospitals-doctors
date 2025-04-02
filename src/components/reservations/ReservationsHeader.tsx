
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { List, ArrowLeft } from "lucide-react";

interface ReservationsHeaderProps {
  clinicName?: string;
}

const ReservationsHeader = ({ clinicName }: ReservationsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="mr-4 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">
          {clinicName ? `Book at ${clinicName}` : "Book an Appointment"}
        </h1>
      </div>
      <Button 
        variant="outline" 
        onClick={() => navigate('/all-bookings')}
        className="flex items-center"
      >
        <List className="mr-2 h-4 w-4" />
        View All Bookings
      </Button>
    </div>
  );
};

export default ReservationsHeader;
