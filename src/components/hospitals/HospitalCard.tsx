
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import GridHospitalCard from './cards/GridHospitalCard';
import ListHospitalCard from './cards/ListHospitalCard';

export interface HospitalCardProps {
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
  view: 'grid' | 'list';
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, view }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleHospitalSelect = () => {
    // For now, we'll navigate to a placeholder route
    navigate(`/hospitals/${hospital.id}`, { 
      state: { 
        hospitalName: hospital.name,
        hospitalId: hospital.id
      } 
    });
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/reservations', { 
      state: { 
        hospitalName: hospital.name,
        hospitalId: hospital.id
      } 
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(hospital.id);
  };

  const commonProps = {
    hospital,
    handleHospitalSelect,
    handleBooking,
    handleFavoriteToggle,
    isFavorite: isFavorite(hospital.id)
  };

  if (view === 'grid') {
    return <GridHospitalCard {...commonProps} />;
  }

  return <ListHospitalCard {...commonProps} />;
};

export default HospitalCard;
