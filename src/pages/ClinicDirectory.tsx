import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Category } from "@/types/clinic";
import { useClinicFiltering } from "@/hooks/useClinicFiltering";

// Components
import ClinicDirectoryHeader from "@/components/clinics/ClinicDirectoryHeader";
import ClinicDirectoryLoading from "@/components/clinics/ClinicDirectoryLoading";
import ClinicTabs from "@/components/clinics/ClinicTabs";
import MobileFilterDrawer from "@/components/clinics/MobileFilterDrawer";
import SidebarFilters from "@/components/clinics/SidebarFilters";

const ClinicDirectory = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('categories').select(`
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

  const {
    data: clinics = [],
    isLoading: isClinicsLoading,
    error: clinicsError
  } = useQuery({
    queryKey: ['clinics'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('clinics').select('*');
      if (error) {
        throw error;
      }
      return data.map(clinic => {
        return {
          id: clinic.id,
          name: clinic.name,
          description: clinic.description,
          location: clinic.location,
          category: clinic.category,
          subCategory: clinic.sub_category,
          offerPercentage: clinic.offer_percentage,
          imageUrl: clinic.image_url || "/placeholder.svg",
          rating: 4.5,
          reviews: 0,
          specialties: [],
          featured: false
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

  const {
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
  } = useClinicFiltering({
    clinics,
    activeTab
  });

  const isLoading = isCategoriesLoading || isClinicsLoading;

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-4">
        <ClinicDirectoryHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
        />

        {isLoading && <ClinicDirectoryLoading />}

        {!isLoading && (
          <>
            <div className="flex md:hidden justify-between items-center">
              <Button variant="outline" onClick={() => setIsMobileFilterOpen(true)} className="w-full">
                Filter Options
              </Button>
            </div>

            <MobileFilterDrawer 
              isOpen={isMobileFilterOpen}
              setIsOpen={setIsMobileFilterOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              offerFilter={offerFilter}
              setOfferFilter={setOfferFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              categories={categories}
              clearFilters={clearFilters}
              showClearButton={Boolean(showClearFilters)}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-3">
                {/* Empty div for grid structure */}
              </div>
              
              <div className="md:col-span-9">
                <ClinicTabs 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  filteredClinics={filteredClinics}
                  favorites={favorites}
                  clearFilters={clearFilters}
                />
              </div>

              <div className="hidden md:block md:col-span-3">
                <SidebarFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  offerFilter={offerFilter}
                  setOfferFilter={setOfferFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                  categories={categories}
                  clearFilters={clearFilters}
                  showClearButton={Boolean(showClearFilters)}
                />
              </div>

              <div className="md:col-span-9">
                {/* Content rendered by ClinicTabs component */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClinicDirectory;
