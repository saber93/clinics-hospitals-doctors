
import { useState, useEffect } from 'react';
import { Clinic } from '@/types/clinic';
import { useFavorites } from './useFavorites';

interface UseClinicFilteringProps {
  clinics: Clinic[];
  activeTab: string;
}

export const useClinicFiltering = ({ clinics, activeTab }: UseClinicFilteringProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [offerFilter, setOfferFilter] = useState("all");
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const { favorites, getFavoriteClinics } = useFavorites();

  useEffect(() => {
    if (clinics.length === 0) return;
    
    let filtered = clinics.filter(clinic => {
      const matchesSearch = searchQuery === "" || 
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        clinic.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
        clinic.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) || 
        clinic.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = !selectedCategory || clinic.category === selectedCategory;
      const matchesSubCategory = !selectedSubCategory || clinic.subCategory === selectedSubCategory;
      const matchesOffer = offerFilter === "all" || 
        offerFilter === "offers" && clinic.offerPercentage > 0 || 
        offerFilter === "no-offers" && clinic.offerPercentage === 0;
        
      return matchesSearch && matchesCategory && matchesSubCategory && matchesOffer;
    });
    
    if (activeTab === "favorites") {
      filtered = getFavoriteClinics(filtered);
    }
    
    setFilteredClinics(filtered);
  }, [searchQuery, selectedCategory, selectedSubCategory, offerFilter, clinics, activeTab, favorites]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setOfferFilter("all");
  };

  const showClearFilters = searchQuery || selectedCategory || selectedSubCategory || offerFilter !== "all";

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    offerFilter,
    setOfferFilter,
    filteredClinics,
    clearFilters,
    showClearFilters,
    favorites
  };
};
