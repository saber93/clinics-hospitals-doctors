
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OfferBadge from '../badges/OfferBadge';
import FeaturedBadge from '../badges/FeaturedBadge';
import FavoriteButton from '../badges/FavoriteButton';
import SpecialtyBadges from '../badges/SpecialtyBadges';
import RatingDisplay from '../display/RatingDisplay';
import LocationDisplay from '../display/LocationDisplay';
import { ClinicCardBaseProps } from '../types';

const GridCard: React.FC<ClinicCardBaseProps> = ({ 
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
      <div className="relative h-48 overflow-hidden">
        <img 
          src={clinic.imageUrl} 
          alt={clinic.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <OfferBadge offerPercentage={clinic.offerPercentage} />
        <FeaturedBadge featured={clinic.featured || false} />
        <FavoriteButton 
          isFavorite={isFavorite}
          onClick={handleFavoriteToggle}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{clinic.name}</CardTitle>
          <RatingDisplay rating={clinic.rating || 0} reviews={clinic.reviews || 0} compact />
        </div>
        <LocationDisplay location={clinic.location} />
        <CardDescription className="mt-2 line-clamp-2">
          {clinic.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <SpecialtyBadges specialties={clinic.specialties || []} />
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full hover:bg-primary hover:text-white transition-colors"
          onClick={handleBooking}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GridCard;
