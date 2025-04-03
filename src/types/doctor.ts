
export interface Doctor {
  id: string;
  name: string;
  description: string;
  location: string;
  specialty: string;
  subSpecialty: string;
  offerPercentage: number;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  specialties?: string[];
  featured?: boolean;
  hasReservation?: boolean;
  favorite?: boolean;
  education?: string;
  experience?: number;
  languages?: string[];
  consultationFee?: number;
  theme?: any;
}

export interface Specialty {
  id: string;
  name: string;
  subSpecialties: SubSpecialty[];
  imageUrl: string;
}

export interface SubSpecialty {
  id: string;
  name: string;
}
