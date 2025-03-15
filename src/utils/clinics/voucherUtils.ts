
import { ProductVoucherType } from "@/components/clinics/types";

export const getDefaultVouchers = (): ProductVoucherType[] => {
  return [
    {
      productName: "Anti-Aging Serum",
      description: "Advanced formula with retinol for reducing fine lines and wrinkles",
      discount: 15,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      productName: "Hydrating Facial Mask",
      description: "Deep moisture treatment with hyaluronic acid and ceramides",
      discount: 20,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=800&auto=format&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      productName: "Skin Brightening Cream",
      description: "Vitamin C enriched formula to even skin tone and boost radiance",
      discount: 10,
      imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614159102522-35260209ffa7?q=80&w=800&auto=format&fit=crop"
      ]
    }
  ];
};
