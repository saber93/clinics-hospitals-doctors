
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import GridCard from './cards/GridCard';
import ListCard from './cards/ListCard';
import { Clinic } from '@/types/clinic';

export interface ClinicCardProps {
  clinic: Clinic;
  view: 'grid' | 'list';
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, view }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClinicSelect = () => {
    // Open in new tab with custom domain structure
    const url = `https://${clinic.id}.zames.marketing`;
    window.open(url, '_blank');
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

  const commonProps = {
    clinic,
    handleClinicSelect,
    handleBooking,
    handleFavoriteToggle,
    isFavorite: isFavorite(clinic.id)
  };

  if (view === 'grid') {
    return <GridCard {...commonProps} />;
  }

  return <ListCard {...commonProps} />;
};

export default ClinicCard;
