
import { MockData } from '../types';

// Generate some date helpers
const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = 7 * oneDay;
const oneMonth = 30 * oneDay;

const tomorrow = new Date(now.getTime() + oneDay);
const nextWeek = new Date(now.getTime() + oneWeek);
const nextMonth = new Date(now.getTime() + oneMonth);

export const mockData: MockData = {
  users: {
    clients: [
      {
        id: 'client1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'client',
        phone: '555-123-4567',
        address: '123 Main St, Anytown, CA',
        profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-06-20'),
        reservations: [],
        favoriteVendors: []
      },
      {
        id: 'client2',
        name: 'Michael Smith',
        email: 'michael@example.com',
        role: 'client',
        phone: '555-987-6543',
        address: '456 Oak Ave, Somewhere, NY',
        profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        createdAt: new Date('2023-02-10'),
        updatedAt: new Date('2023-05-15'),
        reservations: [],
        favoriteVendors: []
      },
    ],
    vendors: [
      {
        id: 'vendor1',
        name: 'Emma Davis',
        email: 'emma@glowspa.com',
        role: 'vendor',
        businessName: 'Glow Skincare Spa',
        description: 'Premium skincare services with a focus on natural ingredients and relaxing treatments.',
        phone: '555-789-1234',
        address: '789 Spa Lane, Beverly Hills, CA',
        profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
        coverImage: 'https://images.unsplash.com/photo-1596178060671-7a58b264f506?q=80&w=1200',
        services: [],
        specialOffers: [],
        vouchers: [],
        promoCodes: [],
        availableSlots: [],
        rating: 4.8,
        createdAt: new Date('2022-11-05'),
        updatedAt: new Date('2023-07-12')
      },
      {
        id: 'vendor2',
        name: 'James Wilson',
        email: 'james@renewclinic.com',
        role: 'vendor',
        businessName: 'Renew Body Treatments',
        description: 'Specialized body treatments focusing on rejuvenation and wellness for all body types.',
        phone: '555-456-7890',
        address: '101 Wellness Blvd, Seattle, WA',
        profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
        coverImage: 'https://images.unsplash.com/photo-1516900448138-898720802dc5?q=80&w=1200',
        services: [],
        specialOffers: [],
        vouchers: [],
        promoCodes: [],
        availableSlots: [],
        rating: 4.6,
        createdAt: new Date('2022-12-15'),
        updatedAt: new Date('2023-08-01')
      },
    ],
    admins: [
      {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@skinnect.com',
        role: 'admin',
        createdAt: new Date('2022-10-01'),
        updatedAt: new Date('2023-01-10')
      }
    ]
  },
  services: [
    {
      id: 'service1',
      vendorId: 'vendor1',
      name: 'Deep Cleansing Facial',
      description: 'A thorough facial treatment that removes impurities and unclogs pores for fresh, clean skin.',
      duration: 60,
      price: 89.99,
      category: 'facial',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=550',
      createdAt: new Date('2022-11-10'),
      updatedAt: new Date('2023-02-15')
    },
    {
      id: 'service2',
      vendorId: 'vendor1',
      name: 'Anti-Aging Treatment',
      description: 'Specialized treatment focusing on reducing fine lines and wrinkles for more youthful-looking skin.',
      duration: 75,
      price: 129.99,
      category: 'facial',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=550',
      createdAt: new Date('2022-11-12'),
      updatedAt: new Date('2023-03-20')
    },
    {
      id: 'service3',
      vendorId: 'vendor2',
      name: 'Full Body Massage',
      description: 'Relaxing full body massage to release tension and improve circulation.',
      duration: 90,
      price: 119.99,
      category: 'massage',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=550',
      createdAt: new Date('2022-12-20'),
      updatedAt: new Date('2023-04-10')
    },
    {
      id: 'service4',
      vendorId: 'vendor2',
      name: 'Body Scrub & Wrap',
      description: 'Exfoliating body scrub followed by a nourishing wrap to hydrate and rejuvenate the skin.',
      duration: 120,
      price: 149.99,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=550',
      createdAt: new Date('2022-12-22'),
      updatedAt: new Date('2023-05-05')
    },
  ],
  specialOffers: [
    {
      id: 'offer1',
      vendorId: 'vendor1',
      title: 'Summer Glow Special',
      description: 'Enjoy 20% off all facial treatments for the summer season!',
      discountType: 'percentage',
      discountValue: 20,
      startDate: now,
      endDate: nextMonth,
      applicableServices: ['service1', 'service2'],
      image: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=600',
      isActive: true,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-06-01')
    },
    {
      id: 'offer2',
      vendorId: 'vendor2',
      title: 'Relax & Rejuvenate Package',
      description: 'Special package: Full body massage and body scrub for a fixed price of $199.99',
      discountType: 'fixed',
      discountValue: 69.99, // Regular would be 119.99 + 149.99 = 269.98
      startDate: now,
      endDate: nextWeek,
      applicableServices: ['service3', 'service4'],
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=600',
      isActive: true,
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-07-01')
    }
  ],
  vouchers: [
    {
      id: 'voucher1',
      vendorId: 'vendor1',
      code: 'FIRSTTIME25',
      title: 'First-Time Client Discount',
      description: '25% off your first treatment',
      discountType: 'percentage',
      discountValue: 25,
      startDate: now,
      endDate: nextMonth,
      usageLimit: 100,
      usageCount: 23,
      applicableServices: ['service1', 'service2'],
      minimumSpend: 50,
      isActive: true,
      createdAt: new Date('2023-05-01'),
      updatedAt: new Date('2023-05-01')
    },
    {
      id: 'voucher2',
      vendorId: 'vendor2',
      code: 'RELAX50',
      title: 'Massage Voucher',
      description: '$50 off any massage treatment',
      discountType: 'fixed',
      discountValue: 50,
      startDate: now,
      endDate: nextWeek,
      usageLimit: 50,
      usageCount: 12,
      applicableServices: ['service3'],
      minimumSpend: 100,
      isActive: true,
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2023-06-15')
    }
  ],
  promoCodes: [
    {
      id: 'promo1',
      vendorId: 'vendor1',
      code: 'SUMMER15',
      title: 'Summer Promo',
      description: '15% off all treatments',
      discountType: 'percentage',
      discountValue: 15,
      startDate: now,
      endDate: nextMonth,
      usageLimit: 200,
      usageCount: 45,
      applicableServices: ['service1', 'service2'],
      isActive: true,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-06-01')
    },
    {
      id: 'promo2',
      vendorId: 'vendor2',
      code: 'WELLNESS20',
      title: 'Wellness Week Promotion',
      description: '20% off body treatments',
      discountType: 'percentage',
      discountValue: 20,
      startDate: now,
      endDate: nextWeek,
      usageLimit: 100,
      usageCount: 28,
      applicableServices: ['service3', 'service4'],
      isActive: true,
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-07-01')
    }
  ],
  reservations: [
    {
      id: 'reservation1',
      clientId: 'client1',
      vendorId: 'vendor1',
      serviceId: 'service1',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000), // 1 hour after start
      status: 'confirmed',
      totalPrice: 89.99,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'reservation2',
      clientId: 'client2',
      vendorId: 'vendor2',
      serviceId: 'service3',
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 90 * 60 * 1000), // 1.5 hours after start
      status: 'pending',
      totalPrice: 119.99,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  timeSlots: [
    {
      id: 'slot1',
      vendorId: 'vendor1',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000), // 1 hour after start
      isBooked: true
    },
    {
      id: 'slot2',
      vendorId: 'vendor1',
      startTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // 2 hours after first slot
      endTime: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000), // 1 hour duration
      isBooked: false
    },
    {
      id: 'slot3',
      vendorId: 'vendor2',
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 90 * 60 * 1000), // 1.5 hours after start
      isBooked: true
    },
    {
      id: 'slot4',
      vendorId: 'vendor2',
      startTime: new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000), // 3 hours after first slot
      endTime: new Date(nextWeek.getTime() + 5 * 60 * 60 * 1000), // 2 hours duration
      isBooked: false
    }
  ]
};

// Connect related data
mockData.users.vendors[0].services = [mockData.services[0], mockData.services[1]];
mockData.users.vendors[1].services = [mockData.services[2], mockData.services[3]];

mockData.users.vendors[0].specialOffers = [mockData.specialOffers[0]];
mockData.users.vendors[1].specialOffers = [mockData.specialOffers[1]];

mockData.users.vendors[0].vouchers = [mockData.vouchers[0]];
mockData.users.vendors[1].vouchers = [mockData.vouchers[1]];

mockData.users.vendors[0].promoCodes = [mockData.promoCodes[0]];
mockData.users.vendors[1].promoCodes = [mockData.promoCodes[1]];

mockData.users.vendors[0].availableSlots = [mockData.timeSlots[0], mockData.timeSlots[1]];
mockData.users.vendors[1].availableSlots = [mockData.timeSlots[2], mockData.timeSlots[3]];

mockData.users.clients[0].reservations = [mockData.reservations[0]];
mockData.users.clients[1].reservations = [mockData.reservations[1]];

mockData.users.clients[0].favoriteVendors = [mockData.users.vendors[0]];
mockData.users.clients[1].favoriteVendors = [mockData.users.vendors[1]];
