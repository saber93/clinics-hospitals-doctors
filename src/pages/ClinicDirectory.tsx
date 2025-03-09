import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/clinics/CategoryFilter";
import ClinicCard from "@/components/clinics/ClinicCard";
import SearchFilter from "@/components/clinics/SearchFilter";
import { X, Search } from "lucide-react";
import { Clinic, Category } from "@/types/clinic";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ClinicDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [offerFilter, setOfferFilter] = useState("all");
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          image_url,
          sub_categories(id, name)
        `);
        
      if (error) {
        throw error;
      }
      
      return data.map((category): Category => ({
        id: category.id,
        name: category.name,
        imageUrl: category.image_url,
        subCategories: category.sub_categories.map(sub => ({
          id: sub.id,
          name: sub.name
        }))
      }));
    }
  });

  const { data: clinics = [], isLoading: isClinicsLoading, error: clinicsError } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      return data.map((clinic): Clinic => {
        console.log(`Clinic: ${clinic.name}, Image URL: ${clinic.image_url}`);
        
        return {
          id: clinic.id,
          name: clinic.name,
          description: clinic.description,
          location: clinic.location,
          category: clinic.category,
          subCategory: clinic.sub_category,
          offerPercentage: clinic.offer_percentage,
          imageUrl: clinic.image_url || "/placeholder.svg"
        };
      });
    }
  });

  useEffect(() => {
    if (categoriesError) {
      toast.error("Failed to load categories");
      console.error(categoriesError);
    }
    
    if (clinicsError) {
      toast.error("Failed to load clinics");
      console.error(clinicsError);
    }
  }, [categoriesError, clinicsError]);

  useEffect(() => {
    if (clinics.length === 0) return;
    
    const filtered = clinics.filter((clinic) => {
      const matchesSearch =
        searchQuery === "" ||
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || clinic.category === selectedCategory;

      const matchesSubCategory =
        !selectedSubCategory || clinic.subCategory === selectedSubCategory;

      const matchesOffer =
        offerFilter === "all" ||
        (offerFilter === "offers" && clinic.offerPercentage > 0) ||
        (offerFilter === "no-offers" && clinic.offerPercentage === 0);

      return matchesSearch && matchesCategory && matchesSubCategory && matchesOffer;
    });

    setFilteredClinics(filtered);
  }, [searchQuery, selectedCategory, selectedSubCategory, offerFilter, clinics]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setOfferFilter("all");
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="md:flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Clinic Directory</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-muted-foreground">Browse and discover clinics and their special offers</p>
              
              {!isCategoriesLoading && !isClinicsLoading && (
                <div className="relative w-full md:flex-1 md:max-w-[400px] md:ml-4 flex-shrink-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search clinics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {(isCategoriesLoading || isClinicsLoading) && (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}

        {!isCategoriesLoading && !isClinicsLoading && (
          <>
            <div className="flex md:hidden justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full"
              >
                Filter Options
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                  <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg animate-in slide-in-right flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
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
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="hidden md:block md:col-span-3 space-y-6">
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
                
                {(searchQuery || selectedCategory || selectedSubCategory || offerFilter !== "all") && (
                  <>
                    <Separator />
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </>
                )}
              </div>

              <div className="md:col-span-9">
                {filteredClinics.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No clinics found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClinics.map((clinic) => (
                      <div key={clinic.id} className="fade-in-up appear">
                        <ClinicCard clinic={clinic} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClinicDirectory;
