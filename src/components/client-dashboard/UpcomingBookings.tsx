
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BookingItem from "./BookingItem";
import { formatDate } from "./utils/formatting";
import { useClientBookings } from "./hooks/useClientBookings";

const UpcomingBookings = () => {
  const navigate = useNavigate();
  const { upcomingBookings, loading } = useClientBookings();
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>Your upcoming appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <BookingItem 
                key={booking.id} 
                booking={booking} 
                formatDate={formatDate} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-3">You don't have any upcoming appointments</p>
            <Button variant="outline" size="sm" onClick={() => navigate("/reservations")}>
              Book Now
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/my-reservations")}>
          View All Bookings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingBookings;
