
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/clinics/CategoryFilter";
import ClinicCard from "@/components/clinics/ClinicCard";
import SearchFilter from "@/components/clinics/SearchFilter";
import { categories, clinics } from "@/data/clinicData";
import { X } from "lucide-react";
import { Clinic } from "@/types/clinic";
import { Separator } from "@/components/ui/separator";

const ClinicDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [offerFilter, setOfferFilter] = useState("all");
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>(clinics);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter clinics based on search, category, and offer filters
  useEffect(() => {
    const filtered = clinics.filter((clinic) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        !selectedCategory || clinic.category === selectedCategory;

      // Sub-category filter
      const matchesSubCategory =
        !selectedSubCategory || clinic.subCategory === selectedSubCategory;

      // Offer filter
      const matchesOffer =
        offerFilter === "all" ||
        (offerFilter === "offers" && clinic.offerPercentage > 0) ||
        (offerFilter === "no-offers" && clinic.offerPercentage === 0);

      return matchesSearch && matchesCategory && matchesSubCategory && matchesOffer;
    });

    setFilteredClinics(filtered);
  }, [searchQuery, selectedCategory, selectedSubCategory, offerFilter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setOfferFilter("all");
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Clinic Directory</h1>
          <p className="text-muted-foreground">Browse and discover clinics and their special offers</p>
        </div>

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
          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
              <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg animate-in slide-in-right">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
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
                  
                  <Separator />
                  
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

          {/* Desktop Sidebar */}
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

          {/* Clinics Grid */}
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
      </div>
    </div>
  );
};

export default ClinicDirectory;
