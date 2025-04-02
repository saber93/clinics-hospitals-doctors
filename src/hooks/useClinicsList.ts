
import { useState, useEffect } from 'react';
import { Clinic } from '@/types/clinic';

interface UseClinicListProps {
  clinicsData: Clinic[];
}

export const useClinicsList = ({ clinicsData }: UseClinicListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredClinics, setFilteredClinics] = useState(clinicsData);
  const [visibleClinics, setVisibleClinics] = useState<Clinic[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  
  const categories = ['all', ...new Set(clinicsData.map(clinic => clinic.category))];

  useEffect(() => {
    let result = clinicsData;

    if (searchTerm) {
      result = result.filter(clinic => 
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialties?.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(clinic => clinic.category === categoryFilter);
    }

    if (offerFilter === 'offers') {
      result = result.filter(clinic => clinic.offerPercentage > 0);
    } else if (offerFilter === 'no-offers') {
      result = result.filter(clinic => clinic.offerPercentage === 0);
    }

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      result = [...result].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortBy === 'offers') {
      result = [...result].sort((a, b) => b.offerPercentage - a.offerPercentage);
    } else if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
    }

    setFilteredClinics(result);
  }, [searchTerm, categoryFilter, offerFilter, sortBy, clinicsData]);

  useEffect(() => {
    // Update visible clinics whenever the filtered clinics change or visibleCount changes
    setVisibleClinics(filteredClinics.slice(0, visibleCount));
    // Check if there are more clinics to show
    setHasMore(filteredClinics.length > visibleCount);
    
    console.log('Filtered clinics:', filteredClinics.length);
    console.log('Visible count:', visibleCount);
    console.log('Has more:', filteredClinics.length > visibleCount);
  }, [filteredClinics, visibleCount]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setOfferFilter('all');
  };

  const loadMoreClinics = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return {
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
    loadMoreClinics
  };
};
