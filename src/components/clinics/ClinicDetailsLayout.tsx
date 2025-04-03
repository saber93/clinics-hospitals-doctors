
import React from "react";
import { ProductVoucherType } from "./types";
import { Clinic } from "@/types/clinic";
import ClinicDetailHeader from "./ClinicDetailHeader";
import ClinicDescription from "./ClinicDescription";
import ProductVouchers from "./ProductVouchers";
import ReservationCard from "./ReservationCard";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";
import { Eye, Tooth, Scissors, Zap, Star, Heart, Sparkles, Activity } from "lucide-react";

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

  // Map theme icon name to Lucide component
  const getSpecialtyIcon = () => {
    switch (specialtyTheme.icon) {
      case 'eye':
        return <Eye className="h-6 w-6 text-white" />;
      case 'tooth':
        return <Tooth className="h-6 w-6 text-white" />;
      case 'scissors':
        return <Scissors className="h-6 w-6 text-white" />;
      case 'zap':
        return <Zap className="h-6 w-6 text-white" />;
      case 'star':
        return <Star className="h-6 w-6 text-white" />;
      case 'heart':
        return <Heart className="h-6 w-6 text-white" />;
      case 'sparkles':
        return <Sparkles className="h-6 w-6 text-white" />;
      default:
        return <Activity className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
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
