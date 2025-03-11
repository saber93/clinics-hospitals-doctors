
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyProductsStateProps {
  searchTerm: string;
  isFilteredByLowStock: boolean;
}

const EmptyProductsState = ({ searchTerm, isFilteredByLowStock }: EmptyProductsStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
      <h3 className="text-lg font-medium">No products found</h3>
      <p className="text-muted-foreground mb-4">
        {searchTerm 
          ? "No products match your search" 
          : isFilteredByLowStock 
            ? "No products are below their stock threshold" 
            : "You haven't added any products yet"
        }
      </p>
      <Button onClick={() => navigate("/products/new")}>
        Add your first product
      </Button>
    </div>
  );
};

export default EmptyProductsState;
