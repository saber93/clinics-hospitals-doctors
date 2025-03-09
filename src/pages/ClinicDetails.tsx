
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ClinicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch clinic details from Supabase
  const { data: clinic, isLoading, error } = useQuery({
    queryKey: ['clinic', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clinics')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        location: data.location,
        category: data.category,
        subCategory: data.sub_category,
        offerPercentage: data.offer_percentage,
        imageUrl: data.image_url || "/placeholder.svg"
      };
    }
  });

  // Handle image error by falling back to placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(`Image failed to load: ${clinic?.imageUrl}`);
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleReservation = () => {
    // For now just show a toast; in a real app, this would navigate to a reservation form
    toast.success("Reservation feature coming soon!");
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !clinic) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Clinic Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the clinic you were looking for.
          </p>
          <Button onClick={() => navigate('/clinics')}>Back to Clinics</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <Button
        variant="back"
        onClick={() => navigate('/clinics')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Clinics
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Clinic Image and Basic Info */}
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden h-64 md:h-96 mb-6">
            <img
              src={clinic.imageUrl}
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

          <Separator className="my-6" />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About this Clinic</h2>
            <p className="text-muted-foreground">{clinic.description}</p>
          </div>
        </div>

        {/* Reservation Card */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Reserve your spot at {clinic.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Available 7 days a week</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>Call for urgent appointments</span>
              </div>

              {clinic.offerPercentage > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="font-medium text-sm">Special Offer</p>
                  <p className="text-primary font-bold">{clinic.offerPercentage}% off your first visit</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleReservation}>
                Make a Reservation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetails;
