
import { Product } from "@/types";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import LoadingProductsGrid from "./LoadingProductsGrid";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
}

const ProductGrid = ({ products, loading, onDelete, onEdit }: ProductGridProps) => {
  if (loading) {
    return <LoadingProductsGrid />;
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      await onDelete(id);
      toast.success(`${name} has been deleted`);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index} 
          onDelete={handleDelete} 
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
