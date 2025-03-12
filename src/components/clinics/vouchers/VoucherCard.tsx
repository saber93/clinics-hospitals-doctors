
import React from "react";
import { Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductImageWithFallback from "@/components/products/ProductImageWithFallback";
import { ProductVoucherType } from "../types";

interface VoucherCardProps {
  voucher: ProductVoucherType;
  hasReservation: boolean;
  onPreview: (voucher: ProductVoucherType) => void;
  index: number;
}

const VoucherCard = ({ voucher, hasReservation, onPreview, index }: VoucherCardProps) => {
  return (
    <Card 
      className={`
        ${hasReservation ? "bg-muted/50" : "bg-muted/50 relative overflow-hidden group"}
        cursor-pointer hover:shadow-md transition-shadow duration-200
      `}
      onClick={() => onPreview(voucher)}
    >
      {!hasReservation && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 transition-opacity group-hover:bg-black/50">
          <div className="text-center px-4 py-3">
            <p className="text-white font-medium mb-2">Reserve now to unlock this offer!</p>
            <Badge className="bg-primary text-primary-foreground px-3 py-1.5 text-sm font-bold">
              {voucher.discount}% OFF
            </Badge>
          </div>
        </div>
      )}
      
      <div className={hasReservation ? "" : "blur-sm"}>
        <ProductImageWithFallback
          imageUrl={voucher.imageUrl}
          productName={voucher.productName}
          productId={`voucher-${index}`}
          index={index}
        />
      </div>

      <CardHeader className={hasReservation ? "" : "blur-sm"}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{voucher.productName}</CardTitle>
        </div>
        <CardDescription>{voucher.description}</CardDescription>
      </CardHeader>
      <CardContent className={hasReservation ? "" : "blur-sm"}>
        <p className="text-primary font-bold">{voucher.discount}% OFF</p>
        {voucher.validUntil && (
          <p className="text-sm text-muted-foreground">
            Valid until: {new Date(voucher.validUntil).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
