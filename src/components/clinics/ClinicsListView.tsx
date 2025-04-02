
import React from 'react';
import { Button } from '@/components/ui/button';
import ClinicsList from './ClinicsList';
import { Clinic } from '@/types/clinic';

interface ClinicsListViewProps {
  visibleClinics: Clinic[];
  filteredClinics: Clinic[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  clearFilters: () => void;
  hasMore: boolean;
  loadMoreClinics: () => void;
}

const ClinicsListView: React.FC<ClinicsListViewProps> = ({
  visibleClinics,
  filteredClinics,
  viewMode,
  setViewMode,
  clearFilters,
  hasMore,
  loadMoreClinics
}) => {
  return (
    <>
      <ClinicsList 
        filteredClinics={visibleClinics}
        viewMode={viewMode}
        setViewMode={setViewMode}
        clearFilters={clearFilters}
      />

      {/* Debug info */}
      <div className="mt-4 text-sm text-gray-500">
        Total: {filteredClinics.length}, Showing: {visibleClinics.length}, Has more: {hasMore ? 'Yes' : 'No'}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button 
            onClick={loadMoreClinics}
            className="px-6"
            variant="default"
            size="lg"
          >
            See More Clinics
          </Button>
        </div>
      )}
    </>
  );
};

export default ClinicsListView;
