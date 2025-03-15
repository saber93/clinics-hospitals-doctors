
import React from "react";
import { ProductVoucherType } from "./types";
import { Clinic } from "@/types/clinic";
import ClinicDetailHeader from "./ClinicDetailHeader";
import ClinicDescription from "./ClinicDescription";
import ProductVouchers from "./ProductVouchers";
import ReservationCard from "./ReservationCard";

interface ClinicDetailsLayoutProps {
  clinic: Clinic;
  vouchers: ProductVoucherType[];
  onReservation: () => void;
}

const ClinicDetailsLayout = ({ clinic, vouchers, onReservation }: ClinicDetailsLayoutProps) => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Clinic details and vouchers */}
        <div className="lg:col-span-2">
          <ClinicDetailHeader clinic={clinic} />
          <ClinicDescription description={clinic.description} />
          <ProductVouchers 
            vouchers={vouchers} 
            hasReservation={clinic.hasReservation ?? false}
            onReservation={onReservation}
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
          />
        </div>
      </div>
    </div>
  );
};

export default ClinicDetailsLayout;
