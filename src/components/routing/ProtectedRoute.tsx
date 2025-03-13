
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // If user is accessing generic dashboard, redirect to role-specific dashboard
  if (location.pathname === '/dashboard') {
    // Get user role from metadata
    const userRole = session.user?.user_metadata?.role || 'client';
    
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />;
      case 'vendor':
        return <Navigate to="/vendor-dashboard" replace />;
      case 'center':
        return <Navigate to="/center-dashboard" replace />;
      case 'client':
        return <Navigate to="/client-dashboard" replace />;
      default:
        // For any other role or if role is not set
        return <>{children}</>;
    }
  }

  return <>{children}</>;
};
