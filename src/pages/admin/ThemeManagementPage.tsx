
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardLayout from './AdminDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import EntityList from '@/components/admin/themes/EntityList';

const ThemeManagementPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const handleEditTheme = (entityType: string, id: string) => {
    navigate(`/admin/themes/${entityType}/${id}`);
  };

  return (
    <AdminDashboardLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Theme Management</h1>
          <div className="flex space-x-2">
            {/* Additional actions could go here */}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Customize the appearance of Clinics, Doctors, and Hospitals by editing their theme settings.
        </p>
        
        <Tabs defaultValue="clinics" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="clinics">Clinics</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clinics">
            <EntityList 
              entityType="clinics"
              title="Clinics"
              onEditTheme={(id) => handleEditTheme('clinics', id)}
            />
          </TabsContent>
          
          <TabsContent value="doctors">
            <EntityList 
              entityType="doctors"
              title="Doctors"
              onEditTheme={(id) => handleEditTheme('doctors', id)}
            />
          </TabsContent>
          
          <TabsContent value="hospitals">
            <EntityList 
              entityType="hospitals"
              title="Hospitals"
              onEditTheme={(id) => handleEditTheme('hospitals', id)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default ThemeManagementPage;
