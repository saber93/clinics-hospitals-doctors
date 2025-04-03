
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductVoucherType } from "../types";
import { SpecialtyTheme } from "@/utils/clinics/specialtyThemes";

interface VoucherPreviewDialogProps {
  voucher: ProductVoucherType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageIndex: number;
  slideDirection: "left" | "right" | null;
  onPrevImage: () => void;
  onNextImage: () => void;
  allImages: string[];
  specialtyTheme: SpecialtyTheme;
}

const VoucherPreviewDialog: React.FC<VoucherPreviewDialogProps> = ({
  voucher,
  isOpen,
  onOpenChange,
  currentImageIndex,
  slideDirection,
  onPrevImage,
  onNextImage,
  allImages,
  specialtyTheme
}) => {
  if (!voucher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md border-2 ${specialtyTheme.cardStyle}`}>
        <DialogHeader>
          <DialogTitle className={`text-${specialtyTheme.primaryColor}`}>{voucher.productName}</DialogTitle>
          <Badge className={`${specialtyTheme.gradientStyle} text-white self-start border-0`}>
            {voucher.discount}% OFF
          </Badge>
        </DialogHeader>

        {allImages.length > 0 && (
          <div className="relative overflow-hidden h-64 mt-4">
            <div
              className={`absolute transition-transform duration-200 ease-in-out w-full h-full flex ${
                slideDirection === "left"
                  ? "translate-x-[-100%]"
                  : slideDirection === "right"
                  ? "translate-x-[100%]"
                  : "translate-x-0"
              }`}
            >
              <img
                src={allImages[currentImageIndex]}
                alt={`${voucher.productName} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/70 hover:bg-${specialtyTheme.primaryColor} hover:text-white`}
                  onClick={onPrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-white/70 hover:bg-${specialtyTheme.primaryColor} hover:text-white`}
                  onClick={onNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {allImages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i === currentImageIndex
                          ? `bg-${specialtyTheme.primaryColor}`
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="space-y-3">
          <p>{voucher.description}</p>

          {voucher.validUntil && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Valid until: {voucher.validUntil}</span>
            </div>
          )}

          <Button className={`w-full ${specialtyTheme.gradientStyle} border-0 hover:opacity-90`}>
            Redeem Voucher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherPreviewDialog;
