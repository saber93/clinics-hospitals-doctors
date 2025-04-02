
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ServiceCategoriesChartProps {
  categoryData: Array<{ name: string; value: number }>;
  colors: string[];
}

const ServiceCategoriesChart = ({ categoryData, colors }: ServiceCategoriesChartProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Service Categories</CardTitle>
        <CardDescription>Distribution of service types</CardDescription>
      </CardHeader>
      <CardContent className="p-1">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/reports/categories")}>
          View category analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCategoriesChart;
