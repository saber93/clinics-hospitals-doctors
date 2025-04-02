
import React from 'react';
import HeroSection from '@/components/hospitals/HeroSection';
import HospitalFilters from '@/components/hospitals/HospitalFilters';
import HospitalFeatures from '@/components/hospitals/HospitalFeatures';
import TestimonialsSection from '@/components/hospitals/TestimonialsSection';
import HospitalsHeader from '@/components/hospitals/HospitalsHeader';
import HospitalsListView from '@/components/hospitals/HospitalsListView';
import { useHospitalsList } from '@/hooks/useHospitalsList';
import { hospitalsData } from '@/data/hospitalsData';

const Hospitals = () => {
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
    filteredHospitals,
    visibleHospitals,
    hasMore,
    categories,
    clearFilters,
    loadMoreHospitals
  } = useHospitalsList({ hospitalsData });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added margin-top to push hero section below the navbar */}
      <div className="mt-16">
        <HeroSection />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HospitalsHeader />
        
        <HospitalFilters 
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
        
        <HospitalsListView
          visibleHospitals={visibleHospitals}
          filteredHospitals={filteredHospitals}
          viewMode={viewMode}
          setViewMode={setViewMode}
          clearFilters={clearFilters}
          hasMore={hasMore}
          loadMoreHospitals={loadMoreHospitals}
        />
      </div>
      
      {/* Features and Testimonials sections */}
      <HospitalFeatures />
      <TestimonialsSection />
    </div>
  );
};

export default Hospitals;
