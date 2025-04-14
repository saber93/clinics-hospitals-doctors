
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Heart, ImageOff } from 'lucide-react';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

interface GridHospitalCardProps {
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

const GridHospitalCard: React.FC<GridHospitalCardProps> = ({ 
  hospital, 
  handleHospitalSelect, 
  handleBooking,
  handleFavoriteToggle,
  isFavorite
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    console.log(`Image error for hospital ${hospital.id} with url:`, hospital.imageUrl);
    setImageError(true);
  };

  // Get a fallback image if the original image fails to load
  const getFallbackImage = () => {
    // Default fallback image from Unsplash
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60";
  };

  const imageSource = imageError || !hospital.imageUrl 
    ? getFallbackImage()
    : getOptimizedImageUrl(hospital.imageUrl);
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleHospitalSelect}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSource} 
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        
        {imageError && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-500 bg-opacity-70 text-white text-xs p-1 text-center flex items-center justify-center">
            <ImageOff className="h-3 w-3 mr-1" />
            Using fallback image
          </div>
        )}
        
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
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{hospital.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{hospital.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{hospital.location}</span>
        </div>
        
        <CardDescription className="mt-2 line-clamp-2">
          {hospital.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2">
        <div className="flex flex-wrap gap-2">
          {hospital.specialties && hospital.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full hover:bg-primary hover:text-white transition-colors"
          onClick={handleBooking}
        >
          Schedule Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GridHospitalCard;
