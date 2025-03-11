
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductFormHeaderProps {
  isEditMode: boolean;
}

const ProductFormHeader = ({ isEditMode }: ProductFormHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/products")}
        className="mr-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h2 className="text-2xl font-bold">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h2>
    </div>
  );
};

export default ProductFormHeader;
