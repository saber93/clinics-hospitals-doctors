
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OfferBadge from '../badges/OfferBadge';
import FavoriteButton from '../badges/FavoriteButton';
import SpecialtyBadges from '../badges/SpecialtyBadges';
import RatingDisplay from '../display/RatingDisplay';
import LocationDisplay from '../display/LocationDisplay';
import CategoryBadges from '../display/CategoryBadges';
import { ClinicCardBaseProps } from '../types';

const ListCard: React.FC<ClinicCardBaseProps> = ({ 
  clinic, 
  handleClinicSelect, 
  handleBooking,
  handleFavoriteToggle,
  isFavorite
}) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClinicSelect}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4 h-48 md:h-auto">
          <img 
            src={clinic.imageUrl} 
            alt={clinic.name}
            className="w-full h-full object-cover"
          />
          <OfferBadge offerPercentage={clinic.offerPercentage} />
          <FavoriteButton 
            isFavorite={isFavorite}
            onClick={handleFavoriteToggle}
          />
        </div>
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{clinic.name}</h3>
              <LocationDisplay location={clinic.location} />
            </div>
            <RatingDisplay rating={clinic.rating || 0} reviews={clinic.reviews || 0} />
          </div>
          
          <p className="text-gray-600 mb-3">{clinic.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            <CategoryBadges category={clinic.category} subCategory={clinic.subCategory} />
            <SpecialtyBadges specialties={clinic.specialties || []} limit={(clinic.specialties || []).length} />
          </div>
          
          <Button 
            className="mt-2"
            onClick={handleBooking}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListCard;
