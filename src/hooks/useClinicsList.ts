
import { useState, useEffect, useCallback } from 'react';
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
  const [retryCount, setRetryCount] = useState(0);

  // Function to fetch clinics data with error handling
  const fetchClinics = useCallback(async () => {
    try {
      console.log('Fetching clinics data...');
      
      // Add a small delay to avoid potential race conditions
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
      
      // If we haven't retried too many times, set up for a retry
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
      }
      
      // Return empty array to avoid breaking the UI
      return []; 
    }
  }, [retryCount]);

  const { data: clinicsData = [], isLoading, error } = useQuery({
    queryKey: ['clinics', retryCount],
    queryFn: fetchClinics,
    retry: 3, // Retry failed requests 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
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

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(initialPageSize);
  }, [searchTerm, categoryFilter, offerFilter, initialPageSize]);

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

  // Calculate visible clinics based on the current page size
  const visibleClinics = filteredClinics.slice(0, visibleCount);
  const hasMore = filteredClinics.length > visibleCount;

  // Function to clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('all');
    setOfferFilter('all');
  }, []);

  // Function to load more clinics
  const loadMoreClinics = useCallback(() => {
    setVisibleCount(prevCount => prevCount + initialPageSize);
  }, [initialPageSize]);

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
