
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MockData, Service, Reservation, SpecialOffer, Voucher, 
  PromoCode, TimeSlot, Vendor, Client 
} from '../types';
import { mockData } from '../data/mockData';
import { useAuth } from './AuthContext';

type AppContextType = {
  services: Service[];
  reservations: Reservation[];
  specialOffers: SpecialOffer[];
  vouchers: Voucher[];
  promoCodes: PromoCode[];
  timeSlots: TimeSlot[];
  vendors: Vendor[];
  clients: Client[];
  
  // Service functions
  getServiceById: (id: string) => Service | undefined;
  getVendorServices: (vendorId: string) => Service[];
  
  // Reservation functions
  getUserReservations: () => Reservation[];
  createReservation: (reservation: Partial<Reservation>) => Promise<boolean>;
  updateReservationStatus: (id: string, status: Reservation['status']) => Promise<boolean>;
  
  // Vendor functions
  getVendorById: (id: string) => Vendor | undefined;
  
  // Offers, vouchers, promos
  getVendorOffers: (vendorId: string) => SpecialOffer[];
  getVendorVouchers: (vendorId: string) => Voucher[];
  getVendorPromoCodes: (vendorId: string) => PromoCode[];
  validatePromoCode: (code: string) => PromoCode | undefined;
  validateVoucher: (code: string) => Voucher | undefined;
  
  // Time slots
  getAvailableTimeSlots: (vendorId: string, date: Date) => TimeSlot[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [data, setData] = useState<MockData>(mockData);

  // Load or refresh mockData
  useEffect(() => {
    // In a real app, this would fetch data from an API
    setData(mockData);
  }, []);

  // Service functions
  const getServiceById = (id: string) => {
    return data.services.find(service => service.id === id);
  };

  const getVendorServices = (vendorId: string) => {
    return data.services.filter(service => service.vendorId === vendorId);
  };

  // Reservation functions
  const getUserReservations = () => {
    if (!user) return [];
    
    if (user.role === 'client') {
      return data.reservations.filter(res => res.clientId === user.id);
    } else if (user.role === 'vendor') {
      return data.reservations.filter(res => res.vendorId === user.id);
    } else {
      // Admin can see all reservations
      return data.reservations;
    }
  };

  const createReservation = async (reservation: Partial<Reservation>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if timeslot is available
        const isSlotAvailable = data.timeSlots.some(slot => 
          slot.vendorId === reservation.vendorId && 
          slot.startTime.getTime() === reservation.startTime?.getTime() && 
          !slot.isBooked
        );

        if (!isSlotAvailable) {
          resolve(false);
          return;
        }

        // Create new reservation
        const newReservation: Reservation = {
          id: `reservation${Date.now()}`,
          clientId: reservation.clientId || '',
          vendorId: reservation.vendorId || '',
          serviceId: reservation.serviceId || '',
          startTime: reservation.startTime || new Date(),
          endTime: reservation.endTime || new Date(),
          status: 'pending',
          totalPrice: reservation.totalPrice || 0,
          specialOfferId: reservation.specialOfferId,
          voucherId: reservation.voucherId,
          promoCodeId: reservation.promoCodeId,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Update data (in a real app, this would be an API call)
        setData(prevData => ({
          ...prevData,
          reservations: [...prevData.reservations, newReservation],
          // Update timeslot to booked
          timeSlots: prevData.timeSlots.map(slot => 
            slot.vendorId === reservation.vendorId && 
            slot.startTime.getTime() === reservation.startTime?.getTime()
              ? { ...slot, isBooked: true }
              : slot
          )
        }));

        resolve(true);
      }, 1000);
    });
  };

  const updateReservationStatus = async (id: string, status: Reservation['status']): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData(prevData => ({
          ...prevData,
          reservations: prevData.reservations.map(res => 
            res.id === id ? { ...res, status, updatedAt: new Date() } : res
          )
        }));
        resolve(true);
      }, 1000);
    });
  };

  // Vendor functions
  const getVendorById = (id: string) => {
    return data.users.vendors.find(vendor => vendor.id === id);
  };

  // Offers, vouchers, promos
  const getVendorOffers = (vendorId: string) => {
    return data.specialOffers.filter(offer => 
      offer.vendorId === vendorId && offer.isActive && 
      offer.startDate <= new Date() && offer.endDate >= new Date()
    );
  };

  const getVendorVouchers = (vendorId: string) => {
    return data.vouchers.filter(voucher => 
      voucher.vendorId === vendorId && voucher.isActive && 
      voucher.startDate <= new Date() && voucher.endDate >= new Date() &&
      voucher.usageCount < voucher.usageLimit
    );
  };

  const getVendorPromoCodes = (vendorId: string) => {
    return data.promoCodes.filter(promo => 
      promo.vendorId === vendorId && promo.isActive && 
      promo.startDate <= new Date() && promo.endDate >= new Date() &&
      promo.usageCount < promo.usageLimit
    );
  };

  const validatePromoCode = (code: string) => {
    return data.promoCodes.find(promo => 
      promo.code === code && promo.isActive && 
      promo.startDate <= new Date() && promo.endDate >= new Date() &&
      promo.usageCount < promo.usageLimit
    );
  };

  const validateVoucher = (code: string) => {
    return data.vouchers.find(voucher => 
      voucher.code === code && voucher.isActive && 
      voucher.startDate <= new Date() && voucher.endDate >= new Date() &&
      voucher.usageCount < voucher.usageLimit
    );
  };

  // Time slots
  const getAvailableTimeSlots = (vendorId: string, date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return data.timeSlots.filter(slot => 
      slot.vendorId === vendorId && 
      slot.startTime >= startOfDay && slot.startTime <= endOfDay &&
      !slot.isBooked
    );
  };

  return (
    <AppContext.Provider value={{
      services: data.services,
      reservations: data.reservations,
      specialOffers: data.specialOffers,
      vouchers: data.vouchers,
      promoCodes: data.promoCodes,
      timeSlots: data.timeSlots,
      vendors: data.users.vendors,
      clients: data.users.clients,
      
      // Functions
      getServiceById,
      getVendorServices,
      getUserReservations,
      createReservation,
      updateReservationStatus,
      getVendorById,
      getVendorOffers,
      getVendorVouchers,
      getVendorPromoCodes,
      validatePromoCode,
      validateVoucher,
      getAvailableTimeSlots
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
