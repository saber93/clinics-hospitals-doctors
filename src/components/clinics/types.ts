
import { Clinic } from '@/types/clinic';

export type ProductVoucherType = {
  productName: string;
  description: string;
  discount: number;
  validUntil?: string;
  imageUrl?: string;
  additionalImages?: string[];
};

export interface ClinicCardBaseProps {
  clinic: Clinic;
  handleClinicSelect: () => void;
  handleBooking: (e: React.MouseEvent) => void;
  handleFavoriteToggle: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

