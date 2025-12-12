import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Heart } from 'lucide-react';
import { featuredClinics } from '@/data/featuredClinics';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/ui/optimized-image';
import { ClinicCardSkeleton } from '@/components/ui/skeleton-card';

const FeaturedClinicsSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load delay for skeleton demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", isRTL && "rtl-content")}>
        <div className="text-center mb-16">
          <p className="text-lg uppercase tracking-wider text-muted-foreground mb-4">{t('clinics.findPerfectSkinClinic')}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('clinics.findClinic')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('clinics.discoverSkincare')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <ClinicCardSkeleton />
              <ClinicCardSkeleton />
              <ClinicCardSkeleton />
            </>
          ) : (
            featuredClinics.map((clinic) => (
              <Card key={clinic.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/clinics/${clinic.id}`)}>
                <div className="h-48 overflow-hidden relative">
                  <OptimizedImage 
                    src={clinic.imageUrl} 
                    alt={clinic.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                      {t('clinics.favorites')}
                    </Badge>
                  </div>
                  {clinic.discount > 0 && (
                    <div className="absolute top-2 left-24 z-10">
                      <Badge className="bg-primary text-primary-foreground">
                        {clinic.discount}% {t('offers.discountAmount')}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      className="p-2 w-8 h-8 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90"
                      size="icon"
                      variant="ghost"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{clinic.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{clinic.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{clinic.location}</span>
                  </div>
                  <p className="mt-3 text-muted-foreground line-clamp-2">{clinic.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={() => navigate('/clinics')} variant="outline" size="lg">
            {t('clinics.allClinics')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClinicsSection;
