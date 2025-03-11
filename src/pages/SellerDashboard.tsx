
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Tag, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    activeVouchers: 0
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to access the seller dashboard");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
      fetchStats(session.user.id);
    };
    
    checkUser();
  }, [navigate]);

  const fetchStats = async (userId: string) => {
    try {
      setLoading(true);
      
      // Fetch total products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, stock_quantity, low_stock_threshold')
        .eq('seller_id', userId);
      
      if (productsError) throw productsError;
      
      // Fetch active vouchers
      const { data: vouchers, error: vouchersError } = await supabase
        .from('vouchers')
        .select('id')
        .eq('seller_id', userId)
        .eq('is_active', true)
        .lt('end_date', new Date().toISOString());
      
      if (vouchersError) throw vouchersError;
      
      // Calculate low stock products
      const lowStock = products?.filter(p => 
        p.stock_quantity <= p.low_stock_threshold
      ).length || 0;
      
      setStats({
        totalProducts: products?.length || 0,
        lowStockProducts: lowStock,
        activeVouchers: vouchers?.length || 0
      });
    } catch (error) {
      console.error("Error fetching seller stats:", error);
      toast.error("Failed to load seller statistics");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Products in your catalog</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => navigate("/products")}
            >
              Manage Products
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${stats.lowStockProducts > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Products below threshold</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => navigate("/products?filter=low-stock")}
            >
              View Low Stock
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Vouchers</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.activeVouchers}</div>
            <p className="text-xs text-muted-foreground">Current active vouchers</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => navigate("/seller-vouchers")}
            >
              Manage Vouchers
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your seller account</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => navigate("/products/new")}>
              <Package className="mr-2 h-4 w-4" /> Add New Product
            </Button>
            <Button onClick={() => navigate("/seller-vouchers/new")}>
              <Tag className="mr-2 h-4 w-4" /> Create Voucher
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent product updates</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : stats.totalProducts === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No products added yet</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate("/products/new")}
                  className="mt-2"
                >
                  Add your first product
                </Button>
              </div>
            ) : (
              <div className="text-sm">
                <p className="text-muted-foreground">Recent product activities will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
