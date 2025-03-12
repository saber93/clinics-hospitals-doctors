
import React from "react";
import { Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProductVoucherType = {
  productName: string;
  description: string;
  discount: number;
  validUntil?: string;
};

type ProductVouchersProps = {
  vouchers: ProductVoucherType[];
  hasReservation: boolean;
  onReservation: () => void;
};

const ProductVouchers = ({ vouchers, hasReservation, onReservation }: ProductVouchersProps) => {
  if (!vouchers || vouchers.length === 0) {
    return null;
  }

  return (
    <>
      <Separator className="my-6" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">
            {hasReservation 
              ? "Your Available Product Vouchers" 
              : "Reserve Now To Unlock These Vouchers!"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map((voucher, index) => (
            <Card 
              key={index} 
              className={
                hasReservation 
                  ? "bg-muted/50" 
                  : "bg-muted/50 relative overflow-hidden group"
              }
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
              <CardHeader className={hasReservation ? "" : "blur-sm"}>
                <CardTitle className="text-lg">{voucher.productName}</CardTitle>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductVouchers;
