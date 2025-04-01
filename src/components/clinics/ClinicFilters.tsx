
import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ClinicFiltersProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryFilter: string) => void;
  offerFilter: string;
  setOfferFilter: (offerFilter: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
}

const ClinicFilters: React.FC<ClinicFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  offerFilter,
  setOfferFilter,
  sortBy,
  setSortBy,
  categories
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by name, specialty, or location..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Category:</span>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-auto flex-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.filter(c => c !== 'all').map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Offers:</span>
          <Select value={offerFilter} onValueChange={setOfferFilter}>
            <SelectTrigger className="w-auto flex-1">
              <SelectValue placeholder="Filter by offers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clinics</SelectItem>
              <SelectItem value="offers">With Offers Only</SelectItem>
              <SelectItem value="no-offers">No Offers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Sort By:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-auto flex-1">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="offers">Best Offers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ClinicFilters;
