
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import FavoriteButton from '../../clinics/badges/FavoriteButton';
import { Doctor } from '@/types/doctor';
import DoctorRatingDisplay from '../display/DoctorRatingDisplay';
import DoctorLocationDisplay from '../display/DoctorLocationDisplay';
import DoctorSpecialties from '../display/DoctorSpecialties';
import DoctorEducation from '../display/DoctorEducation';
import DoctorLanguages from '../display/DoctorLanguages';

interface GridDoctorCardProps {
  doctor: Doctor;
  handleDoctorSelect: () => void;
  handleBooking: (e: React.MouseEvent) => void;
  handleFavoriteToggle: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const GridDoctorCard: React.FC<GridDoctorCardProps> = ({ 
  doctor, 
  handleDoctorSelect, 
  handleBooking,
  handleFavoriteToggle,
  isFavorite
}) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleDoctorSelect}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={doctor.imageUrl} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {doctor.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-300">
              Featured
            </Badge>
          </div>
        )}
        {doctor.offerPercentage > 0 && (
          <div className="absolute top-2 right-12">
            <Badge className="bg-primary text-white">
              {doctor.offerPercentage}% OFF
            </Badge>
          </div>
        )}
        <FavoriteButton 
          isFavorite={isFavorite}
          onClick={handleFavoriteToggle}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{doctor.name}</CardTitle>
          <DoctorRatingDisplay rating={doctor.rating || 0} reviews={doctor.reviews || 0} compact={true} />
        </div>
        <DoctorLocationDisplay location={doctor.location} />
        <CardDescription className="mt-2 line-clamp-2">
          {doctor.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {doctor.specialties && <DoctorSpecialties specialties={doctor.specialties} />}
        </div>
        <div className="mb-1">
          {doctor.education && <DoctorEducation education={doctor.education} />}
        </div>
        {doctor.languages && (
          <DoctorLanguages languages={doctor.languages} />
        )}
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

export default GridDoctorCard;
