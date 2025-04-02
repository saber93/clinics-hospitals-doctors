
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivityPanel = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-sm">New vendor <span className="font-medium">Beauty Salon</span> registered</p>
            <span className="ml-auto text-xs text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
            <p className="text-sm">Client <span className="font-medium">Jane Doe</span> made a reservation</p>
            <span className="ml-auto text-xs text-gray-500">5h ago</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
            <p className="text-sm">New special offer created by <span className="font-medium">Spa Center</span></p>
            <span className="ml-auto text-xs text-gray-500">1d ago</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
            <p className="text-sm">New voucher claimed by <span className="font-medium">John Smith</span></p>
            <span className="ml-auto text-xs text-gray-500">2d ago</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/activity-log")}>
          View all activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentActivityPanel;
