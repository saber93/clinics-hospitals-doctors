
export type Booking = {
  id: string;
  services: { name: string; price?: number };
  vendors: { name: string };
  date: string;
  time: string;
  status: string;
};
