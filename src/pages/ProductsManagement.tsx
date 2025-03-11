
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Package, Plus, Search, AlertTriangle, 
  Edit, Trash2, ArrowUpDown
} from "lucide-react";

// Define the product type based on our database schema
type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  discount_percentage: number;
  low_stock_threshold: number;
  image_url?: string; // Will be populated from the related table
};

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [user, setUser] = useState<any>(null);
  
  // Check for filter parameter
  const filterParam = searchParams.get("filter");
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to manage products");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
      fetchProducts(session.user.id);
    };
    
    checkUser();
  }, [navigate, filterParam, sortBy, sortOrder]);
  
  const fetchProducts = async (userId: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select(`
          id, 
          name, 
          description, 
          price, 
          stock_quantity, 
          discount_percentage, 
          low_stock_threshold,
          product_images!inner(image_url)
        `)
        .eq('seller_id', userId)
        .order(sortBy, { ascending: sortOrder === "asc" });
      
      // Apply filter if needed
      if (filterParam === "low-stock") {
        query = query.lt('stock_quantity', supabase.raw('low_stock_threshold'));
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform data to include the primary image
      const productsWithImages = data.map(p => ({
        ...p,
        image_url: p.product_images[0]?.image_url
      }));
      
      setProducts(productsWithImages);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };
  
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {filterParam === "low-stock" ? "Low Stock Products" : "Product Management"}
        </h2>
        <Button onClick={() => navigate("/products/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>
      
      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => toggleSort('name')}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => toggleSort('price')}
        >
          Price <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => toggleSort('stock_quantity')}
        >
          Stock <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? "No products match your search" 
              : filterParam === "low-stock" 
                ? "No products are below their stock threshold" 
                : "You haven't added any products yet"
            }
          </p>
          <Button onClick={() => navigate("/products/new")}>
            Add your first product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
                
                {product.stock_quantity <= product.low_stock_threshold && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    Low Stock
                  </div>
                )}
                
                {product.discount_percentage > 0 && (
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.discount_percentage}% OFF
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description || "No description provided"}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-semibold">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="text-sm">
                        Stock: <span className={product.stock_quantity <= product.low_stock_threshold ? "text-amber-500 font-medium" : ""}>
                          {product.stock_quantity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
