
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "@/components/products/ProductCard";

export const useProducts = (
  userId: string | undefined,
  filterParam: string | null,
  sortBy: string,
  sortOrder: "asc" | "desc"
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch product data
        let query = supabase
          .from('products')
          .select('*')
          .eq('seller_id', userId)
          .order(sortBy, { ascending: sortOrder === "asc" });
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Apply low stock filter if needed
        let filteredProducts = data;
        if (filterParam === "low-stock") {
          filteredProducts = filteredProducts.filter(p => 
            p.stock_quantity <= p.low_stock_threshold
          );
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [userId, filterParam, sortBy, sortOrder]);

  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      throw error;
    }
  };

  return {
    products,
    loading,
    error,
    deleteProduct
  };
};
