
export type ProductVoucherType = {
  productName: string;
  description: string;
  discount: number;
  validUntil?: string;
  imageUrl?: string;
  additionalImages?: string[];
};
