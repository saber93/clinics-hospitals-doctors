
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, deleteProduct } = useProducts();
  
  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold">Products Management</h2>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button 
            onClick={() => navigate("/add-product")}
            className="whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <ProductGrid 
        products={filteredProducts}
        loading={loading}
        onDelete={deleteProduct}
        onEdit={(id) => navigate(`/edit-product/${id}`)}
      />
    </div>
  );
};

export default ProductsManagement;
