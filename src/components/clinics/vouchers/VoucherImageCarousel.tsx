
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImageWithFallback from "@/components/products/ProductImageWithFallback";

interface VoucherImageCarouselProps {
  images: string[];
  productName: string;
  currentIndex: number;
  slideDirection: "left" | "right" | null;
  onPrevious: () => void;
  onNext: () => void;
}

const VoucherImageCarousel = ({
  images,
  productName,
  currentIndex,
  slideDirection,
  onPrevious,
  onNext
}: VoucherImageCarouselProps) => {
  if (images.length === 0) return null;

  return (
    <div className="rounded-md overflow-hidden relative">
      <div className="relative aspect-video overflow-hidden">
        <div 
          className={`
            w-full h-full transition-all duration-300 ease-in-out
            ${slideDirection === "left" ? "translate-x-[-100%] opacity-0" : 
              slideDirection === "right" ? "translate-x-[100%] opacity-0" : 
              "translate-x-0 opacity-100"}
          `}
        >
          <ProductImageWithFallback
            imageUrl={images[currentIndex]}
            productName={productName}
            productId={`preview-${productName}-${currentIndex}`}
            index={currentIndex}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center">
            <Button 
              onClick={(e) => { e.stopPropagation(); onPrevious(); }} 
              variant="ghost" 
              size="icon" 
              className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 rounded-full ml-2 transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button 
              onClick={(e) => { e.stopPropagation(); onNext(); }} 
              variant="ghost" 
              size="icon" 
              className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 rounded-full mr-2 transition-all duration-200 hover:scale-110"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default VoucherImageCarousel;
