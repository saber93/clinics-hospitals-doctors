
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

interface SalesChartProps {
  salesData: Array<{ name: string; sales: number }>;
  loading: boolean;
}

const SalesChart = ({ salesData, loading }: SalesChartProps) => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales statistics</CardDescription>
      </CardHeader>
      <CardContent className="p-1">
        <div className="h-[300px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/products-management")}>
          View All Products
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalesChart;
