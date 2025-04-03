
import React from "react";
import { ProductVoucherType } from "./types";
import { Clinic } from "@/types/clinic";
import ClinicDetailHeader from "./ClinicDetailHeader";
import ClinicDescription from "./ClinicDescription";
import ProductVouchers from "./ProductVouchers";
import ReservationCard from "./ReservationCard";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";
import * as LucideIcons from 'lucide-react';

interface ClinicDetailsLayoutProps {
  clinic: Clinic;
  vouchers: ProductVoucherType[];
  onReservation: () => void;
  specialtyTheme: SpecialtyTheme;
}

const ClinicDetailsLayout = ({ 
  clinic, 
  vouchers, 
  onReservation, 
  specialtyTheme 
}: ClinicDetailsLayoutProps) => {

  // Get the appropriate icon component
  const getSpecialtyIcon = () => {
    const iconName = specialtyTheme.icon;
    // Convert first letter to uppercase for Lucide
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    
    // Get the icon component from Lucide
    const IconComponent = (LucideIcons as any)[formattedIconName] || LucideIcons.Activity;
    
    return <IconComponent className="h-6 w-6 text-white" />;
  };

  return (
    <div className="container py-24 px-4 md:px-6">
      {/* Specialty icon and category display */}
      <div className="mb-6 flex items-center gap-3">
        <div className={`p-3 rounded-full ${specialtyTheme.gradientStyle}`}>
          {getSpecialtyIcon()}
        </div>
        <div>
          <h3 className={`font-bold text-${specialtyTheme.primaryColor}`}>
            {clinic.category}
          </h3>
          <p className="text-sm text-muted-foreground">
            {clinic.subCategory}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Clinic details and vouchers */}
        <div className="lg:col-span-2">
          <ClinicDetailHeader 
            clinic={clinic} 
            specialtyTheme={specialtyTheme} 
          />
          <ClinicDescription 
            description={clinic.description} 
            specialtyTheme={specialtyTheme} 
          />
          <ProductVouchers 
            vouchers={vouchers} 
            hasReservation={clinic.hasReservation ?? false}
            onReservation={onReservation}
            specialtyTheme={specialtyTheme}
          />
        </div>

        {/* Right column: Reservation card */}
        <div>
          <ReservationCard 
            clinicName={clinic.name} 
            offerPercentage={clinic.offerPercentage}
            vouchers={vouchers.map(v => ({ 
              productName: v.productName, 
              discount: v.discount 
            }))}
            onReservation={onReservation}
            specialtyTheme={specialtyTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default ClinicDetailsLayout;
