
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Filter, Search, TagsIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
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
  showClearButton: boolean;
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
  clearFilters,
  showClearButton
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg animate-in slide-in-right flex flex-col h-full">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 border-b">
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
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TagsIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Filter Options</h3>
              </div>
              <SearchFilter 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
                offerFilter={offerFilter} 
                onOfferFilterChange={setOfferFilter} 
              />
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TagsIcon className="h-5 w-5 text-primary" />
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
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-background">
          {showClearButton && (
            <Button 
              variant="outline" 
              onClick={clearFilters} 
              className="w-full mb-2 hover:bg-muted"
            >
              Clear All Filters
            </Button>
          )}
          <Button 
            onClick={() => setIsOpen(false)} 
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
