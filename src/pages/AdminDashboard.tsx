
import React from "react";
import { toast } from "sonner";
import { seedTestData } from "@/utils/seedTestData";
import StatsCards from "@/components/admin/StatsCards";
import VendorGrowthChart from "@/components/admin/VendorGrowthChart";
import ServiceCategoriesChart from "@/components/admin/ServiceCategoriesChart";
import RecentActivityPanel from "@/components/admin/RecentActivityPanel";
import SystemStatusPanel from "@/components/admin/SystemStatusPanel";
import AdminDashboardLayout from "@/pages/admin/AdminDashboardLayout";

const AdminDashboard = () => {
  const vendorStats = [
    { name: 'Jan', count: 5 },
    { name: 'Feb', count: 8 },
    { name: 'Mar', count: 12 },
    { name: 'Apr', count: 10 },
    { name: 'May', count: 15 },
    { name: 'Jun', count: 24 },
  ];
  
  const categoryData = [
    { name: 'Beauty', value: 35 },
    { name: 'Health', value: 25 },
    { name: 'Fitness', value: 20 },
    { name: 'Wellness', value: 15 },
    { name: 'Spa', value: 5 },
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  const handleSeedData = async () => {
    try {
      toast.loading("Generating test data...");
      await seedTestData();
      toast.dismiss();
      toast.success("Test data generated successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error in seed data:", error);
      toast.error("Failed to seed test data");
    }
  };
  
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <StatsCards />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <VendorGrowthChart vendorStats={vendorStats} />
          <ServiceCategoriesChart categoryData={categoryData} colors={COLORS} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivityPanel />
          <SystemStatusPanel handleSeedData={handleSeedData} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
