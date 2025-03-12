
import { ImageOff } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductImageWithFallbackProps {
  imageUrl: string | undefined;
  productName: string;
  productId: string;
  index: number;
  className?: string;
}

const ProductImageWithFallback = ({ 
  imageUrl, 
  productName, 
  productId, 
  index,
  className = ""
}: ProductImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Cosmetics-specific fallback images with valid URLs
  const fallbackImages = [
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614159102522-35260209ffa7?q=80&w=800&auto=format&fit=crop"
  ];

  // Check for known problematic products on mount
  useEffect(() => {
    if (productName.includes("Gentle Exfoliating Scrub") || 
        productName.includes("Anti-Aging Night Cream")) {
      console.log(`Pre-validation skipped for problematic product: ${productName}`);
      setHasError(true);
    }
  }, [productName]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.preventDefault();
    console.log(`Image error for product ${productId} with url:`, imageUrl);
    setHasError(true);
  };

  // Get image URL with fallback logic
  const getImageUrl = (): string => {
    // Special case for products we know have issues - updated with valid URLs
    if (productName.includes("Gentle Exfoliating Scrub")) {
      return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop";
    }
    
    if (productName.includes("Anti-Aging Night Cream")) {
      return "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop";
    }
    
    if (!imageUrl || hasError) {
      return fallbackImages[index % fallbackImages.length];
    }
    
    return imageUrl;
  };

  return (
    <div className="aspect-video relative overflow-hidden bg-gray-100 rounded-t-lg">
      <img
        src={getImageUrl()}
        alt={productName}
        className={`object-cover w-full h-full transition-transform duration-300 hover:scale-105 ${className}`}
        onError={handleImageError}
        key={`img-${productId}-${hasError ? 'fallback' : 'original'}-${Date.now()}`}
      />
      {hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-amber-500 bg-opacity-70 text-white text-xs p-1 text-center flex items-center justify-center">
          <ImageOff className="h-3 w-3 mr-1" />
          Using placeholder image
        </div>
      )}
    </div>
  );
};

export default ProductImageWithFallback;
