
import { useState, useEffect } from 'react';
import { Clinic } from '@/types/clinic';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseClinicListProps {
  initialPageSize?: number;
}

export const useClinicsList = ({ initialPageSize = 9 }: UseClinicListProps = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(initialPageSize);

  const { data: clinicsData = [], isLoading, error } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => {
      try {
        console.log('Fetching clinics data...');
        const { data, error } = await supabase
          .from('clinics')
          .select('*');

        if (error) {
          console.error('Error fetching clinics:', error);
          toast.error('Failed to load clinics', {
            description: error.message,
            duration: 5000
          });
          throw error;
        }

        console.log(`Fetched ${data?.length || 0} clinics`);
        return (data || []).map(clinic => ({
          id: clinic.id,
          name: clinic.name,
          description: clinic.description,
          location: clinic.location,
          category: clinic.category,
          subCategory: clinic.sub_category,
          offerPercentage: clinic.offer_percentage || 0,
          imageUrl: clinic.image_url || '/placeholder.svg',
          rating: 4.5, // Default rating until we implement ratings
          reviews: 0, // Default reviews until we implement reviews system
          featured: false, // Default featured flag
          specialties: [], // Default specialties array
          custom_domain: clinic.custom_domain
        } as Clinic));
      } catch (err) {
        console.error('Failed to fetch clinics:', err);
        return []; // Return empty array on error
      }
    },
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
  });

  // Handle and log errors
  useEffect(() => {
    if (error) {
      console.error('Clinics data fetch error:', error);
      toast.error('Failed to load clinics', {
        description: 'Please try again later',
        duration: 5000
      });
    }
  }, [error]);

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

  const visibleClinics = filteredClinics.slice(0, visibleCount);
  const hasMore = filteredClinics.length > visibleCount;

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setOfferFilter('all');
  };

  const loadMoreClinics = () => {
    setVisibleCount(prevCount => prevCount + initialPageSize);
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
    categories: ['Medical', 'Dental', 'Specialty'], // These could be fetched from a categories table
    clearFilters,
    loadMoreClinics,
    isLoading,
    error
  };
};
