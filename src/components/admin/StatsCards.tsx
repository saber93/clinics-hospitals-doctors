
import { Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/vendors")}>
            View all vendors
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">159</div>
          <p className="text-xs text-muted-foreground">+23% from last month</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/clients")}>
            View all clients
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">37</div>
          <p className="text-xs text-muted-foreground">+8% from last week</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/reservations")}>
            View all bookings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatsCards;
