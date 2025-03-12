
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ProductVoucherType } from "../types";
import VoucherImageCarousel from "./VoucherImageCarousel";

interface VoucherPreviewDialogProps {
  voucher: ProductVoucherType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageIndex: number;
  slideDirection: "left" | "right" | null;
  onPrevImage: () => void;
  onNextImage: () => void;
  allImages: string[];
}

const VoucherPreviewDialog = ({
  voucher,
  isOpen,
  onOpenChange,
  currentImageIndex,
  slideDirection,
  onPrevImage,
  onNextImage,
  allImages
}: VoucherPreviewDialogProps) => {
  if (!voucher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{voucher.productName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <VoucherImageCarousel
            images={allImages}
            productName={voucher.productName}
            currentIndex={currentImageIndex}
            slideDirection={slideDirection}
            onPrevious={onPrevImage}
            onNext={onNextImage}
          />
          
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground mt-1">{voucher.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground px-3 py-1.5 text-sm font-bold">
              {voucher.discount}% OFF
            </Badge>
            {voucher.validUntil && (
              <span className="text-sm text-muted-foreground">
                Valid until: {new Date(voucher.validUntil).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherPreviewDialog;
