
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeEditor from '@/components/admin/themes/ThemeEditor';
import ThemePreview from '@/components/admin/themes/ThemePreview';
import { SpecialtyTheme } from '@/utils/clinics/specialtyThemes';

interface ThemeEditorTabsProps {
  theme: SpecialtyTheme;
  entityType: 'clinics' | 'doctors' | 'hospitals';
  entity: any;
  onThemeChange: (theme: SpecialtyTheme) => void;
}

const ThemeEditorTabs: React.FC<ThemeEditorTabsProps> = ({
  theme,
  entityType,
  entity,
  onThemeChange
}) => {
  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList>
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="json">JSON</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor" className="mt-6">
        <ThemeEditor theme={theme} onChange={onThemeChange} />
      </TabsContent>
      
      <TabsContent value="preview" className="mt-6">
        <ThemePreview 
          theme={theme} 
          entityType={entityType} 
          entity={entity}
        />
      </TabsContent>
      
      <TabsContent value="json" className="mt-6">
        <div className="p-4 border rounded-lg bg-muted/30">
          <pre className="whitespace-pre-wrap overflow-auto max-h-[500px]">
            {JSON.stringify(theme, null, 2)}
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ThemeEditorTabs;
