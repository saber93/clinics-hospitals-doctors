
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (filterParam?: string) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', filterParam],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (filterParam === 'low-stock') {
        query = query.lte('stock_quantity', 10);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Map database fields to our Product interface
      return (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: item.price,
        category: item.category || '',
        stockQuantity: item.stock_quantity,
        imageUrl: item.image_url,
        discountPercentage: item.discount_percentage || 0,
        isAvailable: item.is_available !== false,
        sellerId: item.seller_id
      } as Product));
    }
  });

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  return {
    products,
    loading: isLoading,
    deleteProduct,
    refreshProducts: () => {} // Let React Query handle the refreshing
  };
};
