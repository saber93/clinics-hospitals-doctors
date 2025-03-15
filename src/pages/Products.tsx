
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid';
import { Loader2, PlusCircle } from 'lucide-react';
import { createSellerDemoData } from '@/utils/seedServiceData';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { products, loading, refreshProducts } = useProducts();
  const [creatingDemoData, setCreatingDemoData] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleGenerateDemoProducts = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to create demo products");
      return;
    }

    setCreatingDemoData(true);
    try {
      await createSellerDemoData(user.id);
      toast.success("Demo products created successfully!");
      // Refresh the products list after creating demo data
      await refreshProducts();
    } catch (error) {
      console.error("Error creating demo products:", error);
      toast.error("Failed to create demo products");
    } finally {
      setCreatingDemoData(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    // This function is passed to ProductGrid but implemented in useProducts hook
  };

  const handleEditProduct = (id: string) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-600">View and manage your products</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button onClick={() => navigate('/add-product')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGenerateDemoProducts}
              disabled={creatingDemoData}
            >
              {creatingDemoData ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : "Generate Demo Products"}
            </Button>
          </div>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading} 
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      </div>
    </div>
  );
};

export default Products;
