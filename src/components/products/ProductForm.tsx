
import { useParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useProductForm } from "@/hooks/useProductForm";
import ProductFormHeader from "./form/ProductFormHeader";
import ProductDetailsCard from "./form/ProductDetailsCard";
import LoadingSpinner from "@/components/ui/loading-spinner";

type ProductFormProps = {
  mode: "create" | "edit";
};

const ProductForm = ({ mode }: ProductFormProps) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  
  const {
    formData,
    loading,
    isEditMode,
    handleChange,
    handleSwitchChange,
    handleSubmit
  } = useProductForm(mode, id, user);

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
