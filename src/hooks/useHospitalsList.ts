import { useState, useEffect, useMemo } from 'react';
import { useFavorites } from './useFavorites';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

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
  initialPageSize?: number;
}

export function useHospitalsList({ 
  initialPageSize = 9 
}: UseHospitalsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  const { favorites } = useFavorites();

  const { data: hospitalsData = [], isLoading } = useQuery({
    queryKey: ['hospitals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*');

      if (error) throw error;

      return data.map(hospital => ({
        ...hospital,
        imageUrl: hospital.image_url,
        offerPercentage: hospital.offer_percentage || 0,
        rating: 4.5, // Default rating until we implement ratings
        reviews: 0, // Default reviews until we implement reviews system
        featured: false // Default featured flag
      }));
    }
  });

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    hospitalsData.forEach(hospital => {
      if (hospital.category) categorySet.add(hospital.category);
    });
    return Array.from(categorySet);
  }, [hospitalsData]);

  const filteredHospitals = useMemo(() => {
    let result = [...hospitalsData];
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        hospital => 
          hospital.name.toLowerCase().includes(searchLower) || 
          hospital.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(hospital => hospital.category === categoryFilter);
    }
    
    if (offerFilter) {
      result = result.filter(hospital => 
        hospital.offerPercentage && hospital.offerPercentage > 0
      );
    }
    
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
    setCategoryFilter('all');
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
    categories: ['General', 'Specialty', 'Teaching'], // You might want to fetch these from Supabase later
    clearFilters,
    loadMoreHospitals,
    isLoading
  };
}
