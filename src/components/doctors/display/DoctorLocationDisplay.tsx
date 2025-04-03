
import React from 'react';
import LocationDisplay from '../../clinics/display/LocationDisplay';

interface DoctorLocationDisplayProps {
  location: string;
}

const DoctorLocationDisplay: React.FC<DoctorLocationDisplayProps> = ({ location }) => {
  return <LocationDisplay location={location} />;
};

export default DoctorLocationDisplay;
