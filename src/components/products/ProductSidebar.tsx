
import React from 'react';
import { Search, TagsIcon, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProductSidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;
  onlyDiscounted: boolean;
  setOnlyDiscounted: (value: boolean) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  categories: string[];
  maxPrice: number;
  clearFilters: () => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  categoryFilter,
  setCategoryFilter,
  onlyAvailable,
  setOnlyAvailable,
  onlyDiscounted,
  setOnlyDiscounted,
  sortOrder,
  setSortOrder,
  categories,
  maxPrice,
  clearFilters
}) => {
  return (
    <div className="space-y-6 bg-card rounded-lg border p-4 shadow-sm h-fit sticky top-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Search</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 rounded-full bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Price Range</h3>
        </div>
        
        <div className="space-y-4">
          <Slider 
            value={[priceRange[0], priceRange[1]]} 
            min={0} 
            max={maxPrice} 
            step={5}
            onValueChange={(value) => setPriceRange([value[0], value[1]])} 
            className="py-4"
          />
          
          <div className="flex items-center justify-between">
            <div className="border rounded-md px-2.5 py-1.5 text-sm">
              ${priceRange[0]}
            </div>
            <div className="text-sm text-muted-foreground">to</div>
            <div className="border rounded-md px-2.5 py-1.5 text-sm">
              ${priceRange[1]}
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TagsIcon className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Categories</h3>
        </div>
        <RadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="font-medium">Sort By</h3>
        <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="featured" id="featured" />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-low" id="price-low" />
              <Label htmlFor="price-low">Price: Low to High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-high" id="price-high" />
              <Label htmlFor="price-high">Price: High to Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name" id="name" />
              <Label htmlFor="name">Name</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="font-medium">Filter Options</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="available-switch" className="flex-grow">In Stock Only</Label>
          <Switch
            id="available-switch"
            checked={onlyAvailable}
            onCheckedChange={setOnlyAvailable}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="discount-switch" className="flex-grow">On Sale</Label>
          <Switch
            id="discount-switch"
            checked={onlyDiscounted}
            onCheckedChange={setOnlyDiscounted}
          />
        </div>
      </div>
      
      <Button variant="outline" onClick={clearFilters} className="w-full hover:bg-muted">
        Clear All Filters
      </Button>
    </div>
  );
};

export default ProductSidebar;
