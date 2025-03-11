
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  discount_percentage: number;
  low_stock_threshold: number;
  image_url?: string;
};

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => Promise<void>;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        
        {product.stock_quantity <= product.low_stock_threshold && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
        
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
            {product.discount_percentage}% OFF
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="font-medium text-lg mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description || "No description provided"}
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-sm">
                Stock: <span className={product.stock_quantity <= product.low_stock_threshold ? "text-amber-500 font-medium" : ""}>
                  {product.stock_quantity}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => navigate(`/products/edit/${product.id}`)}
              >
                <Edit className="mr-1 h-4 w-4" /> Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-destructive hover:text-destructive"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
