
import React from "react";
import { useDoctorDashboard } from "@/components/doctor/hooks/useDoctorDashboard";
import DoctorStats from "@/components/doctor/DoctorStats";
import DashboardHeader from "@/components/doctor/DashboardHeader";
import DoctorDashboardTabs from "@/components/doctor/DoctorDashboardTabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { seedTestData } from "@/utils/seedTestData";
import { AlertCircle } from "lucide-react";

const DoctorDashboard = () => {
  const { 
    loading, 
    stats, 
    chatSettings, 
    user, 
    doctorProfile, 
    services, 
    recentPayments 
  } = useDoctorDashboard();

  console.log("Doctor Dashboard - loading:", loading);
  console.log("Doctor Dashboard - stats:", stats);
  console.log("Doctor Dashboard - user:", user);
  console.log("Doctor Dashboard - doctorProfile:", doctorProfile);
  console.log("Doctor Dashboard - services:", services);
  console.log("Doctor Dashboard - recentPayments:", recentPayments);

  const handleSeedTestData = async () => {
    try {
      await seedTestData();
      // Refresh the page to reload the dashboard with the new data
      window.location.reload();
    } catch (error) {
      console.error("Error seeding test data:", error);
      toast.error("Failed to seed test data");
    }
  };

  if (!user && !loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
        <p className="mt-2 text-muted-foreground">You must be logged in as a doctor to view this dashboard.</p>
        <div className="mt-6">
          <Button onClick={handleSeedTestData} variant="default">
            Create Demo Doctor Account
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!doctorProfile) {
    toast.error("Doctor profile not found");
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Profile Not Found</h2>
        <p className="mt-2 text-muted-foreground">Unable to load doctor profile. Please try again later.</p>
        <div className="mt-6">
          <Button onClick={handleSeedTestData} variant="default">
            Create Demo Data
          </Button>
        </div>
      </div>
    );
  }

  // Check if there is no data to display
  const hasNoData = 
    stats.totalPatients === 0 && 
    stats.pendingAppointments === 0 && 
    services.length === 0 && 
    recentPayments.length === 0;

  return (
    <div className="p-6">
      <DashboardHeader />
      
      {hasNoData && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Dashboard is empty</h3>
            <p className="text-amber-700 text-sm mt-1">
              Click the button below to create comprehensive demo data to see how a doctor can manage their day-to-day tasks.
            </p>
            <Button
              onClick={handleSeedTestData}
              variant="default"
              className="mt-3 bg-amber-600 hover:bg-amber-700"
            >
              Generate Doctor Demo Data
            </Button>
          </div>
        </div>
      )}
      
      <DoctorStats stats={stats} />
      
      {!hasNoData && (
        <div className="mt-6 mb-4 flex justify-end">
          <Button onClick={handleSeedTestData} variant="outline" size="sm">
            Refresh Demo Data
          </Button>
        </div>
      )}
      
      <DoctorDashboardTabs
        userId={user?.id}
        chatSettings={chatSettings}
        stats={stats}
        doctorProfile={doctorProfile}
        services={services}
        recentPayments={recentPayments}
      />
    </div>
  );
};

export default DoctorDashboard;
