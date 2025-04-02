
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

// Sample product data for initial display
const demoProducts: Product[] = [
  {
    id: "1",
    name: "Smart Wellness Monitor",
    description: "Track your health metrics in real-time with this advanced monitoring device",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 25,
    is_available: true,
    category: "Wellness",
    seller_id: "demo",
    discount_percentage: 10
  },
  {
    id: "2",
    name: "Medical Grade Stethoscope",
    description: "Professional stethoscope for medical practitioners and students",
    price: 89.95,
    image_url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 50,
    is_available: true,
    category: "Equipment",
    seller_id: "demo"
  },
  {
    id: "3",
    name: "Advanced First Aid Kit",
    description: "Comprehensive first aid kit for home, travel, and emergencies",
    price: 45.99,
    image_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 100,
    is_available: true,
    category: "First Aid",
    seller_id: "demo",
    discount_percentage: 5
  },
  {
    id: "4",
    name: "Digital Blood Pressure Monitor",
    description: "Easy to use blood pressure monitor with digital display",
    price: 59.99,
    image_url: null,
    stock_quantity: 30,
    is_available: true,
    category: "Monitoring",
    seller_id: "demo"
  },
  {
    id: "5",
    name: "Organic Essential Oil Set",
    description: "Set of 6 organic essential oils for aromatherapy and wellness",
    price: 34.95,
    image_url: null,
    stock_quantity: 45,
    is_available: true,
    category: "Wellness",
    seller_id: "demo",
    discount_percentage: 15
  },
  {
    id: "6",
    name: "Medical Thermometer",
    description: "Quick and accurate temperature reading for adults and children",
    price: 19.99,
    image_url: null,
    stock_quantity: 75,
    is_available: true,
    category: "Equipment",
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
