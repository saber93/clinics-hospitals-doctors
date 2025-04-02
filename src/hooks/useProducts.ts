
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

// Sample pharmacy product data for non-medicinal items
const demoProducts: Product[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
    name: "Compression Bandage",
    description: "Elasticated support bandage for sprains and muscle injuries",
    price: 8.49,
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 85,
    is_available: true,
    category: "First Aid",
    seller_id: "demo"
  },
  {
    id: "4",
    name: "Antibacterial Hand Sanitizer",
    description: "Kills 99.9% of germs without water, with moisturizing aloe vera",
    price: 4.99,
    image_url: "https://images.unsplash.com/photo-1585000177405-5930b17ad2cd?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 150,
    is_available: true,
    category: "Hygiene",
    seller_id: "demo"
  },
  {
    id: "5",
    name: "Ice Pack",
    description: "Reusable cooling pack for injuries and pain relief",
    price: 6.95,
    image_url: "https://images.unsplash.com/photo-1584308074634-d6c5e9a19b2f?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 60,
    is_available: true,
    category: "Medical Supplies",
    seller_id: "demo",
    discount_percentage: 5
  },
  {
    id: "6",
    name: "Digital Blood Pressure Monitor",
    description: "Easy-to-use home blood pressure monitoring device with large display",
    price: 42.99,
    image_url: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 25,
    is_available: true,
    category: "Medical Devices",
    seller_id: "demo"
  },
  {
    id: "7",
    name: "Pain Relief Gel",
    description: "Fast-acting topical gel for muscle and joint pain relief",
    price: 12.49,
    image_url: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 42,
    is_available: true,
    category: "Pain Relief",
    seller_id: "demo"
  },
  {
    id: "8",
    name: "Pulse Oximeter",
    description: "Monitor your blood oxygen levels and pulse rate with this digital device",
    price: 34.95,
    image_url: "https://images.unsplash.com/photo-1612452787714-d235e15697e9?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 18,
    is_available: true,
    category: "Medical Devices",
    seller_id: "demo",
    discount_percentage: 10
  },
  {
    id: "9",
    name: "Humidifier",
    description: "Ultrasonic cool mist humidifier for better breathing and sleeping",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1590856300127-96a3ddbb0c63?auto=format&fit=crop&w=500&q=80",
    stock_quantity: 12,
    is_available: true,
    category: "Wellness",
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
