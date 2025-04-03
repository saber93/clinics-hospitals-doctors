
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ClinicDetailsError = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-24">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Clinic Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the clinic you were looking for.
        </p>
        <Button onClick={() => navigate('/clinics')}>Back to Clinics</Button>
      </div>
    </div>
  );
};

export default ClinicDetailsError;
