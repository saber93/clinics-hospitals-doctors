
import React from 'react';
import { LoadMore } from '@/components/ui/load-more';
import HospitalsList from './HospitalsList';

interface HospitalsListViewProps {
  visibleHospitals: any[];
  filteredHospitals: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  clearFilters: () => void;
  hasMore: boolean;
  loadMoreHospitals: () => void;
}

const HospitalsListView: React.FC<HospitalsListViewProps> = ({
  visibleHospitals,
  filteredHospitals,
  viewMode,
  setViewMode,
  clearFilters,
  hasMore,
  loadMoreHospitals
}) => {
  return (
    <>
      <HospitalsList 
        filteredHospitals={visibleHospitals}
        viewMode={viewMode}
        setViewMode={setViewMode}
        clearFilters={clearFilters}
      />

      {/* Load more using the reusable component */}
      <LoadMore 
        hasMore={hasMore}
        onLoadMore={loadMoreHospitals}
        buttonText="See More Hospitals"
      />
    </>
  );
};

export default HospitalsListView;
