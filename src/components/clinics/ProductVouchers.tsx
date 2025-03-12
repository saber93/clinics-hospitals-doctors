
import React, { useState } from "react";
import { Gift } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import VoucherCard from "./vouchers/VoucherCard";
import VoucherPreviewDialog from "./vouchers/VoucherPreviewDialog";
import { ProductVoucherType } from "./types";

interface ProductVouchersProps {
  vouchers: ProductVoucherType[];
  hasReservation: boolean;
  onReservation: () => void;
}

const ProductVouchers = ({ vouchers, hasReservation, onReservation }: ProductVouchersProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductVoucherType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  if (!vouchers || vouchers.length === 0) {
    return null;
  }

  const handleProductPreview = (product: ProductVoucherType) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setSlideDirection(null);
    setIsDialogOpen(true);
  };

  const getAllProductImages = () => {
    if (!selectedProduct) return [];
    
    const images = [selectedProduct.imageUrl];
    if (selectedProduct.additionalImages) {
      images.push(...selectedProduct.additionalImages.filter(img => img));
    }
    
    return images.filter(Boolean) as string[];
  };

  const handlePrevImage = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      setTimeout(() => setSlideDirection(null), 50);
    }, 200);
  };

  const handleNextImage = () => {
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      setTimeout(() => setSlideDirection(null), 50);
    }, 200);
  };

  const allImages = getAllProductImages();

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
            <VoucherCard
              key={index}
              voucher={voucher}
              hasReservation={hasReservation}
              onPreview={handleProductPreview}
              index={index}
            />
          ))}
        </div>
      </div>

      <VoucherPreviewDialog
        voucher={selectedProduct}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentImageIndex={currentImageIndex}
        slideDirection={slideDirection}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        allImages={allImages}
      />
    </>
  );
};

export default ProductVouchers;
