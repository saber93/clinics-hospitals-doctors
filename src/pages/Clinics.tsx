
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Filter, ArrowUpDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroSection from '@/components/clinics/HeroSection';

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
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=500&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=500&auto=format&fit=crop',
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

  const handleClinicSelect = (clinic) => {
    navigate(`/clinics/${clinic.id}`, { 
      state: { 
        clinicName: clinic.name,
        clinicId: clinic.id
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HeroSection moved here to touch the navbar directly */}
      <div className="-mt-24">
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
        
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, specialty, or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Category:</span>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-auto flex-1">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.filter(c => c !== 'all').map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Offers:</span>
              <Select value={offerFilter} onValueChange={setOfferFilter}>
                <SelectTrigger className="w-auto flex-1">
                  <SelectValue placeholder="Filter by offers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  <SelectItem value="offers">With Offers Only</SelectItem>
                  <SelectItem value="no-offers">No Offers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Sort By:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-auto flex-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="offers">Best Offers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={viewMode} onValueChange={setViewMode} className="mb-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              {filteredClinics.length} clinics found
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClinics.map((clinic) => (
                <Card 
                  key={clinic.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleClinicSelect(clinic)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={clinic.imageUrl} 
                      alt={clinic.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {clinic.offerPercentage > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white">
                          {clinic.offerPercentage}% OFF
                        </Badge>
                      </div>
                    )}
                    {clinic.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{clinic.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{clinic.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({clinic.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{clinic.location}</span>
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">
                      {clinic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {clinic.specialties.slice(0, 3).map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {clinic.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{clinic.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      className="w-full hover:bg-primary hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/reservations', { 
                          state: { 
                            clinicName: clinic.name,
                            clinicId: clinic.id
                          } 
                        });
                      }}
                    >
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {filteredClinics.map((clinic) => (
                <Card 
                  key={clinic.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleClinicSelect(clinic)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/4 h-48 md:h-auto">
                      <img 
                        src={clinic.imageUrl} 
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                      {clinic.offerPercentage > 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-white">
                            {clinic.offerPercentage}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="md:w-3/4 p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{clinic.name}</h3>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{clinic.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{clinic.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({clinic.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{clinic.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        <Badge variant="secondary" className="text-xs">{clinic.category}</Badge>
                        <Badge variant="outline" className="text-xs">{clinic.subCategory}</Badge>
                        {clinic.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/reservations', { 
                            state: { 
                              clinicName: clinic.name,
                              clinicId: clinic.id
                            } 
                          });
                        }}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {filteredClinics.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No clinics found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search filters or browse all clinics</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setOfferFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clinics;
