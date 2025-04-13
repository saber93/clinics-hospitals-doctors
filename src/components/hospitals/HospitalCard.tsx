
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
    custom_domain?: string;
  };
  view: 'grid' | 'list';
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, view }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleHospitalSelect = () => {
    // Use custom domain if available, otherwise fallback to default pattern
    const url = hospital.custom_domain 
      ? hospital.custom_domain 
      : `https://hospital-${hospital.id}.zames.marketing`;
    window.open(url, '_blank');
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
