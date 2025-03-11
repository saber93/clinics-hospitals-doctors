import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormActions from "./FormActions";
import StockField from "./StockField";
import ImageUrlField from "./ImageUrlField";
import AvailabilitySwitch from "./AvailabilitySwitch";
import { ProductFormData } from "@/hooks/useProductForm";

interface ProductDetailsCardProps {
  formData: ProductFormData;
  handleChange: (name: string, value: string) => void;
  handleSwitchChange: (checked: boolean) => void;
  isEditMode: boolean;
  loading: boolean;
}

const ProductDetailsCard = ({
  formData,
  handleChange,
  handleSwitchChange,
  isEditMode,
  loading
}: ProductDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter product description"
            className="min-h-32"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="pl-7"
              required
            />
          </div>
        </div>

        <StockField
          stockQuantity={formData.stock_quantity}
          lowStockThreshold={formData.low_stock_threshold}
          onChange={handleChange}
        />

        <ImageUrlField
          imageUrl={formData.image_url}
          onChange={handleChange}
        />

        <AvailabilitySwitch
          isAvailable={formData.is_available}
          onToggle={handleSwitchChange}
        />

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Enter category"
          />
        </div>
      </CardContent>
      <CardFooter>
        <FormActions 
          loading={loading} 
          isEditMode={isEditMode} 
        />
      </CardFooter>
    </Card>
  );
};

export default ProductDetailsCard;
