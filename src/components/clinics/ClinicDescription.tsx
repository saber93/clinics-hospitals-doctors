
import React from "react";
import { Separator } from "@/components/ui/separator";

type ClinicDescriptionProps = {
  description: string;
};

const ClinicDescription = ({ description }: ClinicDescriptionProps) => {
  return (
    <>
      <Separator className="my-6" />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">About this Clinic</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  );
};

export default ClinicDescription;
