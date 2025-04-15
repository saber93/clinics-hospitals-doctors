
import React, { useEffect } from 'react';
import HeroSection from '@/components/clinics/HeroSection';
import ClinicFilters from '@/components/clinics/ClinicFilters';
import ClinicFeatures from '@/components/clinics/ClinicFeatures';
import TestimonialsSection from '@/components/clinics/TestimonialsSection';
import ClinicsHeader from '@/components/clinics/ClinicsHeader';
import ClinicsListView from '@/components/clinics/ClinicsListView';
import { useClinicsList } from '@/hooks/useClinicsList';
import { toast } from 'sonner';

const Clinics = () => {
  // Log on component mount to confirm it's loading correctly
  useEffect(() => {
    console.log("Clinics page component loaded successfully");
  }, []);

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
    isLoading,
    error
  } = useClinicsList({ initialPageSize: 9 });

  // Handle potential errors from the hook
  useEffect(() => {
    if (error) {
      console.error("Error in useClinicsList hook:", error);
      toast.error("Failed to load clinics data", {
        description: "Please try refreshing the page",
        duration: 5000
      });
    }
  }, [error]);

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
