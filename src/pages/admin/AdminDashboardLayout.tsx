
import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import PageHeader from '@/components/admin/layout/PageHeader';
import SidebarNav from '@/components/admin/layout/SidebarNav';
import AdminBreadcrumb from '@/components/admin/layout/AdminBreadcrumb';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar - Higher z-index than header */}
        <div className="relative z-50">
          <Sidebar>
            <SidebarNav />
          </Sidebar>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header and breadcrumb container - Fixed position with proper z-index */}
          <div className="sticky top-0 z-40 bg-background">
            <PageHeader />
            <AdminBreadcrumb />
          </div>
          
          {/* Content - Add padding-top to create space for the fixed header */}
          <main className="flex-1 overflow-auto z-0 pt-0">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
