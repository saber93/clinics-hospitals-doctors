
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";
import { Clinic } from "@/types/clinic";

type ClinicDetailHeaderProps = {
  clinic: Clinic;
};

const ClinicDetailHeader = ({ clinic }: ClinicDetailHeaderProps) => {
  const navigate = useNavigate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(`Image failed to load: ${clinic?.imageUrl}`);
    e.currentTarget.src = "/placeholder.svg";
  };

  // Use placeholder for Body Sculpt Studio which has a problematic image
  const getImageUrl = () => {
    if (clinic?.name === "Body Sculpt Studio") {
      return "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop";
    }
    return clinic?.imageUrl || "/placeholder.svg";
  };
  
  return (
    <>
      <Button
        variant="back"
        onClick={() => navigate('/clinics')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clinics
      </Button>

      <div className="relative rounded-lg overflow-hidden h-64 md:h-96 mb-6">
        <img
          src={getImageUrl()}
          alt={clinic.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        {clinic.offerPercentage > 0 && (
          <div className="absolute top-0 right-0 m-4">
            <Badge className="bg-primary text-primary-foreground px-3 py-1.5 text-sm font-bold">
              {clinic.offerPercentage}% OFF
            </Badge>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-2">{clinic.name}</h1>
      
      <div className="flex items-center text-muted-foreground mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{clinic.location}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary">{clinic.category}</Badge>
        <Badge variant="outline">{clinic.subCategory}</Badge>
      </div>
    </>
  );
};

export default ClinicDetailHeader;
