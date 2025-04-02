
export interface FeaturedClinic {
  id: string;
  name: string;
  rating: number;
  location: string;
  description: string;
  imageUrl: string;
  discount: number;
  specialties: string[];
}

export const featuredClinics: FeaturedClinic[] = [
  {
    id: 'clinic-1',
    name: 'Crystal Clear Dermatology',
    rating: 4.9,
    location: 'Downtown Medical District',
    description: 'Specialized in treating acne, rosacea, and other common skin conditions with the latest dermatological techniques.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop',
    discount: 15,
    specialties: ['Acne Treatment', 'Skin Analysis', 'Medical Dermatology']
  },
  {
    id: 'clinic-2',
    name: 'Glow Aesthetic Center',
    rating: 4.8,
    location: 'Westside Beauty District',
    description: 'Luxury med-spa offering non-invasive treatments, chemical peels, and personalized skincare regimens.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop',
    discount: 0,
    specialties: ['Anti-Aging', 'Chemical Peels', 'Facials']
  },
  {
    id: 'clinic-3',
    name: 'Rejuvenate Laser Clinic',
    rating: 4.7,
    location: 'North Hills Plaza',
    description: 'Specializing in laser treatments for skin rejuvenation, hair removal, and scar reduction with cutting-edge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=500&auto=format&fit=crop',
    discount: 10,
    specialties: ['Laser Therapy', 'Skin Tightening', 'Hair Removal']
  }
];
