
import React from 'react';
import { Button } from '@/components/ui/button';
import ClinicCard from './ClinicCard';
import { Clinic } from '@/types/clinic';

interface ClinicGridProps {
  clinics: Clinic[];
  emptyMessage: string;
  emptyDescription: string;
  clearFilters: () => void;
}

const ClinicGrid: React.FC<ClinicGridProps> = ({ 
  clinics, 
  emptyMessage, 
  emptyDescription,
  clearFilters 
}) => {
  if (clinics.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground mb-4">
          {emptyDescription}
        </p>
        <Button onClick={clearFilters}>Clear All Filters</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clinics.map(clinic => (
        <div key={clinic.id} className="fade-in-up appear">
          <ClinicCard 
            clinic={{
              id: clinic.id,
              name: clinic.name,
              description: clinic.description,
              category: clinic.category,
              subCategory: clinic.subCategory,
              location: clinic.location,
              rating: clinic.rating || 0,
              reviews: clinic.reviews || 0,
              offerPercentage: clinic.offerPercentage,
              imageUrl: clinic.imageUrl || "/placeholder.svg",
              specialties: clinic.specialties || [],
              featured: clinic.featured || false
            }}
            view="grid" 
          />
        </div>
      ))}
    </div>
  );
};

export default ClinicGrid;
