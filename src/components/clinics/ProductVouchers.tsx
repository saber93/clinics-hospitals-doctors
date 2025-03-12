
import React, { useState } from "react";
import { Gift, ImageIcon, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductImageWithFallback from "@/components/products/ProductImageWithFallback";

type ProductVoucherType = {
  productName: string;
  description: string;
  discount: number;
  validUntil?: string;
  imageUrl?: string;
  additionalImages?: string[]; // Array of additional image URLs
};

type ProductVouchersProps = {
  vouchers: ProductVoucherType[];
  hasReservation: boolean;
  onReservation: () => void;
};

const ProductVouchers = ({ vouchers, hasReservation, onReservation }: ProductVouchersProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductVoucherType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!vouchers || vouchers.length === 0) {
    return null;
  }

  const handleProductPreview = (product: ProductVoucherType) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset to first image when opening preview
    setIsDialogOpen(true);
  };

  // Get all images for the selected product (main image + additional images)
  const getAllProductImages = () => {
    if (!selectedProduct) return [];
    
    const images = [selectedProduct.imageUrl];
    if (selectedProduct.additionalImages) {
      images.push(...selectedProduct.additionalImages.filter(img => img));
    }
    
    return images.filter(Boolean) as string[];
  };

  const allImages = getAllProductImages();

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

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
              className={`
                ${hasReservation ? "bg-muted/50" : "bg-muted/50 relative overflow-hidden group"}
                cursor-pointer hover:shadow-md transition-shadow duration-200
              `}
              onClick={() => handleProductPreview(voucher)}
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
              
              {/* Product Image */}
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
          ))}
        </div>
      </div>

      {/* Product Preview Dialog with Image Carousel */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.productName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Image Carousel */}
                <div className="rounded-md overflow-hidden relative">
                  {allImages.length > 0 && (
                    <>
                      <div className="relative aspect-video">
                        <ProductImageWithFallback
                          imageUrl={allImages[currentImageIndex]}
                          productName={selectedProduct.productName}
                          productId={`preview-${selectedProduct.productName}-${currentImageIndex}`}
                          index={currentImageIndex}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Image Navigation Controls */}
                      {allImages.length > 1 && (
                        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center">
                          <Button 
                            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} 
                            variant="ghost" 
                            size="icon" 
                            className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 rounded-full ml-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Previous image</span>
                          </Button>
                          <Button 
                            onClick={(e) => { e.stopPropagation(); handleNextImage(); }} 
                            variant="ghost" 
                            size="icon" 
                            className="bg-black/20 hover:bg-black/40 text-white h-8 w-8 rounded-full mr-2"
                          >
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">Next image</span>
                          </Button>
                        </div>
                      )}
                      
                      {/* Image Counter */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-muted-foreground mt-1">{selectedProduct.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1.5 text-sm font-bold">
                    {selectedProduct.discount}% OFF
                  </Badge>
                  {selectedProduct.validUntil && (
                    <span className="text-sm text-muted-foreground">
                      Valid until: {new Date(selectedProduct.validUntil).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductVouchers;
