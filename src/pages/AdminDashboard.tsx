
import { useState } from "react";
import { toast } from "sonner";
import { seedTestData } from "@/utils/seedTestData";
import StatsCards from "@/components/admin/StatsCards";
import VendorGrowthChart from "@/components/admin/VendorGrowthChart";
import ServiceCategoriesChart from "@/components/admin/ServiceCategoriesChart";
import RecentActivityPanel from "@/components/admin/RecentActivityPanel";
import SystemStatusPanel from "@/components/admin/SystemStatusPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Layers, MessageSquare } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
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
    } catch (error) {
      toast.dismiss();
      console.error("Error in seed data:", error);
      toast.error("Failed to seed test data");
    }
  };
  
  return (
    <div className="p-6 pt-24 pb-10">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="flex gap-2 items-center justify-center h-24"
          onClick={() => navigate('/admin/blogs')}
        >
          <FileText className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Manage Blog Posts</div>
            <div className="text-sm text-muted-foreground">Add, edit, or remove blog content</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex gap-2 items-center justify-center h-24"
          onClick={() => navigate('/admin/services')}
        >
          <Layers className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Manage Services</div>
            <div className="text-sm text-muted-foreground">Update service offerings</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex gap-2 items-center justify-center h-24"
          onClick={() => navigate('/admin/contact-messages')}
        >
          <MessageSquare className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Contact Messages</div>
            <div className="text-sm text-muted-foreground">View customer inquiries</div>
          </div>
        </Button>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
        <VendorGrowthChart vendorStats={vendorStats} />
        <ServiceCategoriesChart categoryData={categoryData} colors={COLORS} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityPanel />
        <SystemStatusPanel handleSeedData={handleSeedData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
