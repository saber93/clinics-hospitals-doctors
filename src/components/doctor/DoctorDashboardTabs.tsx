
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientList from "@/components/doctor/PatientList";
import AppointmentCalendar from "@/components/doctor/AppointmentCalendar";
import ConsultationsTab from "@/components/doctor/ConsultationsTab";
import ServicesTab from "@/components/doctor/ServicesTab";
import PaymentsTab from "@/components/doctor/PaymentsTab";
import DoctorProfile from "@/components/doctor/DoctorProfile";

interface DoctorDashboardTabsProps {
  userId: string;
  chatSettings: any;
  stats: {
    totalPatients: number;
    pendingAppointments: number;
    completedAppointments: number;
    chatSessions: number;
  };
  doctorProfile: any;
  services: any[];
  recentPayments: any[];
}

const DoctorDashboardTabs: React.FC<DoctorDashboardTabsProps> = ({
  userId,
  chatSettings,
  stats,
  doctorProfile,
  services,
  recentPayments
}) => {
  return (
    <Tabs defaultValue="patients" className="mt-6">
      <TabsList className="mb-4">
        <TabsTrigger value="patients">My Patients</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
        <TabsTrigger value="consultations">Consultations</TabsTrigger>
        <TabsTrigger value="services">My Services</TabsTrigger>
        <TabsTrigger value="payments">Recent Payments</TabsTrigger>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="patients">
        <PatientList doctorId={userId} />
      </TabsContent>
      
      <TabsContent value="appointments">
        <AppointmentCalendar doctorId={userId} />
      </TabsContent>
      
      <TabsContent value="consultations">
        <ConsultationsTab 
          chatSettings={chatSettings} 
          stats={stats} 
        />
      </TabsContent>
      
      <TabsContent value="services">
        <ServicesTab services={services} />
      </TabsContent>
      
      <TabsContent value="payments">
        <PaymentsTab recentPayments={recentPayments} />
      </TabsContent>
      
      <TabsContent value="profile">
        <DoctorProfile 
          doctorProfile={doctorProfile} 
          chatSettings={chatSettings} 
          stats={stats} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default DoctorDashboardTabs;
