
import React from 'react';
import HeroSection from '@/components/doctors/HeroSection';
import DoctorFilters from '@/components/doctors/DoctorFilters';
import DoctorFeatures from '@/components/doctors/DoctorFeatures';
import TestimonialsSection from '@/components/doctors/TestimonialsSection';
import DoctorsHeader from '@/components/doctors/DoctorsHeader';
import DoctorsListView from '@/components/doctors/DoctorsListView';
import { useDoctorsList } from '@/hooks/useDoctorsList';

const Doctors = () => {
  const {
    searchTerm,
    setSearchTerm,
    specialtyFilter,
    setSpecialtyFilter,
    offerFilter,
    setOfferFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredDoctors,
    visibleDoctors,
    hasMore,
    specialties,
    clearFilters,
    loadMoreDoctors
  } = useDoctorsList({ initialPageSize: 9 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added margin-top to push hero section below the navbar */}
      <div className="mt-16">
        <HeroSection />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DoctorsHeader />
        
        <DoctorFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          offerFilter={offerFilter}
          setOfferFilter={setOfferFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          specialties={specialties}
        />
        
        <DoctorsListView
          visibleDoctors={visibleDoctors}
          filteredDoctors={filteredDoctors}
          viewMode={viewMode}
          setViewMode={setViewMode}
          clearFilters={clearFilters}
          hasMore={hasMore}
          loadMoreDoctors={loadMoreDoctors}
        />
      </div>
      
      {/* Features and Testimonials sections */}
      <DoctorFeatures />
      <TestimonialsSection />
    </div>
  );
};

export default Doctors;
