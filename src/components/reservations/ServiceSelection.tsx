
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ServiceSelectionProps {
  services: any[];
  selectedService: string | null;
  setSelectedService: (serviceId: string | null) => void;
  error: string | null;
}

const ServiceSelection = ({ 
  services, 
  selectedService, 
  setSelectedService, 
  error 
}: ServiceSelectionProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
      {error ? (
        <div className="p-4 border rounded-lg bg-red-50 text-red-700 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading services</p>
            <p className="text-sm">{error}</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {services.length > 0 ? (
            services.map((service) => (
              <div 
                key={service.id}
                className={`p-4 border rounded-lg cursor-pointer ${selectedService === service.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{service.name}</h3>
                  <span className="text-primary font-medium">${service.price}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{service.duration} minutes</p>
                <p className="text-gray-500 text-sm mt-1">Provider: {service.vendors?.name || 'Unknown'}</p>
              </div>
            ))
          ) : (
            <div className="p-4 border rounded-lg text-center">
              <p className="text-gray-500">No services available. Try seeding test data from the admin dashboard.</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;
