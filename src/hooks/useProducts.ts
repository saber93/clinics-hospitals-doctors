
import { useState, useEffect } from "react";
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
      
      return data || [];
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
