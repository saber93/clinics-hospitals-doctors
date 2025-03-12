
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, ImageOff, Tag } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
}

const ProductGrid = ({ products, loading, onDelete, onEdit }: ProductGridProps) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Pre-validate images when products change
  useEffect(() => {
    if (!products.length) return;
    
    // Clear previous errors when product list changes
    setImageErrors({});
    
    products.forEach(product => {
      if (!product.image_url) return;
      
      const img = new Image();
      img.onload = () => {
        setImageErrors(prev => ({ ...prev, [product.id]: false }));
      };
      img.onerror = () => {
        console.log(`Pre-validation failed for product image: ${product.id}`, product.image_url);
        setImageErrors(prev => ({ ...prev, [product.id]: true }));
      };
      img.src = product.image_url;
    });
  }, [products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <Card key={n} className="animate-pulse">
            <CardHeader className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      await onDelete(id);
      toast.success(`${name} has been deleted`);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Enhanced cosmetics-specific fallback images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop", // Skin care products
    "https://images.unsplash.com/photo-1583241475880-083f8152d7d2?q=80&w=800&auto=format&fit=crop", // Facial products  
    "https://images.unsplash.com/photo-1620916566256-4739d492ea02?q=80&w=800&auto=format&fit=crop", // Face cream
    "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=800&auto=format&fit=crop", // Beauty products
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop", // Cosmetics
    "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?q=80&w=800&auto=format&fit=crop", // Serum bottles
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop", // Makeup products
    "https://images.unsplash.com/photo-1614159102522-35260209ffa7?q=80&w=800&auto=format&fit=crop"  // Skincare
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productId: string, index: number) => {
    e.preventDefault();
    console.log(`Image error for product ${productId} with url:`, products.find(p => p.id === productId)?.image_url);
    const fallbackIndex = index % fallbackImages.length;
    e.currentTarget.src = fallbackImages[fallbackIndex];
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  // Function to get image URL, with fallback for specific problem products
  const getImageUrl = (product: Product, index: number): string => {
    // Special case for products we know have issues
    if (product.name.includes("Gentle Exfoliating Scrub")) {
      // Use a specific fallback for this product
      return "https://images.unsplash.com/photo-1583241475880-083f8152d7d2?q=80&w=800&auto=format&fit=crop";
    }
    
    if (!product.image_url || imageErrors[product.id]) {
      return fallbackImages[index % fallbackImages.length];
    }
    
    return product.image_url;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Card key={product.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
          <CardHeader className="p-0">
            <div className="aspect-video relative overflow-hidden bg-gray-100 rounded-t-lg">
              <img
                src={getImageUrl(product, index)}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                onError={(e) => handleImageError(e, product.id, index)}
                key={`img-${product.id}-${imageErrors[product.id] ? 'fallback' : 'original'}-${Date.now()}`}
              />
              {imageErrors[product.id] && (
                <div className="absolute bottom-0 left-0 right-0 bg-amber-500 bg-opacity-70 text-white text-xs p-1 text-center flex items-center justify-center">
                  <ImageOff className="h-3 w-3 mr-1" />
                  Using placeholder image
                </div>
              )}
              {product.discount_percentage && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {product.discount_percentage}% OFF
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description || "No description available"}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">${product.price.toFixed(2)}</span>
              {product.stock_quantity <= (product.low_stock_threshold || 10) && (
                <div className="flex items-center text-amber-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Low Stock
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between p-4 pt-0 border-t mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product.id)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {product.name}? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
