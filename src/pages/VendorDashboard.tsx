
import { useNavigate } from "react-router-dom";
import StatsCards from "@/components/vendor/StatsCards";
import SalesChart from "@/components/vendor/SalesChart";
import ProductStatusChart from "@/components/vendor/ProductStatusChart";
import QuickActions from "@/components/vendor/QuickActions";
import { useVendorDashboardData } from "@/hooks/useVendorDashboardData";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { stats, loading, salesByMonth, productStatusData } = useVendorDashboardData();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SalesChart salesData={salesByMonth} loading={loading} />
        <ProductStatusChart productData={productStatusData} loading={loading} />
      </div>
      
      <QuickActions />
    </div>
  );
};

export default VendorDashboard;
