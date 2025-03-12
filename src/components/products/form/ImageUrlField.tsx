
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, ImageOff } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageUrlFieldProps {
  imageUrl: string;
  onChange: (name: string, value: string) => void;
}

const ImageUrlField = ({ imageUrl, onChange }: ImageUrlFieldProps) => {
  const [hasError, setHasError] = useState(false);
  const [productName, setProductName] = useState<string>('');
  
  // Try to get product name from the form
  useEffect(() => {
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    if (nameInput) {
      setProductName(nameInput.value);
    }
  }, []);
  
  // Updated cosmetics-related fallback images with more relevant product images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop", // Cosmetics set
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop", // Facial scrub 
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=800&auto=format&fit=crop", // Night cream
    "https://images.unsplash.com/photo-1562887250-9a52d844ad30?q=80&w=800&auto=format&fit=crop", // Serum bottles
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop"  // Makeup products
  ];

  // Get a random fallback image (or specific one for known problematic products)
  const getFallbackImage = (): string => {
    if (productName.includes("Gentle Exfoliating Scrub")) {
      return "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop"; // Facial scrub
    }
    
    if (productName.includes("Anti-Aging Night Cream")) {
      return "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=800&auto=format&fit=crop"; // Night cream
    }
    
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  // Reset error state when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      // Check for known problematic products
      if (productName.includes("Gentle Exfoliating Scrub") || 
          productName.includes("Anti-Aging Night Cream")) {
        console.log(`Known problematic product image: ${productName}`);
        setHasError(true);
        return;
      }
      
      setHasError(false);
    }
  }, [imageUrl, productName]);

  const handleDeleteImage = () => {
    onChange("image_url", "");
    setHasError(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load in form:", imageUrl);
    e.preventDefault();
    setHasError(true);
  };

  // Validate image URL before displaying
  const testImageUrl = () => {
    if (!imageUrl) return;
    
    // Skip validation for known problematic products
    if (productName.includes("Gentle Exfoliating Scrub") || 
        productName.includes("Anti-Aging Night Cream")) {
      console.log(`Skipping validation for known problematic product: ${productName}`);
      setHasError(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => setHasError(false);
    img.onerror = () => {
      console.log("Failed pre-validation of image:", imageUrl);
      setHasError(true);
    };
    img.src = imageUrl;
  };

  useEffect(() => {
    if (imageUrl) {
      testImageUrl();
    }
  }, [imageUrl]);

  return (
    <div className="space-y-2">
      <Label htmlFor="image_url">Image URL</Label>
      <div className="flex items-center">
        <Input
          id="image_url"
          name="image_url"
          type="url"
          value={imageUrl}
          onChange={(e) => {
            onChange("image_url", e.target.value);
            setHasError(false);
          }}
          placeholder="Enter image URL"
          className={hasError ? "border-red-300 pr-10" : ""}
        />
        {imageUrl && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDeleteImage}
            title="Remove image"
            className="ml-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      {imageUrl ? (
        <div className="mt-2 relative">
          <img 
            src={hasError ? getFallbackImage() : imageUrl} 
            alt="Product preview" 
            className="rounded-md max-h-40 object-contain" 
            onError={handleImageError}
            key={`preview-${hasError ? 'fallback' : imageUrl}-${Date.now()}`}
          />
          {hasError && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-70 text-white text-xs p-1 text-center">
              <ImageOff className="inline-block h-3 w-3 mr-1" />
              Image URL is invalid - using fallback
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 text-muted-foreground">
          <ImagePlus className="inline-block h-4 w-4 mr-1" />
          No image selected
        </div>
      )}
    </div>
  );
};

export default ImageUrlField;
