
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OfferBadge from './badges/OfferBadge';
import FeaturedBadge from './badges/FeaturedBadge';
import FavoriteButton from './badges/FavoriteButton';
import SpecialtyBadges from './badges/SpecialtyBadges';
import RatingDisplay from './display/RatingDisplay';
import LocationDisplay from './display/LocationDisplay';
import CategoryBadges from './display/CategoryBadges';
import { useFavorites } from '@/hooks/useFavorites';

export interface ClinicCardProps {
  clinic: {
    id: string;
    name: string;
    description: string;
    category: string;
    subCategory: string;
    location: string;
    rating: number;
    reviews: number;
    offerPercentage: number;
    imageUrl: string;
    specialties: string[];
    featured: boolean;
  };
  view: 'grid' | 'list';
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, view }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClinicSelect = () => {
    navigate(`/clinics/${clinic.id}`, { 
      state: { 
        clinicName: clinic.name,
        clinicId: clinic.id
      } 
    });
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/reservations', { 
      state: { 
        clinicName: clinic.name,
        clinicId: clinic.id
      } 
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(clinic.id);
  };

  if (view === 'grid') {
    return (
      <Card 
        key={clinic.id} 
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
          <FeaturedBadge featured={clinic.featured} />
          <FavoriteButton 
            isFavorite={isFavorite(clinic.id)}
            onClick={handleFavoriteToggle}
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{clinic.name}</CardTitle>
            <RatingDisplay rating={clinic.rating} reviews={clinic.reviews} compact />
          </div>
          <LocationDisplay location={clinic.location} />
          <CardDescription className="mt-2 line-clamp-2">
            {clinic.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-2">
          <SpecialtyBadges specialties={clinic.specialties} />
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
  }

  return (
    <Card 
      key={clinic.id} 
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
            isFavorite={isFavorite(clinic.id)}
            onClick={handleFavoriteToggle}
          />
        </div>
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{clinic.name}</h3>
              <LocationDisplay location={clinic.location} />
            </div>
            <RatingDisplay rating={clinic.rating} reviews={clinic.reviews} />
          </div>
          
          <p className="text-gray-600 mb-3">{clinic.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            <CategoryBadges category={clinic.category} subCategory={clinic.subCategory} />
            <SpecialtyBadges specialties={clinic.specialties} limit={clinic.specialties.length} />
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

export default ClinicCard;
