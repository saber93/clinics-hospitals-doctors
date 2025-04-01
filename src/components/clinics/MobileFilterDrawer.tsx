
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SearchFilter from './SearchFilter';
import CategoryFilter from './CategoryFilter';
import { Category } from '@/types/clinic';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  setIsOpen,
  searchQuery,
  setSearchQuery,
  offerFilter,
  setOfferFilter,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  categories,
  clearFilters
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg animate-in slide-in-right flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-8">
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
          </div>
        </ScrollArea>
        
        <div className="pt-4 mt-auto border-t">
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
