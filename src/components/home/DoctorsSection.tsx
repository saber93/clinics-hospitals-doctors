
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { doctorsData } from '@/data/doctorsData';

const DoctorsSection = () => {
  const navigate = useNavigate();
  const featuredDoctors = doctorsData.filter(doctor => doctor.featured).slice(0, 3);
  
  const handleViewAllDoctors = () => {
    navigate('/doctors');
  };
  
  const handleDoctorClick = (doctorId: string) => {
    navigate(`/doctors/${doctorId}`);
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">OUR MEDICAL SPECIALISTS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of board-certified specialists is dedicated to providing exceptional care and 
            personalized treatment plans for all your healthcare needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDoctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                <p className="text-primary mb-3">{doctor.specialty}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(doctor.rating || 0) ? 'fill-current' : 'fill-gray-300'}`} 
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({doctor.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-4">{doctor.description}</p>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties?.slice(0, 2).map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleViewAllDoctors}
            className="px-8"
          >
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
