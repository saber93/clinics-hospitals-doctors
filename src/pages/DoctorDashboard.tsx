
import React from "react";
import { useDoctorDashboard } from "@/components/doctor/hooks/useDoctorDashboard";
import DoctorStats from "@/components/doctor/DoctorStats";
import DashboardHeader from "@/components/doctor/DashboardHeader";
import DoctorDashboardTabs from "@/components/doctor/DoctorDashboardTabs";
import { toast } from "sonner";

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

  if (!user && !loading) {
    toast.error("Please login as a doctor to view this dashboard");
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
        <p className="mt-2 text-muted-foreground">You must be logged in as a doctor to view this dashboard.</p>
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
      </div>
    );
  }

  return (
    <div className="p-6">
      <DashboardHeader />
      
      <DoctorStats stats={stats} />
      
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
