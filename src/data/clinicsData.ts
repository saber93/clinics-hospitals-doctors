
import { Clinic } from '@/types/clinic';

// Demo clinic data with enhanced details
export const clinicsData: Clinic[] = [
  {
    id: 'clinic-1',
    name: 'Downtown Dermatology Center',
    description: 'Full-service dermatology clinic offering medical, surgical, and cosmetic services with experienced specialists.',
    category: 'Dermatology',
    subCategory: 'Medical & Cosmetic',
    location: '123 Main Street, Downtown',
    rating: 4.8,
    reviews: 128,
    offerPercentage: 15,
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop',
    specialties: ['Acne Treatment', 'Botox', 'Fillers', 'Skin Cancer Screening'],
    featured: true
  },
  {
    id: 'clinic-2',
    name: 'Westside Wellness Spa',
    description: 'Luxury medical spa specializing in non-invasive treatments and rejuvenation therapies for all skin types.',
    category: 'Med Spa',
    subCategory: 'Wellness & Beauty',
    location: '456 West Avenue, Westside',
    rating: 4.9,
    reviews: 215,
    offerPercentage: 0,
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=500&auto=format&fit=crop',
    specialties: ['Facials', 'Chemical Peels', 'Microdermabrasion'],
    featured: true
  },
  {
    id: 'clinic-3',
    name: 'Northpark Skin Clinic',
    description: 'Comprehensive skin treatments including advanced procedures for various skin conditions and anti-aging solutions.',
    category: 'Skin Clinic',
    subCategory: 'Anti-Aging',
    location: '789 North Blvd, Northpark',
    rating: 4.7,
    reviews: 96,
    offerPercentage: 10,
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=500&auto=format&fit=crop',
    specialties: ['Anti-Aging', 'Skin Tightening', 'Laser Treatments'],
    featured: false
  },
  {
    id: 'clinic-4',
    name: 'Eastside Beauty Institute',
    description: 'Modern beauty clinic focusing on the latest skincare technologies and personalized treatment plans.',
    category: 'Beauty Clinic',
    subCategory: 'Cosmetic Procedures',
    location: '321 East Road, Eastside',
    rating: 4.5,
    reviews: 84,
    offerPercentage: 20,
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=500&auto=format&fit=crop',
    specialties: ['Skin Rejuvenation', 'Microblading', 'Laser Hair Removal'],
    featured: false
  },
  {
    id: 'clinic-5',
    name: 'South Shore Aesthetics',
    description: 'Boutique clinic specializing in custom facial treatments and advanced skincare solutions for all skin concerns.',
    category: 'Aesthetics',
    subCategory: 'Facial Treatments',
    location: '555 South Lane, Harbor District',
    rating: 4.6,
    reviews: 107,
    offerPercentage: 0,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=500&auto=format&fit=crop',
    specialties: ['Custom Facials', 'LED Therapy', 'Hydrafacial'],
    featured: false
  },
  {
    id: 'clinic-6',
    name: 'Central Laser Center',
    description: 'Specialized laser treatment facility offering cutting-edge solutions for various skin conditions and concerns.',
    category: 'Laser Clinic',
    subCategory: 'Specialized Treatments',
    location: '777 Central Avenue, Midtown',
    rating: 4.7,
    reviews: 92,
    offerPercentage: 15,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop',
    specialties: ['Laser Resurfacing', 'Tattoo Removal', 'Scar Reduction'],
    featured: true
  },
];
