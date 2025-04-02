
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/clinics/HeroSection';
import ClinicFilters from '@/components/clinics/ClinicFilters';
import ClinicsList from '@/components/clinics/ClinicsList';
import ClinicFeatures from '@/components/clinics/ClinicFeatures';

// Demo clinic data with enhanced details
const clinicsData = [
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

const Clinics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [offerFilter, setOfferFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredClinics, setFilteredClinics] = useState(clinicsData);
  
  const categories = ['all', ...new Set(clinicsData.map(clinic => clinic.category))];

  useEffect(() => {
    let result = clinicsData;

    if (searchTerm) {
      result = result.filter(clinic => 
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(clinic => clinic.category === categoryFilter);
    }

    if (offerFilter === 'offers') {
      result = result.filter(clinic => clinic.offerPercentage > 0);
    } else if (offerFilter === 'no-offers') {
      result = result.filter(clinic => clinic.offerPercentage === 0);
    }

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'offers') {
      result = [...result].sort((a, b) => b.offerPercentage - a.offerPercentage);
    } else if (sortBy === 'featured') {
      result = [...result].sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
    }

    setFilteredClinics(result);
  }, [searchTerm, categoryFilter, offerFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setOfferFilter('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added margin-top to push hero section below the navbar */}
      <div className="mt-16">
        <HeroSection />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Find Your Perfect Skin Clinic</h1>
            <p className="mt-2 text-gray-600">Discover and connect with top-rated skincare specialists</p>
          </div>
          <Button 
            onClick={() => navigate('/reservations')}
            className="mt-4 md:mt-0"
          >
            Book an Appointment
          </Button>
        </div>
        
        <ClinicFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          offerFilter={offerFilter}
          setOfferFilter={setOfferFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
        
        <ClinicsList 
          filteredClinics={filteredClinics}
          viewMode={viewMode}
          setViewMode={setViewMode}
          clearFilters={clearFilters}
        />
      </div>
      
      {/* Moved ClinicFeatures here to appear just above the footer */}
      <ClinicFeatures />
    </div>
  );
};

export default Clinics;
