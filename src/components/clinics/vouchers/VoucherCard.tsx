
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Info } from "lucide-react";
import { ProductVoucherType } from "../types";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";

interface VoucherCardProps {
  voucher: ProductVoucherType;
  hasReservation: boolean;
  onPreview: (voucher: ProductVoucherType) => void;
  index: number;
  specialtyTheme: SpecialtyTheme;
}

const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  hasReservation,
  onPreview,
  index,
  specialtyTheme
}) => {
  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(voucher);
  };

  // Use a default image if none provided
  const imageUrl = voucher.imageUrl || 
    `https://source.unsplash.com/random/300x200/?skincare,${index}`;

  return (
    <Card className={`group overflow-hidden border-2 ${specialtyTheme.cardStyle} transition-all hover:shadow-lg`}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl}
          alt={voucher.productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${specialtyTheme.gradientStyle} text-white border-0`}>
            {voucher.discount}% OFF
          </Badge>
        </div>
        {!hasReservation && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="outline" className="text-white border-white px-3 py-1">
              Reserve to Unlock
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className={`font-bold text-lg text-${specialtyTheme.primaryColor}`}>{voucher.productName}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {voucher.description}
        </p>

        {voucher.validUntil && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>Valid until: {voucher.validUntil}</span>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          className={`w-full border-${specialtyTheme.primaryColor} text-${specialtyTheme.primaryColor} hover:bg-${specialtyTheme.primaryColor} hover:text-white`}
          onClick={handlePreviewClick}
        >
          <Info className="h-4 w-4 mr-2" /> View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
