
export interface Clinic {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  subCategory: string;
  offerPercentage: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}
