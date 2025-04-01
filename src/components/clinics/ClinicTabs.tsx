
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import { Clinic } from '@/types/clinic';
import ClinicGrid from './ClinicGrid';

interface ClinicTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredClinics: Clinic[];
  favorites: string[];
  clearFilters: () => void;
}

const ClinicTabs: React.FC<ClinicTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredClinics,
  favorites,
  clearFilters
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Clinics</TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs">
                {favorites.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <div className="text-sm text-muted-foreground">
          {filteredClinics.length} clinics found
        </div>
      </div>
      
      <TabsContent value="all" className="mt-0">
        <ClinicGrid 
          clinics={filteredClinics} 
          emptyMessage="No clinics found" 
          emptyDescription="Try adjusting your filters to find what you're looking for."
          clearFilters={clearFilters}
        />
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-0">
        <ClinicGrid 
          clinics={filteredClinics}
          emptyMessage="No favorite clinics found"
          emptyDescription={
            favorites.length === 0
              ? "You haven't added any clinics to your favorites yet."
              : "Try adjusting your filters to find your favorite clinics."
          }
          clearFilters={clearFilters}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ClinicTabs;
