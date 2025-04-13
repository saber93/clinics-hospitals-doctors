
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import GridDoctorCard from './cards/GridDoctorCard';
import ListDoctorCard from './cards/ListDoctorCard';
import { Doctor } from '@/types/doctor';

export interface DoctorCardProps {
  doctor: Doctor;
  view: 'grid' | 'list';
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, view }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleDoctorSelect = () => {
    // Use custom domain if available, otherwise fallback to default pattern
    const url = doctor.custom_domain 
      ? doctor.custom_domain 
      : `https://doctor-${doctor.id}.zames.marketing`;
    window.open(url, '_blank');
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/reservations', { 
      state: { 
        doctorName: doctor.name,
        doctorId: doctor.id
      } 
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(doctor.id);
  };

  const commonProps = {
    doctor,
    handleDoctorSelect,
    handleBooking,
    handleFavoriteToggle,
    isFavorite: isFavorite(doctor.id)
  };

  if (view === 'grid') {
    return <GridDoctorCard {...commonProps} />;
  }

  return <ListDoctorCard {...commonProps} />;
};

export default DoctorCard;
