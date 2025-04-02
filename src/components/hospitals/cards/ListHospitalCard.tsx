
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Heart } from 'lucide-react';

interface ListHospitalCardProps {
  hospital: {
    id: string;
    name: string;
    description: string;
    location: string;
    category: string;
    subCategory?: string;
    offerPercentage?: number;
    imageUrl?: string;
    rating?: number;
    reviews?: number;
    specialties?: string[];
    featured?: boolean;
  };
  handleHospitalSelect: () => void;
  handleBooking: (e: React.MouseEvent) => void;
  handleFavoriteToggle: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const ListHospitalCard: React.FC<ListHospitalCardProps> = ({ 
  hospital, 
  handleHospitalSelect, 
  handleBooking,
  handleFavoriteToggle,
  isFavorite
}) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleHospitalSelect}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4 h-48 md:h-auto">
          <img 
            src={hospital.imageUrl} 
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
          
          {/* Featured badge */}
          {hospital.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                Featured
              </Badge>
            </div>
          )}
          
          {/* Offer badge */}
          {(hospital.offerPercentage && hospital.offerPercentage > 0) && (
            <div className="absolute top-2 left-24">
              <Badge className="bg-primary text-white">
                {hospital.offerPercentage}% OFF
              </Badge>
            </div>
          )}
          
          {/* Favorite button */}
          <div className="absolute top-2 right-2">
            <Button
              className={`p-2 w-8 h-8 flex items-center justify-center rounded-full ${
                isFavorite ? 'bg-primary text-white' : 'bg-white/70 backdrop-blur-sm hover:bg-white/90'
              }`}
              size="icon"
              variant="ghost"
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
            </Button>
          </div>
        </div>
        
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{hospital.name}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hospital.location}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{hospital.rating}</span>
              <span className="text-gray-500 text-xs ml-1">
                ({hospital.reviews} reviews)
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3">{hospital.description}</p>
          
          <div className="flex items-center mb-2">
            <Badge className="mr-2 bg-blue-100 text-blue-800 border border-blue-200">
              {hospital.category}
            </Badge>
            {hospital.subCategory && (
              <Badge variant="outline">
                {hospital.subCategory}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.specialties && hospital.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <Button 
            className="mt-2"
            onClick={handleBooking}
          >
            Schedule Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListHospitalCard;
