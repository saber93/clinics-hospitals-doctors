
import React from 'react';
import { LoadMore } from '@/components/ui/load-more';
import DoctorsList from './DoctorsList';
import { Doctor } from '@/types/doctor';

interface DoctorsListViewProps {
  visibleDoctors: Doctor[];
  filteredDoctors: Doctor[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  clearFilters: () => void;
  hasMore: boolean;
  loadMoreDoctors: () => void;
}

const DoctorsListView: React.FC<DoctorsListViewProps> = ({
  visibleDoctors,
  filteredDoctors,
  viewMode,
  setViewMode,
  clearFilters,
  hasMore,
  loadMoreDoctors
}) => {
  return (
    <>
      <DoctorsList 
        filteredDoctors={visibleDoctors}
        viewMode={viewMode}
        setViewMode={setViewMode}
        clearFilters={clearFilters}
      />

      <LoadMore 
        hasMore={hasMore}
        onLoadMore={loadMoreDoctors}
        buttonText="See More Specialists"
      />
    </>
  );
};

export default DoctorsListView;
