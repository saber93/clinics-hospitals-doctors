
import React from 'react';
import HeroSection from '@/components/clinics/HeroSection';
import ClinicFilters from '@/components/clinics/ClinicFilters';
import ClinicFeatures from '@/components/clinics/ClinicFeatures';
import TestimonialsSection from '@/components/clinics/TestimonialsSection';
import ClinicsHeader from '@/components/clinics/ClinicsHeader';
import ClinicsListView from '@/components/clinics/ClinicsListView';
import { useClinicsList } from '@/hooks/useClinicsList';

const Clinics = () => {
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    offerFilter,
    setOfferFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredClinics,
    visibleClinics,
    hasMore,
    categories,
    clearFilters,
    loadMoreClinics,
    isLoading
  } = useClinicsList({ initialPageSize: 9 });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-16">
        <HeroSection />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ClinicsHeader />
        
        <ClinicFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          offerFilter={offerFilter}
          setOfferFilter={setOfferFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
        
        <ClinicsListView
          visibleClinics={visibleClinics}
          filteredClinics={filteredClinics}
          viewMode={viewMode}
          setViewMode={setViewMode as (mode: string) => void}
          clearFilters={clearFilters}
          hasMore={hasMore}
          loadMoreClinics={loadMoreClinics}
        />
      </div>
      
      <ClinicFeatures />
      <TestimonialsSection />
    </div>
  );
};

export default Clinics;
