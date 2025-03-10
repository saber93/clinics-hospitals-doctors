
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

interface ServicesTabProps {
  services: Service[];
}

const ServicesTab: React.FC<ServicesTabProps> = ({ services }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Services</CardTitle>
        <CardDescription>
          Services you offer to your patients
        </CardDescription>
      </CardHeader>
      <CardContent>
        {services.length > 0 ? (
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.description || 'No description provided'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg">${service.price}</span>
                    <span className="text-sm text-muted-foreground">{service.duration} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No services found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't created any services yet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate('/reservations')}
        >
          Manage Services
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicesTab;
