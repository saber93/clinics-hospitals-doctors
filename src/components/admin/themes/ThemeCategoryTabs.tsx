
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EntityList from '@/components/admin/themes/EntityList';

interface ThemeCategoryTabsProps {
  onEditTheme: (entityType: string, id: string) => void;
}

const ThemeCategoryTabs: React.FC<ThemeCategoryTabsProps> = ({ onEditTheme }) => {
  return (
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
