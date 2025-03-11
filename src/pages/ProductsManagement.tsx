
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsSearchBar from "@/components/products/ProductsSearchBar";
import ProductsGrid from "@/components/products/ProductsGrid";
import EmptyProductsState from "@/components/products/EmptyProductsState";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useProducts } from "@/hooks/useProducts";

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [user, setUser] = useState<any>(null);
  
  // Check for filter parameter
  const filterParam = searchParams.get("filter");
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to manage products");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
    };
    
    checkUser();
  }, [navigate]);

  const { products, loading, deleteProduct } = useProducts(
    user?.id,
    filterParam,
    sortBy,
    sortOrder
  );
  
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  
  const pageTitle = filterParam === "low-stock" ? "Low Stock Products" : "Product Management";
  
  return (
    <div className="p-6">
      <ProductsHeader title={pageTitle} />
      
      <ProductsSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSortToggle={toggleSort}
      />
      
      {loading ? (
        <LoadingSpinner />
      ) : filteredProducts.length === 0 ? (
        <EmptyProductsState 
          searchTerm={searchTerm}
          isFilteredByLowStock={filterParam === "low-stock"}
        />
      ) : (
        <ProductsGrid 
          products={filteredProducts} 
          onDeleteProduct={deleteProduct} 
        />
      )}
    </div>
  );
};

export default ProductsManagement;
