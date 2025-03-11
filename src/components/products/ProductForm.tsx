import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, ImagePlus, Trash } from "lucide-react";
import { useUser } from "@/hooks/useUser";

type ProductFormProps = {
  mode: "create" | "edit";
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category: string;
  seller_id: string;
  created_at: string;
};

const ProductForm = ({ mode }: ProductFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    is_available: true,
    category: "skincare",
  });

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct(id);
    }
  }, [isEditMode, id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);

      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;

      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image_url: product.image_url || "",
        is_available: product.is_available,
        category: product.category,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_available: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!formData.name.trim() || !formData.price.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        is_available: formData.is_available,
        category: formData.category,
        seller_id: user?.id
      };

      if (isEditMode) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
      }

      toast.success(`Product ${isEditMode ? 'updated' : 'created'} successfully`);
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setFormData(prev => ({ ...prev, image_url: "" }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h2 className="text-2xl font-bold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
                  className="pl-7"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <div className="flex items-center">
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
                {formData.image_url && (
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
              {formData.image_url ? (
                <img src={formData.image_url} alt="Product preview" className="mt-2 rounded-md max-h-40 object-contain" />
              ) : (
                <div className="mt-2 text-muted-foreground">
                  <ImagePlus className="inline-block h-4 w-4 mr-1" />
                  No image selected
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_available">Available</Label>
                <p className="text-xs text-muted-foreground">
                  Toggle product availability
                </p>
              </div>
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={handleSwitchChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => navigate("/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditMode ? "Update Product" : "Create Product"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProductForm;
