
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle, Tag } from "lucide-react";
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

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
}

const ProductGrid = ({ products, loading, onDelete, onEdit }: ProductGridProps) => {
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

  // Fallback images if product image URL is invalid or missing
  const fallbackImages = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop"
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    // Use a fallback image when the product image fails to load
    const fallbackIndex = index % fallbackImages.length;
    e.currentTarget.src = fallbackImages[fallbackIndex];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Card key={product.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
          <CardHeader className="p-0">
            <div className="aspect-video relative overflow-hidden bg-gray-100 rounded-t-lg">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => handleImageError(e, index)}
                />
              ) : (
                <img
                  src={fallbackImages[index % fallbackImages.length]}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
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
