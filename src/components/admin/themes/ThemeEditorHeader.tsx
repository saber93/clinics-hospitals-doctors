
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Undo } from 'lucide-react';

interface ThemeEditorHeaderProps {
  entityName: string;
  entityTypeTitle: string;
  hasChanges: boolean;
  isUpdating: boolean;
  onResetToDefault: () => void;
  onSaveTheme: () => void;
}

const ThemeEditorHeader: React.FC<ThemeEditorHeaderProps> = ({
  entityName,
  entityTypeTitle,
  hasChanges,
  isUpdating,
  onResetToDefault,
  onSaveTheme
}) => {
  const navigate = useNavigate();
  
  return (
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
        <h1 className="text-2xl font-bold">{entityName}</h1>
        <p className="text-muted-foreground">
          {entityTypeTitle} Theme Customization
        </p>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={onResetToDefault}
          disabled={isUpdating}
        >
          <Undo className="h-4 w-4 mr-2" /> Reset to Default
        </Button>
        <Button 
          onClick={onSaveTheme}
          disabled={!hasChanges || isUpdating}
        >
          <Save className="h-4 w-4 mr-2" /> 
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ThemeEditorHeader;
