
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EntityList from '@/components/admin/themes/EntityList';

interface ThemeCategoryTabsProps {
  onEditTheme: (entityType: string, id: string) => void;
}

const ThemeCategoryTabs: React.FC<ThemeCategoryTabsProps> = ({ onEditTheme }) => {
  // Initialize with a default tab, but we'll try to load from localStorage
  const [activeTab, setActiveTab] = useState<string>('clinics');
  
  // Load the active tab from localStorage when the component mounts
  useEffect(() => {
    const savedTab = localStorage.getItem('theme-management-active-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save the active tab to localStorage whenever it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('theme-management-active-tab', value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="clinics">Clinics</TabsTrigger>
        <TabsTrigger value="doctors">Doctors</TabsTrigger>
        <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
      </TabsList>
      
      <TabsContent value="clinics">
        <EntityList 
          entityType="clinics"
          title="Clinics"
          onEditTheme={(id) => onEditTheme('clinics', id)}
        />
      </TabsContent>
      
      <TabsContent value="doctors">
        <EntityList 
          entityType="doctors"
          title="Doctors"
          onEditTheme={(id) => onEditTheme('doctors', id)}
        />
      </TabsContent>
      
      <TabsContent value="hospitals">
        <EntityList 
          entityType="hospitals"
          title="Hospitals"
          onEditTheme={(id) => onEditTheme('hospitals', id)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ThemeCategoryTabs;
