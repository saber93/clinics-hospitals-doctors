
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, TagsIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
    <div className="space-y-6 bg-card rounded-lg border p-4 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Search</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clinics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 rounded-full bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TagsIcon className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Filter Options</h3>
        </div>
        <SearchFilter 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          offerFilter={offerFilter} 
          onOfferFilterChange={setOfferFilter} 
        />
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TagsIcon className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Categories</h3>
        </div>
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          selectedSubCategory={selectedSubCategory} 
          onSelectCategory={setSelectedCategory} 
          onSelectSubCategory={setSelectedSubCategory} 
        />
      </div>
      
      {showClearButton && (
        <>
          <Separator />
          <Button variant="outline" onClick={clearFilters} className="w-full hover:bg-muted">
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );
};

export default SidebarFilters;
