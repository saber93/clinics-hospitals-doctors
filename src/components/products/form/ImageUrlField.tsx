
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUrlFieldProps {
  imageUrl: string;
  onChange: (name: string, value: string) => void;
}

const ImageUrlField = ({ imageUrl, onChange }: ImageUrlFieldProps) => {
  const handleDeleteImage = () => {
    onChange("image_url", "");
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
          onChange={(e) => onChange("image_url", e.target.value)}
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
        <img src={imageUrl} alt="Product preview" className="mt-2 rounded-md max-h-40 object-contain" />
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
