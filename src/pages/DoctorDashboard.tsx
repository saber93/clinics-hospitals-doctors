
import React from "react";
import { useDoctorDashboard } from "@/components/doctor/hooks/useDoctorDashboard";
import DoctorStats from "@/components/doctor/DoctorStats";
import DashboardHeader from "@/components/doctor/DashboardHeader";
import DoctorDashboardTabs from "@/components/doctor/DoctorDashboardTabs";

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

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
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
