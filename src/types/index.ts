
export type UserRole = 'client' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'client';
  phone?: string;
  address?: string;
  profileImage?: string;
  reservations: Reservation[];
  favoriteVendors: Vendor[];
}

export interface Vendor extends User {
  role: 'vendor';
  businessName: string;
  description: string;
  phone: string;
  address: string;
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
  role: 'admin';
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  image?: string;
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

export interface Reservation {
  id: string;
  clientId: string;
  vendorId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialOfferId?: string;
  voucherId?: string;
  promoCodeId?: string;
  totalPrice: number;
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
  applicableServices: string[]; // service IDs
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
  applicableServices: string[]; // service IDs
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
  applicableServices: string[]; // service IDs
  minimumSpend?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data interfaces for development
export interface MockData {
  users: {
    clients: Client[];
    vendors: Vendor[];
    admins: Admin[];
  };
  services: Service[];
  reservations: Reservation[];
  specialOffers: SpecialOffer[];
  vouchers: Voucher[];
  promoCodes: PromoCode[];
  timeSlots: TimeSlot[];
}
