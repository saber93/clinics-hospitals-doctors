
import React, { useState } from "react";
import { Gift, ImageIcon, ExternalLink } from "lucide-react";
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
};

type ProductVouchersProps = {
  vouchers: ProductVoucherType[];
  hasReservation: boolean;
  onReservation: () => void;
};

const ProductVouchers = ({ vouchers, hasReservation, onReservation }: ProductVouchersProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductVoucherType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!vouchers || vouchers.length === 0) {
    return null;
  }

  const handleProductPreview = (product: ProductVoucherType) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
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
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-1 h-auto" 
                    onClick={() => handleProductPreview(voucher)}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Preview</span>
                  </Button>
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

      {/* Product Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.productName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-md overflow-hidden">
                  <ProductImageWithFallback
                    imageUrl={selectedProduct.imageUrl}
                    productName={selectedProduct.productName}
                    productId={`preview-${selectedProduct.productName}`}
                    index={0}
                    className="w-full h-auto aspect-video object-cover"
                  />
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
