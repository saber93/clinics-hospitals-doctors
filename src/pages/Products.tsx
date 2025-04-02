import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Bandage } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductSidebar from '@/components/products/ProductSidebar';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductImageWithFallback from '@/components/products/ProductImageWithFallback';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const { products, loading } = useProducts();
  
  const maxProductPrice = Math.max(...products.map(p => p.price), 200);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxProductPrice]);
  
  useEffect(() => {
    setPriceRange([0, maxProductPrice]);
  }, [maxProductPrice]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setSortOrder('featured');
    setPriceRange([0, maxProductPrice]);
    setOnlyAvailable(false);
    setOnlyDiscounted(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesAvailability = onlyAvailable ? product.is_available && product.stock_quantity > 0 : true;
    
    const matchesDiscount = onlyDiscounted ? !!product.discount_percentage && product.discount_percentage > 0 : true;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability && matchesDiscount;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low') return a.price - b.price;
    if (sortOrder === 'price-high') return b.price - a.price;
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="w-full h-64 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center justify-center mb-8">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Zames Products</h1>
          <p className="mt-2 text-lg text-white/80">Quality healthcare products for your needs</p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
            <div className="w-full sm:w-64">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 lg:w-1/5">
              <ProductSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onlyAvailable={onlyAvailable}
                setOnlyAvailable={setOnlyAvailable}
                onlyDiscounted={onlyDiscounted}
                setOnlyDiscounted={setOnlyDiscounted}
                categories={categories}
                maxPrice={maxProductPrice}
                clearFilters={clearFilters}
              />
            </div>

            <div className="md:w-3/4 lg:w-4/5">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Bandage className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                      <div className="relative h-48 overflow-hidden">
                        <ProductImageWithFallback
                          imageUrl={product.image_url || ""}
                          productName={product.name}
                          productId={product.id}
                          index={index}
                          className="h-full w-full object-cover"
                        />
                        {product.discount_percentage && (
                          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {product.discount_percentage}% OFF
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description || "No description available"}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
