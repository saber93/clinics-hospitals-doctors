
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HospitalCard from './HospitalCard';
import NoResultsFound from '../clinics/NoResultsFound';

interface HospitalsListProps {
  filteredHospitals: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  clearFilters: () => void;
}

const HospitalsList: React.FC<HospitalsListProps> = ({ 
  filteredHospitals, 
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
          {filteredHospitals.length} hospitals found
        </div>
      </div>
      
      <TabsContent value="grid" className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} view="grid" />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="list" className="mt-6">
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} view="list" />
          ))}
        </div>
      </TabsContent>
      
      {filteredHospitals.length === 0 && (
        <NoResultsFound onClearFilters={clearFilters} />
      )}
    </Tabs>
  );
};

export default HospitalsList;
