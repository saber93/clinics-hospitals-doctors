
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, GraduationCap, Languages } from 'lucide-react';
import FavoriteButton from '../../clinics/badges/FavoriteButton';
import { Doctor } from '@/types/doctor';

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
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{doctor.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{doctor.location}</span>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {doctor.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {doctor.specialties?.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <GraduationCap className="h-4 w-4 mr-1" />
          <span>{doctor.education}</span>
        </div>
        {doctor.languages && (
          <div className="flex items-center text-sm text-gray-500">
            <Languages className="h-4 w-4 mr-1" />
            <span>{doctor.languages.join(', ')}</span>
          </div>
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
