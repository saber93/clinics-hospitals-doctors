
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
          {clinic.offerPercentage > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-white">
                {clinic.offerPercentage}% OFF
              </Badge>
            </div>
          )}
          {clinic.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{clinic.name}</CardTitle>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{clinic.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({clinic.reviews})</span>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{clinic.location}</span>
          </div>
          <CardDescription className="mt-2 line-clamp-2">
            {clinic.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-2">
          <div className="flex flex-wrap gap-1 mt-2">
            {clinic.specialties.slice(0, 3).map((specialty, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {clinic.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{clinic.specialties.length - 3} more
              </Badge>
            )}
          </div>
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
          {clinic.offerPercentage > 0 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary text-white">
                {clinic.offerPercentage}% OFF
              </Badge>
            </div>
          )}
        </div>
        <div className="md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{clinic.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{clinic.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{clinic.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({clinic.reviews} reviews)</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3">{clinic.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="secondary" className="text-xs">{clinic.category}</Badge>
            <Badge variant="outline" className="text-xs">{clinic.subCategory}</Badge>
            {clinic.specialties.map((specialty, i) => (
              <Badge key={i} variant="outline" className="text-xs">
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

export default ClinicCard;
