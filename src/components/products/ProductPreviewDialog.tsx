
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types";
import ProductImageCarousel from "./ProductImageCarousel";
import { AlertTriangle } from "lucide-react";

interface ProductPreviewDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageIndex: number;
  slideDirection: "left" | "right" | null;
  onPrevImage: () => void;
  onNextImage: () => void;
  allImages: string[];
}

const ProductPreviewDialog = ({
  product,
  isOpen,
  onOpenChange,
  currentImageIndex,
  slideDirection,
  onPrevImage,
  onNextImage,
  allImages
}: ProductPreviewDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ProductImageCarousel
            images={allImages}
            productName={product.name}
            currentIndex={currentImageIndex}
            slideDirection={slideDirection}
            onPrevious={onPrevImage}
            onNext={onNextImage}
          />
          
          <div>
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground mt-1">{product.description || "No description available"}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.stock_quantity <= (product.low_stock_threshold || 10) && (
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Low Stock
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog;
