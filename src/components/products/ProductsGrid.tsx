
import ProductCard, { Product } from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  onDeleteProduct: (id: string) => Promise<void>;
}

const ProductsGrid = ({ products, onDeleteProduct }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onDelete={onDeleteProduct} 
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
