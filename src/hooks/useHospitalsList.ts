
import { useState, useEffect, useMemo } from 'react';
import { useFavorites } from './useFavorites';

interface Hospital {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  subCategory?: string;
  offerPercentage?: number;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  specialties?: string[];
  featured?: boolean;
}

interface UseHospitalsListProps {
  hospitalsData: Hospital[];
  initialPageSize?: number;
}

export function useHospitalsList({ 
  hospitalsData, 
  initialPageSize = 9 
}: UseHospitalsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [offerFilter, setOfferFilter] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  const { favorites } = useFavorites();

  // Extract unique categories from data
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    hospitalsData.forEach(hospital => {
      if (hospital.category) categorySet.add(hospital.category);
    });
    return Array.from(categorySet);
  }, [hospitalsData]);

  // Apply filters
  const filteredHospitals = useMemo(() => {
    let result = [...hospitalsData];
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        hospital => 
          hospital.name.toLowerCase().includes(searchLower) || 
          hospital.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Category filter
    if (categoryFilter) {
      result = result.filter(hospital => hospital.category === categoryFilter);
    }
    
    // Offer filter
    if (offerFilter) {
      result = result.filter(hospital => 
        hospital.offerPercentage && hospital.offerPercentage > 0
      );
    }
    
    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
    }
    
    return result;
  }, [hospitalsData, searchTerm, categoryFilter, offerFilter, sortBy]);

  // Pagination
  const [visibleHospitals, setVisibleHospitals] = useState<Hospital[]>([]);
  
  useEffect(() => {
    setVisibleHospitals(filteredHospitals.slice(0, pageSize));
  }, [filteredHospitals, pageSize]);

  const loadMoreHospitals = () => {
    setPageSize(prev => prev + initialPageSize);
  };

  const hasMore = visibleHospitals.length < filteredHospitals.length;

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setOfferFilter(false);
    setSortBy('featured');
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
    filteredHospitals,
    visibleHospitals,
    hasMore,
    categories,
    clearFilters,
    loadMoreHospitals,
  };
}
