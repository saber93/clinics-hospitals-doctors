
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VendorGrowthChartProps {
  vendorStats: Array<{ name: string; count: number }>;
}

const VendorGrowthChart = ({ vendorStats }: VendorGrowthChartProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Vendor Growth</CardTitle>
        <CardDescription>New vendor registrations over time</CardDescription>
      </CardHeader>
      <CardContent className="p-1">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="New Vendors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/reports/vendors")}>
          View detailed report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorGrowthChart;
