
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, Percent, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatsCardsProps {
  stats: {
    totalProducts: number;
    availableProducts: number;
    lowStockProducts: number;
    productWithDiscount: number;
    totalVouchers: number;
    activeVouchers: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">Total products in inventory</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => navigate("/products-management")}
          >
            Manage Products
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.lowStockProducts}</div>
          <p className="text-xs text-muted-foreground">Products below threshold</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => navigate("/products-management?filter=low-stock")}
          >
            View Low Stock
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Discounts</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.productWithDiscount}</div>
          <p className="text-xs text-muted-foreground">Products with discount</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => navigate("/products-management?filter=discounted")}
          >
            View Discounted
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Vouchers</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeVouchers} / {stats.totalVouchers}</div>
          <p className="text-xs text-muted-foreground">Active / Total vouchers</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => navigate("/vouchers")}
          >
            Manage Vouchers
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatsCards;
