
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

interface ProductStatusChartProps {
  productData: Array<{ name: string; value: number }>;
  loading: boolean;
}

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

const ProductStatusChart = ({ productData, loading }: ProductStatusChartProps) => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
        <CardDescription>Distribution of product statuses</CardDescription>
      </CardHeader>
      <CardContent className="p-1">
        <div className="h-[300px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/products-management")}>
          Manage Inventory
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductStatusChart;
