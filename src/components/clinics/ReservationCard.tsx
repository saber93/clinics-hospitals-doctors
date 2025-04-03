
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Phone } from "lucide-react";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";

type VoucherSummary = {
  productName: string;
  discount: number;
};

type ReservationCardProps = {
  clinicName: string;
  offerPercentage: number;
  vouchers?: VoucherSummary[];
  onReservation: () => void;
  specialtyTheme: SpecialtyTheme;
};

const ReservationCard = ({ 
  clinicName, 
  offerPercentage, 
  vouchers = [], 
  onReservation,
  specialtyTheme 
}: ReservationCardProps) => {
  return (
    <Card className={`sticky top-24 border-2 ${specialtyTheme.cardStyle}`}>
      <CardHeader className={specialtyTheme.gradientStyle}>
        <CardTitle className="text-white">Book an Appointment</CardTitle>
        <CardDescription className="text-white/90">Reserve your spot at {clinicName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <Calendar className={`h-5 w-5 text-${specialtyTheme.primaryColor}`} />
          <span>Available 7 days a week</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 text-${specialtyTheme.primaryColor}`} />
          <span>9:00 AM - 7:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className={`h-5 w-5 text-${specialtyTheme.primaryColor}`} />
          <span>Call for urgent appointments</span>
        </div>

        {offerPercentage > 0 && (
          <div className={`mt-4 p-3 rounded-md bg-${specialtyTheme.primaryColor}/10 border border-${specialtyTheme.primaryColor}/20`}>
            <p className="font-medium text-sm">Special Offer</p>
            <p className={`text-${specialtyTheme.primaryColor} font-bold`}>{offerPercentage}% off your first visit</p>
          </div>
        )}

        {/* Show preview of available vouchers */}
        {vouchers && vouchers.length > 0 && (
          <div className={`mt-4 p-3 rounded-md bg-${specialtyTheme.primaryColor}/10 border border-${specialtyTheme.primaryColor}/20`}>
            <p className="font-medium text-sm">Unlock These Vouchers</p>
            <div className="flex gap-1 mt-2 flex-wrap">
              {vouchers.map((voucher, index) => (
                <Badge key={index} className={`bg-${specialtyTheme.primaryColor}/20 text-${specialtyTheme.primaryColor} border-${specialtyTheme.primaryColor}/30`}>
                  {voucher.discount}% off {voucher.productName}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${specialtyTheme.gradientStyle} border-0 hover:opacity-90`} onClick={onReservation}>
          Make a Reservation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
