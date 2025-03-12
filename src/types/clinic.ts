
export interface Clinic {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  subCategory: string;
  offerPercentage: number;
  imageUrl?: string;
  productsVoucher?: Array<{
    productName: string;
    description: string;
    discount: number;
    validUntil?: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  imageUrl: string; // Added image URL for each category
}

export interface SubCategory {
  id: string;
  name: string;
}
