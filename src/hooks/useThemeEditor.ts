
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SpecialtyTheme, getSpecialtyTheme } from '@/utils/clinics/specialtyThemes';

interface UseThemeEditorProps {
  entityType?: 'clinics' | 'doctors' | 'hospitals';
  id?: string;
  entity: any | null;
}

export const useThemeEditor = ({ entityType, id, entity }: UseThemeEditorProps) => {
  const [editedTheme, setEditedTheme] = useState<SpecialtyTheme | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const queryClient = useQueryClient();

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

  return {
    editedTheme,
    hasChanges,
    isUpdating: updateThemeMutation.isPending,
    handleThemeChange,
    handleResetToDefault,
    handleSaveTheme
  };
};
