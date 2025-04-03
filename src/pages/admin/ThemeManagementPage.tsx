
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardLayout from './AdminDashboardLayout';
import ThemeManagementContent from '@/components/admin/themes/ThemeManagementContent';

const ThemeManagementPage: React.FC = () => {
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <AdminDashboardLayout>
      <ThemeManagementContent />
    </AdminDashboardLayout>
  );
};

export default ThemeManagementPage;
