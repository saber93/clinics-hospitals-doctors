
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import ProductFormHeader from "./form/ProductFormHeader";
import ProductDetailsCard from "./form/ProductDetailsCard";
import LoadingSpinner from "@/components/ui/loading-spinner";

type ProductFormProps = {
  mode: "create" | "edit";
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
    stock_quantity: "0",
    low_stock_threshold: "10",
    is_available: true,
    category: ""
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
        description: product.description || "",
        price: product.price.toString(),
        image_url: product.image_url || "",
        stock_quantity: product.stock_quantity.toString(),
        low_stock_threshold: product.low_stock_threshold?.toString() || "10",
        is_available: product.is_available || true,
        category: product.category || ""
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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

      if (!formData.name.trim() || !formData.price || !formData.stock_quantity) {
        toast.error("Please fill in all required fields");
        return;
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        low_stock_threshold: parseInt(formData.low_stock_threshold),
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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <ProductFormHeader isEditMode={isEditMode} />
      
      {loading && isEditMode ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <ProductDetailsCard
            formData={formData}
            handleChange={handleChange}
            handleSwitchChange={handleSwitchChange}
            isEditMode={isEditMode}
            loading={loading}
          />
        </form>
      )}
    </div>
  );
};

export default ProductForm;
