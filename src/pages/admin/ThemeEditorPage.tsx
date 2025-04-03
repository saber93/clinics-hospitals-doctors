
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardLayout from './AdminDashboardLayout';
import ThemeEditorHeader from '@/components/admin/themes/ThemeEditorHeader';
import ThemeEditorTabs from '@/components/admin/themes/ThemeEditorTabs';
import ThemeEditorSkeleton from '@/components/admin/themes/ThemeEditorSkeleton';
import ThemeEntityNotFound from '@/components/admin/themes/ThemeEntityNotFound';
import { useThemeEditor } from '@/hooks/useThemeEditor';

const ThemeEditorPage = () => {
  const { entityType, id } = useParams<{entityType: string; id: string}>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isAdmin, navigate]);

  // Fetch entity data
  const { data: entity, isLoading } = useQuery({
    queryKey: [`${entityType}`, id],
    queryFn: async () => {
      if (!entityType || !id) return null;
      
      const { data, error } = await supabase
        .from(entityType)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching ${entityType}:`, error);
        throw error;
      }
      
      return data;
    },
    enabled: !!entityType && !!id && isAdmin
  });

  const {
    editedTheme,
    hasChanges,
    isUpdating,
    handleThemeChange,
    handleResetToDefault,
    handleSaveTheme
  } = useThemeEditor({ entityType, id, entity });

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <ThemeEditorSkeleton />
      </AdminDashboardLayout>
    );
  }

  if (!entity || !editedTheme) {
    return (
      <AdminDashboardLayout>
        <ThemeEntityNotFound entityType={entityType} />
      </AdminDashboardLayout>
    );
  }

  const entityTypeTitle = entityType === 'doctors' ? 'Doctor' : 
                          entityType === 'clinics' ? 'Clinic' : 'Hospital';

  return (
    <AdminDashboardLayout>
      <div className="container py-6 space-y-6">
        <ThemeEditorHeader 
          entityName={entity.name}
          entityTypeTitle={entityTypeTitle}
          hasChanges={hasChanges}
          isUpdating={isUpdating}
          onResetToDefault={handleResetToDefault}
          onSaveTheme={handleSaveTheme}
        />
        
        <ThemeEditorTabs 
          theme={editedTheme}
          entityType={entityType as 'clinics' | 'doctors' | 'hospitals'}
          entity={entity}
          onThemeChange={handleThemeChange}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default ThemeEditorPage;
