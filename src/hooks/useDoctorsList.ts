import { useState } from 'react';
import { Doctor } from '@/types/doctor';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface UseDoctorListProps {
  initialPageSize?: number;
}

export const useDoctorsList = ({ initialPageSize = 9 }: UseDoctorListProps = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(initialPageSize);

  const { data: doctorsData = [], isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*');

      if (error) throw error;

      return (data || []).map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        description: doctor.description,
        location: doctor.location,
        specialty: doctor.specialty,
        subSpecialty: doctor.sub_specialty,
        offerPercentage: doctor.offer_percentage || 0,
        imageUrl: doctor.image_url || '/placeholder.svg',
        rating: 4.5, // Default rating until we implement ratings
        reviews: 0, // Default reviews until we implement reviews system
        specialties: [doctor.specialty], // Convert specialty to array for now
        featured: false, // Default featured flag
        custom_domain: doctor.custom_domain
      } as Doctor));
    }
  });

  const filteredDoctors = doctorsData.filter(doctor => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!doctor.name.toLowerCase().includes(searchLower) &&
          !doctor.description.toLowerCase().includes(searchLower) &&
          !doctor.location.toLowerCase().includes(searchLower) &&
          !doctor.specialties?.some(specialty => specialty.toLowerCase().includes(searchLower))) {
        return false;
      }
    }

    if (specialtyFilter !== 'all' && doctor.specialty !== specialtyFilter) {
      return false;
    }

    if (offerFilter === 'offers' && !doctor.offerPercentage) {
      return false;
    } else if (offerFilter === 'no-offers' && doctor.offerPercentage > 0) {
      return false;
    }

    return true;
  });

  const visibleDoctors = filteredDoctors.slice(0, visibleCount);
  const hasMore = filteredDoctors.length > visibleCount;

  const clearFilters = () => {
    setSearchTerm('');
    setSpecialtyFilter('all');
    setOfferFilter('all');
  };

  const loadMoreDoctors = () => {
    setVisibleCount(prevCount => prevCount + initialPageSize);
  };

  return {
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
    specialties: ['General', 'Cardiology', 'Pediatrics'], // These could be fetched from a specialties table
    clearFilters,
    loadMoreDoctors,
    isLoading
  };
};
