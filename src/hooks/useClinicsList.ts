
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Clinic } from '@/types/clinic';

interface UseClinicListProps {
  clinicsData?: Clinic[];
}

export const useClinicsList = ({ clinicsData: initialData }: UseClinicListProps = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: clinicsData = [], isLoading } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('*');

      if (error) throw error;

      // Transform the database data to match our Clinic interface
      return data.map(clinic => ({
        id: clinic.id,
        name: clinic.name,
        description: clinic.description,
        location: clinic.location,
        category: clinic.category,
        subCategory: clinic.sub_category,
        offerPercentage: clinic.offer_percentage || 0,
        imageUrl: clinic.image_url,
        rating: 4.5, // Default rating until we implement ratings
        reviews: 0, // Default reviews until we implement reviews system
        featured: false, // Default featured flag
        specialties: [], // Add default specialties array
        custom_domain: clinic.custom_domain
      } as Clinic));
    },
    initialData: initialData ? () => initialData : undefined
  });

  const filteredClinics = clinicsData.filter(clinic => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!clinic.name.toLowerCase().includes(searchLower) &&
          !clinic.description.toLowerCase().includes(searchLower) &&
          !clinic.location.toLowerCase().includes(searchLower) &&
          !clinic.specialties?.some(specialty => specialty.toLowerCase().includes(searchLower))) {
        return false;
      }
    }

    if (categoryFilter !== 'all' && clinic.category !== categoryFilter) {
      return false;
    }

    if (offerFilter === 'offers' && !clinic.offerPercentage) {
      return false;
    } else if (offerFilter === 'no-offers' && clinic.offerPercentage > 0) {
      return false;
    }

    return true;
  });

  // Sort the filtered clinics based on the selected sort option
  if (sortBy === 'rating') {
    filteredClinics.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'reviews') {
    filteredClinics.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  } else if (sortBy === 'offers') {
    filteredClinics.sort((a, b) => b.offerPercentage - a.offerPercentage);
  } else if (sortBy === 'featured') {
    filteredClinics.sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
  }

  const visibleClinics = filteredClinics.slice(0, visibleCount);
  const hasMore = filteredClinics.length > visibleCount;

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
    categories: ['Dental', 'Medical', 'Specialist'], // You might want to fetch these from Supabase later
    clearFilters,
    loadMoreClinics,
    isLoading
  };
};
