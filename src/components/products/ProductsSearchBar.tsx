
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

interface ProductsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortToggle: (column: string) => void;
}

const ProductsSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onSortToggle 
}: ProductsSearchBarProps) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        onClick={() => onSortToggle('name')}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        onClick={() => onSortToggle('price')}
      >
        Price <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        onClick={() => onSortToggle('stock_quantity')}
      >
        Stock <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductsSearchBar;
