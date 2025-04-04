
import { useNavigate } from "react-router-dom";
import StatsCards from "@/components/vendor/StatsCards";
import SalesChart from "@/components/vendor/SalesChart";
import ProductStatusChart from "@/components/vendor/ProductStatusChart";
import QuickActions from "@/components/vendor/QuickActions";
import { useVendorDashboardData } from "@/hooks/useVendorDashboardData";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { stats, loading, salesByMonth, productStatusData } = useVendorDashboardData();
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] pt-20">
        <div className="text-center">
          <Loader className="h-16 w-16 mx-auto animate-spin text-primary" />
          <p className="mt-4 text-lg">{t('common.loading')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 pt-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold">{t('vendor.dashboard')}</h2>
        
        <div className="mt-2 sm:mt-0">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => navigate("/products-management")}
          >
            {t('vendor.viewAllProducts')}
          </Button>
        </div>
      </div>
      
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
