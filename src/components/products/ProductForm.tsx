
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, X, AlertTriangle } from "lucide-react";

type ProductFormProps = {
  mode: "create" | "edit";
};

const ProductForm = ({ mode }: ProductFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    discount_percentage: "0",
    low_stock_threshold: "10"
  });
  
  const isEditMode = mode === "edit";
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to manage products");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
      
      if (isEditMode && id) {
        fetchProduct(id);
      }
    };
    
    checkUser();
  }, [navigate, isEditMode, id]);
  
  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      
      // Fetch product data
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (productError) throw productError;
      
      // Fetch product images
      const { data: productImages, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });
      
      if (imagesError) throw imagesError;
      
      // Set form data from fetched product
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        stock_quantity: product.stock_quantity.toString(),
        discount_percentage: product.discount_percentage.toString(),
        low_stock_threshold: product.low_stock_threshold.toString()
      });
      
      // Set images
      setImages(productImages.map(img => ({ url: img.image_url })));
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageLoading(true);
      
      const file = e.target.files[0];
      
      // Get a preview of the file
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, { 
          url: reader.result as string,
          file
        }]);
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Basic validation
      if (!formData.name.trim() || !formData.price.trim() || !formData.stock_quantity.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      // Create or update product
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        discount_percentage: parseInt(formData.discount_percentage),
        low_stock_threshold: parseInt(formData.low_stock_threshold),
        seller_id: user.id
      };
      
      let productId = id;
      
      if (isEditMode) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert(productData)
          .select('id')
          .single();
        
        if (error) throw error;
        productId = data.id;
      }
      
      // Process images
      if (images.length > 0) {
        // First, handle the new images with files
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          
          // Skip if no file (already in storage)
          if (!image.file) continue;
          
          // Upload to storage
          const fileExt = image.file.name.split('.').pop();
          const fileName = `${productId}/${Date.now()}.${fileExt}`;
          const filePath = `product-images/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, image.file);
          
          if (uploadError) throw uploadError;
          
          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);
          
          // Store in product_images table
          const { error: insertError } = await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              image_url: publicUrlData.publicUrl,
              display_order: i,
              is_primary: i === 0 // First image is primary
            });
          
          if (insertError) throw insertError;
        }
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
  
  if (loading && isEditMode) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" required>Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" required>Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount_percentage">Discount (%)</Label>
                  <Input
                    id="discount_percentage"
                    name="discount_percentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={formData.discount_percentage}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Inventory Management Card */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stock_quantity" required>Stock Quantity</Label>
                <Input
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="low_stock_threshold">Low Stock Threshold</Label>
                  <span className="text-xs text-muted-foreground">
                    Alert when stock falls below
                  </span>
                </div>
                <Input
                  id="low_stock_threshold"
                  name="low_stock_threshold"
                  type="number"
                  min="1"
                  placeholder="10"
                  value={formData.low_stock_threshold}
                  onChange={handleChange}
                />
              </div>
              
              <Card className="border-dashed border-yellow-300 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                <CardContent className="p-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-700 dark:text-yellow-400">Stock Alert</p>
                    <p className="text-yellow-600 dark:text-yellow-500">
                      You'll receive notifications when stock falls below the threshold.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden aspect-square bg-muted">
                      <img 
                        src={image.url} 
                        alt={`Product ${index}`} 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Upload button */}
                  <Label
                    htmlFor="image-upload"
                    className="border-2 border-dashed border-muted-foreground/25 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors aspect-square"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                      disabled={imageLoading}
                    />
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload up to 5 images. First image will be the primary product image.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <CardFooter className="flex justify-end gap-4 px-0 mt-6">
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
      </form>
    </div>
  );
};

export default ProductForm;
