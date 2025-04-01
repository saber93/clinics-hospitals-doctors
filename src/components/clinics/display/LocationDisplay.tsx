
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
  location: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ location }) => {
  return (
    <div className="flex items-center text-muted-foreground text-sm">
      <MapPin className="h-4 w-4 mr-1" />
      <span>{location}</span>
    </div>
  );
};

export default LocationDisplay;
