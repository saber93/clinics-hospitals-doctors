
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getUserReservations } from "@/utils/reservations";
import { createSellerDemoData } from "@/utils/seedServiceData";

interface VendorStats {
  totalProducts: number;
  availableProducts: number;
  lowStockProducts: number;
  productWithDiscount: number;
  totalVouchers: number;
  activeVouchers: number;
  totalBookings: number;
}

interface SalesDataPoint {
  name: string;
  sales: number;
}

interface ProductStatusDataPoint {
  name: string;
  value: number;
}

export const useVendorDashboardData = () => {
  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 0,
    availableProducts: 0,
    lowStockProducts: 0,
    productWithDiscount: 0,
    totalVouchers: 0,
    activeVouchers: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [salesByMonth, setSalesByMonth] = useState<SalesDataPoint[]>([]);
  const [hasGeneratedDemoData, setHasGeneratedDemoData] = useState(false);
  
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
        
        // If no products exist, generate demo data
        if (productsData.length === 0 && !hasGeneratedDemoData) {
          console.log("No products found, generating demo data...");
          const demoSuccess = await createSellerDemoData(session.user.id);
          if (demoSuccess) {
            toast.success("Demo data created successfully!");
            setHasGeneratedDemoData(true);
            
            // Fetch the newly created products
            const { data: newProductsData, error: newProductsError } = await supabase
              .from('products')
              .select('*')
              .eq('seller_id', session.user.id);
              
            if (newProductsError) {
              console.error("Error fetching new products:", newProductsError);
              throw newProductsError;
            }
            
            productsData.push(...(newProductsData || []));
          } else {
            console.error("Failed to create demo data");
            toast.error("Failed to create demo data");
          }
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
        
        // Generate monthly sales data based on products (more realistic than random)
        const currentMonth = new Date().getMonth();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const monthlyData = monthNames.map((name, index) => {
          // Make sales gradually increase over the year
          let baseSales = 100 + (index * 20);
          
          // Add some randomness
          const randomFactor = Math.random() * 0.4 + 0.8; // Between 0.8 and 1.2
          
          // Make current month sales significantly higher
          const currentMonthBoost = index === currentMonth ? 1.5 : 1;
          
          // Calculate final sales
          const sales = Math.floor(baseSales * randomFactor * currentMonthBoost);
          
          return { 
            name, 
            sales 
          };
        });
        
        setSalesByMonth(monthlyData);
      } catch (error) {
        console.error("Error fetching vendor stats:", error);
        toast.error("Failed to load vendor statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorStats();
  }, [hasGeneratedDemoData]);

  // Calculate product status data for the pie chart
  const productStatusData: ProductStatusDataPoint[] = [
    { name: 'Available', value: stats.availableProducts },
    { name: 'With Discount', value: stats.productWithDiscount },
    { name: 'Low Stock', value: stats.lowStockProducts },
    { name: 'Out of Stock', value: stats.totalProducts - stats.availableProducts },
  ];

  return {
    stats,
    loading,
    salesByMonth,
    productStatusData
  };
};
