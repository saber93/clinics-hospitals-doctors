
import React from "react";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";

interface ClinicDescriptionProps {
  description: string;
  specialtyTheme: SpecialtyTheme;
}

const ClinicDescription: React.FC<ClinicDescriptionProps> = ({ description, specialtyTheme }) => {
  return (
    <div className={`prose prose-sm max-w-none text-${specialtyTheme.secondaryColor}`}>
      <p>{description}</p>
    </div>
  );
};

export default ClinicDescription;
