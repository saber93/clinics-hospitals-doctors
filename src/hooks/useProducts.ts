
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

// Sample pharmacy product data for initial display
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Ibuprofen 200mg Tablets",
    description: "Fast and effective relief from headaches, back pain, and fever",
    price: 8.99,
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 120,
    is_available: true,
    category: "Pain Relief",
    seller_id: "demo",
    discount_percentage: 10
  },
  {
    id: "2",
    name: "Digital Thermometer",
    description: "Fast and accurate temperature readings for all ages",
    price: 15.95,
    image_url: "https://images.unsplash.com/photo-1612452787715-f6626c2c1c7a?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 45,
    is_available: true,
    category: "Medical Devices",
    seller_id: "demo"
  },
  {
    id: "3",
    name: "First Aid Kit",
    description: "Complete emergency kit with bandages, antiseptics, and medical tools",
    price: 29.99,
    image_url: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 35,
    is_available: true,
    category: "First Aid",
    seller_id: "demo",
    discount_percentage: 15
  },
  {
    id: "4",
    name: "Vitamin D3 Supplements",
    description: "Support bone health and immune system with daily vitamin D3",
    price: 12.49,
    image_url: null,
    stock_quantity: 85,
    is_available: true,
    category: "Vitamins",
    seller_id: "demo"
  },
  {
    id: "5",
    name: "Allergy Relief Tablets",
    description: "24-hour relief from seasonal allergies and hay fever symptoms",
    price: 14.95,
    image_url: null,
    stock_quantity: 60,
    is_available: true,
    category: "Allergy",
    seller_id: "demo",
    discount_percentage: 5
  },
  {
    id: "6",
    name: "Antibacterial Hand Sanitizer",
    description: "Kills 99.9% of germs without water, with moisturizing aloe vera",
    price: 4.99,
    image_url: null,
    stock_quantity: 150,
    is_available: true,
    category: "Hygiene",
    seller_id: "demo"
  }
];

export const useProducts = (filterParam?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // In a real app, we would fetch from Supabase here
      // const { data: { session } } = await supabase.auth.getSession();
      // 
      // if (!session) {
      //   console.error("No active session");
      //   return;
      // }
      // 
      // let query = supabase.from('products').select('*');
      // 
      // if (filterParam === 'low-stock') {
      //   query = query.lte('stock_quantity', 10);
      // }
      // 
      // const { data, error } = await query;
      // 
      // if (error) {
      //   throw error;
      // }
      // 
      // setProducts(data || []);
      
      // For now, use demo products
      setTimeout(() => {
        setProducts(demoProducts);
        setLoading(false);
      }, 800); // Simulate loading
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      // In a real app, we would delete from Supabase here
      // const { error } = await supabase
      //   .from('products')
      //   .delete()
      //   .eq('id', id);
      // 
      // if (error) {
      //   throw error;
      // }
      
      // For now, just filter out the product locally
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterParam]);

  return {
    products,
    loading,
    deleteProduct,
    refreshProducts: fetchProducts
  };
};
