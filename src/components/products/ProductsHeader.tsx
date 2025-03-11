
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductsHeaderProps {
  title: string;
}

const ProductsHeader = ({ title }: ProductsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={() => navigate("/products/new")}>
        <Plus className="mr-2 h-4 w-4" /> Add New Product
      </Button>
    </div>
  );
};

export default ProductsHeader;
