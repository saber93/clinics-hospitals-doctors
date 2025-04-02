
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, GraduationCap, Languages, Clock } from 'lucide-react';
import FavoriteButton from '../../clinics/badges/FavoriteButton';
import { Doctor } from '@/types/doctor';

interface ListDoctorCardProps {
  doctor: Doctor;
  handleDoctorSelect: () => void;
  handleBooking: (e: React.MouseEvent) => void;
  handleFavoriteToggle: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const ListDoctorCard: React.FC<ListDoctorCardProps> = ({ 
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
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4 h-48 md:h-auto">
          <img 
            src={doctor.imageUrl} 
            alt={doctor.name}
            className="w-full h-full object-cover"
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
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{doctor.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({doctor.reviews} reviews)</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{doctor.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>{doctor.education}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{doctor.experience} years experience</span>
            </div>
            {doctor.languages && (
              <div className="flex items-center text-sm text-gray-600">
                <Languages className="h-4 w-4 mr-1" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            )}
            {doctor.consultationFee && (
              <div className="flex items-center text-sm font-medium">
                <span>Consultation fee: ${doctor.consultationFee}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">
              {doctor.specialty}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-0">
              {doctor.subSpecialty}
            </Badge>
            {doctor.specialties?.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
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

export default ListDoctorCard;
