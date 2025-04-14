
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
      
      return (data || []).map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
        additional_images: [],
        stock_quantity: product.stock_quantity,
        low_stock_threshold: product.low_stock_threshold,
        is_available: product.is_available,
        category: product.category,
        seller_id: product.seller_id,
        discount_percentage: product.discount_percentage,
        is_reservable: false
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
