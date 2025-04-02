
import { useState, useEffect } from 'react';
import { Doctor } from '@/types/doctor';

interface UseDoctorListProps {
  doctorsData: Doctor[];
}

export const useDoctorsList = ({ doctorsData }: UseDoctorListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [visibleDoctors, setVisibleDoctors] = useState<Doctor[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  
  const specialties = ['all', ...new Set(doctorsData.map(doctor => doctor.specialty))];

  useEffect(() => {
    let result = doctorsData;

    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialties?.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (specialtyFilter !== 'all') {
      result = result.filter(doctor => doctor.specialty === specialtyFilter);
    }

    if (offerFilter === 'offers') {
      result = result.filter(doctor => doctor.offerPercentage > 0);
    } else if (offerFilter === 'no-offers') {
      result = result.filter(doctor => doctor.offerPercentage === 0);
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

    setFilteredDoctors(result);
  }, [searchTerm, specialtyFilter, offerFilter, sortBy, doctorsData]);

  useEffect(() => {
    setVisibleDoctors(filteredDoctors.slice(0, visibleCount));
    setHasMore(filteredDoctors.length > visibleCount);
  }, [filteredDoctors, visibleCount]);

  const clearFilters = () => {
    setSearchTerm('');
    setSpecialtyFilter('all');
    setOfferFilter('all');
  };

  const loadMoreDoctors = () => {
    setVisibleCount(prevCount => prevCount + 6);
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
    specialties,
    clearFilters,
    loadMoreDoctors
  };
};
