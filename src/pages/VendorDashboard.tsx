
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Package, Activity, ArrowLeft, Tag, ShoppingBag, Percent, Plus } from "lucide-react";
import { getUserReservations } from "@/utils/reservations";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    lowStockProducts: 0,
    productWithDiscount: 0,
    totalVouchers: 0,
    activeVouchers: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [salesByMonth, setSalesByMonth] = useState([]);
  
  useEffect(() => {
    const fetchVendorStats = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please login to view your dashboard");
          return;
        }
        
        // Fetch products data
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('seller_id', session.user.id);
        
        if (productsError) {
          console.error("Error fetching products:", productsError);
          throw productsError;
        }
        
        // Fetch vouchers data
        const { data: vouchersData, error: vouchersError } = await supabase
          .from('vouchers')
          .select('*')
          .eq('seller_id', session.user.id);
        
        if (vouchersError) {
          console.error("Error fetching vouchers:", vouchersError);
          throw vouchersError;
        }
        
        // Fetch reservations data for overall booking stats
        const reservationsData = await getUserReservations(session.user.id, 'vendor');
        
        // Calculate product stats
        const totalProducts = productsData?.length || 0;
        const availableProducts = productsData?.filter(p => p.is_available)?.length || 0;
        const lowStockProducts = productsData?.filter(p => p.stock_quantity <= (p.low_stock_threshold || 10))?.length || 0;
        const productWithDiscount = productsData?.filter(p => p.discount_percentage > 0)?.length || 0;
        
        // Calculate voucher stats
        const totalVouchers = vouchersData?.length || 0;
        const activeVouchers = vouchersData?.filter(v => v.is_active && (v.end_date ? new Date(v.end_date) > new Date() : true))?.length || 0;
        
        setStats({
          totalProducts,
          availableProducts,
          lowStockProducts,
          productWithDiscount,
          totalVouchers,
          activeVouchers,
          totalBookings: reservationsData?.length || 0
        });
        
        // Generate monthly sales data (mocked for now)
        const monthlyData = [
          { name: 'Jan', sales: Math.floor(Math.random() * 1000) },
          { name: 'Feb', sales: Math.floor(Math.random() * 1000) },
          { name: 'Mar', sales: Math.floor(Math.random() * 1000) },
          { name: 'Apr', sales: Math.floor(Math.random() * 1000) },
          { name: 'May', sales: Math.floor(Math.random() * 1000) },
          { name: 'Jun', sales: Math.floor(Math.random() * 1000) },
          { name: 'Jul', sales: Math.floor(Math.random() * 1000) },
          { name: 'Aug', sales: Math.floor(Math.random() * 1000) },
          { name: 'Sep', sales: Math.floor(Math.random() * 1000) },
          { name: 'Oct', sales: Math.floor(Math.random() * 1000) },
          { name: 'Nov', sales: Math.floor(Math.random() * 1000) },
          { name: 'Dec', sales: Math.floor(Math.random() * 1000) },
        ];
        
        setSalesByMonth(monthlyData);
      } catch (error) {
        console.error("Error fetching vendor stats:", error);
        toast.error("Failed to load vendor statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorStats();
  }, []);

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];
  
  const productData = [
    { name: 'Available', value: stats.availableProducts },
    { name: 'With Discount', value: stats.productWithDiscount },
    { name: 'Low Stock', value: stats.lowStockProducts },
    { name: 'Out of Stock', value: stats.totalProducts - stats.availableProducts },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  <BarChart data={salesByMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Plus size={18} />
            Add New Product
          </h3>
          <p className="text-gray-600 mb-4">Create and list a new product for sale</p>
          <Button variant="default" onClick={() => navigate("/add-product")}>Add Product</Button>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Tag size={18} />
            Create Voucher
          </h3>
          <p className="text-gray-600 mb-4">Generate discount vouchers for your products</p>
          <Button variant="outline" onClick={() => navigate("/add-voucher")}>Create Voucher</Button>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Calendar size={18} />
            Bookings
          </h3>
          <p className="text-gray-600 mb-4">View and manage client bookings</p>
          <Button variant="outline" onClick={() => navigate("/all-bookings")}>View Bookings</Button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
