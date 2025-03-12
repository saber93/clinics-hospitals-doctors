
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  onDeleteProduct: (id: string) => Promise<void>;
}

const ProductsGrid = ({ products, onDeleteProduct }: ProductsGridProps) => {
  const handleEdit = (id: string) => {
    console.log(`Edit product ${id}`);
    // This is a placeholder - actual implementation would navigate to edit page
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product}
          index={index}
          onDelete={onDeleteProduct}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
