
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string | null;
  additional_images?: string[];
  stock_quantity: number;
  low_stock_threshold?: number;
  is_available: boolean;
  category?: string;
  seller_id: string;
  discount_percentage?: number;
  is_reservable?: boolean;
  reservation_duration?: number; // in minutes
}
