
import { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductImageWithFallback from "./ProductImageWithFallback";

interface ProductCardProps {
  product: Product;
  index: number;
  onDelete: (id: string, name: string) => Promise<void>;
  onEdit: (id: string) => void;
}

const ProductCard = ({ product, index, onDelete, onEdit }: ProductCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <ProductImageWithFallback
            imageUrl={product.image_url}
            productName={product.name}
            productId={product.id}
            index={index}
          />
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
                onClick={() => onDelete(product.id, product.name)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
