
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Clinics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Demo clinic data
  const clinics = [
    {
      id: 'clinic-1',
      name: 'Downtown Medical Center',
      description: 'Full-service medical facility offering a wide range of healthcare services.',
      category: 'Medical',
      location: '123 Main Street, Downtown',
      imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Downtown+Medical'
    },
    {
      id: 'clinic-2',
      name: 'Westside Wellness Clinic',
      description: 'Specializing in preventive care and wellness programs for all ages.',
      category: 'Wellness',
      location: '456 West Avenue, Westside',
      imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Wellness+Clinic'
    },
    {
      id: 'clinic-3',
      name: 'Northpark Dental Care',
      description: 'Comprehensive dental services including preventive, restorative, and cosmetic procedures.',
      category: 'Dental',
      location: '789 North Blvd, Northpark',
      imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Dental+Care'
    },
    {
      id: 'clinic-4',
      name: 'Eastside Family Practice',
      description: 'Family-oriented healthcare services for patients of all ages.',
      category: 'Family Practice',
      location: '321 East Road, Eastside',
      imageUrl: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Family+Practice'
    },
  ];

  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClinicSelect = (clinic) => {
    navigate(`/clinics/${clinic.id}`, { 
      state: { 
        clinicName: clinic.name,
        clinicId: clinic.id
      } 
    });
  };

  const handleBookNow = (clinic, e) => {
    e.stopPropagation();
    navigate('/reservations', { 
      state: { 
        clinicName: clinic.name,
        clinicId: clinic.id
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Find a Clinic</h1>
        <p className="mt-4 mb-8 text-gray-600">Browse our network of healthcare providers and clinics.</p>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, category or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClinics.map((clinic) => (
            <Card 
              key={clinic.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleClinicSelect(clinic)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={clinic.imageUrl} 
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{clinic.name}</CardTitle>
                <CardDescription>{clinic.category} · {clinic.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{clinic.description}</p>
                <Button 
                  onClick={(e) => handleBookNow(clinic, e)}
                  className="w-full"
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredClinics.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No clinics found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clinics;
