
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DoctorCard from './DoctorCard';
import NoResultsFound from '../clinics/NoResultsFound';

interface DoctorsListProps {
  filteredDoctors: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  clearFilters: () => void;
}

const DoctorsList: React.FC<DoctorsListProps> = ({ 
  filteredDoctors, 
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
          {filteredDoctors.length} specialists found
        </div>
      </div>
      
      <TabsContent value="grid" className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} view="grid" />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="list" className="mt-6">
        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} view="list" />
          ))}
        </div>
      </TabsContent>
      
      {filteredDoctors.length === 0 && (
        <NoResultsFound onClearFilters={clearFilters} />
      )}
    </Tabs>
  );
};

export default DoctorsList;
