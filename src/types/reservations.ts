
export type Reservation = {
  id: string;
  client_id: string;
  vendor_id: string;
  service_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
};

export type Service = {
  id: string;
  vendor_id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
};

export type EnrichedReservation = Reservation & {
  clients: { name: string };
  vendors: { name: string };
  services: { name: string; price?: number };
};
