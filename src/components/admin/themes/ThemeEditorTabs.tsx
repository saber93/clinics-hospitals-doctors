
import React, { useState, useEffect } from 'react';
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
  // Initialize with a default tab, but we'll try to load from localStorage
  const [activeTab, setActiveTab] = useState<string>('editor');

  // Load the active tab from localStorage when the component mounts
  useEffect(() => {
    const savedTab = localStorage.getItem('theme-editor-active-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save the active tab to localStorage whenever it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('theme-editor-active-tab', value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
