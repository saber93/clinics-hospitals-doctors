
import React from "react";
import { Clinic } from "@/types/clinic";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface ClinicCardProps {
  clinic: Clinic;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      <div className="relative card-image-container">
        <img
          src={clinic.imageUrl || "/placeholder.svg"}
          alt={clinic.name}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {clinic.offerPercentage > 0 && (
          <div className="absolute top-0 right-0 m-3">
            <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs font-bold">
              {clinic.offerPercentage}% OFF
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-1">{clinic.name}</CardTitle>
        </div>
        <div className="flex items-center text-muted-foreground text-xs gap-1 mt-1">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{clinic.location}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <CardDescription className="line-clamp-3 text-sm">
          {clinic.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 text-xs text-muted-foreground">
        <span>{clinic.category}</span>
        <span>{clinic.subCategory}</span>
      </CardFooter>
    </Card>
  );
};

export default ClinicCard;
