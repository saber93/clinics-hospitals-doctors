
import { useState, useEffect } from 'react';
import { Clinic } from '@/types/clinic';
import { toast } from 'sonner';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on initialization
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteClinics');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorite clinics from localStorage:', error);
        toast.error('Failed to load your favorite clinics');
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoriteClinics', JSON.stringify(favorites));
  }, [favorites]);

  // Check if a clinic is a favorite
  const isFavorite = (clinicId: string) => {
    return favorites.includes(clinicId);
  };

  // Toggle favorite status for a clinic
  const toggleFavorite = (clinicId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(clinicId)) {
        // Remove from favorites
        toast.success('Removed from favorites');
        return prevFavorites.filter(id => id !== clinicId);
      } else {
        // Add to favorites
        toast.success('Added to favorites');
        return [...prevFavorites, clinicId];
      }
    });
  };

  // Get all favorite clinics from a list of clinics
  const getFavoriteClinics = (clinics: Clinic[]) => {
    return clinics.filter(clinic => favorites.includes(clinic.id));
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoriteClinics
  };
};
