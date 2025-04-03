
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardLayout from './AdminDashboardLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Save, Undo } from 'lucide-react';
import ThemeEditor from '@/components/admin/themes/ThemeEditor';
import ThemePreview from '@/components/admin/themes/ThemePreview';
import { SpecialtyTheme, getSpecialtyTheme } from '@/utils/clinics/specialtyThemes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ThemeEditorPage = () => {
  const { entityType, id } = useParams<{entityType: string; id: string}>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [isAdmin, navigate]);

  // State for the theme being edited
  const [editedTheme, setEditedTheme] = useState<SpecialtyTheme | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
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

  // Update theme mutation
  const updateThemeMutation = useMutation({
    mutationFn: async (theme: SpecialtyTheme) => {
      if (!entityType || !id) throw new Error("Missing entity type or ID");
      
      const { error } = await supabase
        .from(entityType)
        .update({ theme })
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Theme saved successfully");
      queryClient.invalidateQueries({ queryKey: [`${entityType}`, id] });
      setHasChanges(false);
    },
    onError: (error) => {
      toast.error(`Failed to save theme: ${error.message}`);
    }
  });

  // Initialize edited theme when entity data is loaded
  useEffect(() => {
    if (entity) {
      // Get default theme based on category/specialty
      const categoryField = entityType === 'doctors' ? 'specialty' : 'category';
      const subCategoryField = entityType === 'doctors' ? 'sub_specialty' : 'sub_category';
      
      // Use existing theme or generate default
      const currentTheme = entity.theme || 
        getSpecialtyTheme(entity[categoryField], entity[subCategoryField]);
      
      setEditedTheme(currentTheme);
    }
  }, [entity, entityType]);

  // Handle theme changes
  const handleThemeChange = (theme: SpecialtyTheme) => {
    setEditedTheme(theme);
    setHasChanges(true);
  };

  // Reset to default theme
  const handleResetToDefault = () => {
    if (!entity) return;
    
    const categoryField = entityType === 'doctors' ? 'specialty' : 'category';
    const subCategoryField = entityType === 'doctors' ? 'sub_specialty' : 'sub_category';
    
    const defaultTheme = getSpecialtyTheme(entity[categoryField], entity[subCategoryField], null);
    setEditedTheme(defaultTheme);
    setHasChanges(true);
  };

  // Save theme
  const handleSaveTheme = () => {
    if (editedTheme) {
      updateThemeMutation.mutate(editedTheme);
    }
  };

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <div className="container py-6 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (!entity || !editedTheme) {
    return (
      <AdminDashboardLayout>
        <div className="container py-6">
          <Button onClick={() => navigate('/admin/themes')} variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Theme Management
          </Button>
          <div className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Entity not found</h2>
              <p className="text-muted-foreground">The requested {entityType} could not be found.</p>
            </div>
          </div>
        </div>
      </AdminDashboardLayout>
    );
  }

  const entityTypeTitle = entityType === 'doctors' ? 'Doctor' : 
                          entityType === 'clinics' ? 'Clinic' : 'Hospital';

  return (
    <AdminDashboardLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <Button 
              onClick={() => navigate('/admin/themes')} 
              variant="ghost"
              size="sm"
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h1 className="text-2xl font-bold">{entity.name}</h1>
            <p className="text-muted-foreground">
              {entityTypeTitle} Theme Customization
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleResetToDefault}
              disabled={updateThemeMutation.isPending}
            >
              <Undo className="h-4 w-4 mr-2" /> Reset to Default
            </Button>
            <Button 
              onClick={handleSaveTheme}
              disabled={!hasChanges || updateThemeMutation.isPending}
            >
              <Save className="h-4 w-4 mr-2" /> 
              {updateThemeMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-6">
            <ThemeEditor theme={editedTheme} onChange={handleThemeChange} />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-6">
            <ThemePreview 
              theme={editedTheme} 
              entityType={entityType as 'clinics' | 'doctors' | 'hospitals'} 
              entity={entity}
            />
          </TabsContent>
          
          <TabsContent value="json" className="mt-6">
            <div className="p-4 border rounded-lg bg-muted/30">
              <pre className="whitespace-pre-wrap overflow-auto max-h-[500px]">
                {JSON.stringify(editedTheme, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default ThemeEditorPage;
