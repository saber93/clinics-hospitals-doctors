
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  low_stock_threshold?: number;
  discount_percentage?: number;
  image_url?: string;
  is_available?: boolean;
  seller_id: string;
}
