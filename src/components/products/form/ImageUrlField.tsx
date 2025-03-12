
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { useState } from "react";

interface ImageUrlFieldProps {
  imageUrl: string;
  onChange: (name: string, value: string) => void;
}

const ImageUrlField = ({ imageUrl, onChange }: ImageUrlFieldProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Product-related fallback image
  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop";

  const handleDeleteImage = () => {
    onChange("image_url", "");
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
  };

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
            src={hasError ? fallbackImage : imageUrl} 
            alt="Product preview" 
            className="rounded-md max-h-40 object-contain" 
            onError={handleImageError}
          />
          {hasError && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-70 text-white text-xs p-1 text-center">
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
