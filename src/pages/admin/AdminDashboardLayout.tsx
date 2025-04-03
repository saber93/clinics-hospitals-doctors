
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileNav from '@/components/admin/AdminMobileNav';

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block min-h-screen">
        <AdminSidebar />
      </div>
      
      <div className="md:hidden">
        <AdminMobileNav />
      </div>
      
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
