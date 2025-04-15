
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { doctorsData } from '@/data/doctorsData';

const DoctorsSection = () => {
  // Use the first three doctors from the doctorsData array
  const displayedDoctors = doctorsData.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-600 uppercase tracking-wider mb-3">OUR MEDICAL SPECIALISTS</p>
          <h2 className="text-4xl font-bold mb-4">
            Find and book appointments with top doctors across all medical specialties
          </h2>
          <p className="text-gray-600 mb-8">
            All doctors in our network are certified with relevant medical boards and skin care authorities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {displayedDoctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
              <p className="text-orange-500 mb-2">{doctor.specialty}</p>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[...Array(Math.floor(doctor.rating || 4))].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  {doctor.rating && doctor.rating % 1 !== 0 && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500/50" />
                  )}
                </div>
                <span className="text-sm text-gray-600 ml-2">({doctor.reviews} Reviews)</span>
              </div>
              <p className="text-gray-600 mb-4">{doctor.description.substring(0, 100)}...</p>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties && doctor.specialties.slice(0, 2).map((service, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-2">
            <Link to="/doctors">Find a Doctor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
