
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import { Category } from '@/types/clinic';

interface SidebarFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  offerFilter: string;
  setOfferFilter: (filter: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  categories: Category[];
  clearFilters: () => void;
  showClearButton: boolean;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  offerFilter,
  setOfferFilter,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  categories,
  clearFilters,
  showClearButton
}) => {
  return (
    <div className="space-y-6">
      <SearchFilter 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        offerFilter={offerFilter} 
        onOfferFilterChange={setOfferFilter} 
      />
      
      <Separator />
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        selectedSubCategory={selectedSubCategory} 
        onSelectCategory={setSelectedCategory} 
        onSelectSubCategory={setSelectedSubCategory} 
      />
      
      {showClearButton && (
        <>
          <Separator />
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </>
      )}
    </div>
  );
};

export default SidebarFilters;
