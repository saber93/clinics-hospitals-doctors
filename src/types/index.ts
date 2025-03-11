
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

// Types missing from the error list
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'vendor' | 'admin' | 'doctor' | 'center';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  phone?: string;
  address?: string;
  profileImage?: string;
  reservations: Reservation[];
  favoriteVendors: Vendor[];
}

export interface Vendor extends User {
  businessName: string;
  description: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  coverImage?: string;
  services: Service[];
  specialOffers: SpecialOffer[];
  vouchers: Voucher[];
  promoCodes: PromoCode[];
  availableSlots: TimeSlot[];
  rating: number;
}

export interface Admin extends User {
  // Admin specific properties can be added here
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  clientId: string;
  vendorId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  specialOfferId?: string;
  voucherId?: string;
  promoCodeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpecialOffer {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  applicableServices: string[];
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Voucher {
  id: string;
  vendorId: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  usageCount: number;
  applicableServices: string[];
  minimumSpend?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoCode {
  id: string;
  vendorId: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  usageCount: number;
  applicableServices: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  vendorId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
}

export interface MockData {
  users: {
    clients: Client[];
    vendors: Vendor[];
    admins: Admin[];
  };
  services: Service[];
  specialOffers: SpecialOffer[];
  vouchers: Voucher[];
  promoCodes: PromoCode[];
  reservations: Reservation[];
  timeSlots: TimeSlot[];
}
