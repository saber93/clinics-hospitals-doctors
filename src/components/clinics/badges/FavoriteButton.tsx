
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
  return (
    <Button
      className={`absolute top-2 right-2 p-2 w-8 h-8 flex items-center justify-center rounded-full ${
        isFavorite ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white/70 backdrop-blur-sm hover:bg-white/90'
      }`}
      onClick={onClick}
      size="icon"
      variant="ghost"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`}
      />
    </Button>
  );
};

export default FavoriteButton;
