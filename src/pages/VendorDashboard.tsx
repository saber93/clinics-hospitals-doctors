import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations } from "@/utils/reservations";
import StatsCards from "@/components/vendor/StatsCards";
import SalesChart from "@/components/vendor/SalesChart";
import ProductStatusChart from "@/components/vendor/ProductStatusChart";
import QuickActions from "@/components/vendor/QuickActions";

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

  const productData = [
    { name: 'Available', value: stats.availableProducts },
    { name: 'With Discount', value: stats.productWithDiscount },
    { name: 'Low Stock', value: stats.lowStockProducts },
    { name: 'Out of Stock', value: stats.totalProducts - stats.availableProducts },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SalesChart salesData={salesByMonth} loading={loading} />
        <ProductStatusChart productData={productData} loading={loading} />
      </div>
      
      <QuickActions />
    </div>
  );
};

export default VendorDashboard;
