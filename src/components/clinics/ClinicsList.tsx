
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClinicCard from './ClinicCard';
import NoResultsFound from './NoResultsFound';

interface ClinicsListProps {
  filteredClinics: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  clearFilters: () => void;
}

const ClinicsList: React.FC<ClinicsListProps> = ({ 
  filteredClinics, 
  viewMode, 
  setViewMode,
  clearFilters
}) => {
  return (
    <Tabs defaultValue={viewMode} onValueChange={setViewMode} className="mb-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <div className="text-sm text-muted-foreground">
          {filteredClinics.length} clinics found
        </div>
      </div>
      
      <TabsContent value="grid" className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} view="grid" />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="list" className="mt-6">
        <div className="space-y-4">
          {filteredClinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} view="list" />
          ))}
        </div>
      </TabsContent>
      
      {filteredClinics.length === 0 && (
        <NoResultsFound onClearFilters={clearFilters} />
      )}
    </Tabs>
  );
};

export default ClinicsList;
