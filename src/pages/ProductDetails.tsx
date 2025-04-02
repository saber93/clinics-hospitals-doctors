
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, AlertTriangle, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import ProductImageCarousel from '@/components/products/ProductImageCarousel';
import ProductReviews from '@/components/products/ProductReviews';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, id]);

  const handlePrevImage = () => {
    if (!product) return;
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentImageIndex(prev => 
        prev === 0 ? (product.additional_images?.length || 0) : prev - 1
      );
      setSlideDirection(null);
    }, 300);
  };

  const handleNextImage = () => {
    if (!product) return;
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentImageIndex(prev => 
        prev === (product.additional_images?.length || 0) ? 0 : prev + 1
      );
      setSlideDirection(null);
    }, 300);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name} added to your cart.`,
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && 
        (!product || newQuantity <= product.stock_quantity)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <LoadingSpinner className="mt-20" />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Prepare images array for carousel
  const images = [
    product.image_url || "",
    ...(product.additional_images || [])
  ].filter(img => img); // Filter out empty strings

  // Calculate final price after discount
  const finalPrice = product.discount_percentage 
    ? product.price * (1 - (product.discount_percentage / 100))
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="text-primary hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Product images */}
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-md">
              {images.length > 0 ? (
                <ProductImageCarousel
                  images={images}
                  productName={product.name}
                  currentIndex={currentImageIndex}
                  slideDirection={slideDirection}
                  onPrevious={handlePrevImage}
                  onNext={handleNextImage}
                />
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  No image available
                </div>
              )}
            </Card>
          </div>

          {/* Right column - Product details */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
              )}
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(12 reviews)</span>
              </div>
            </div>

            {/* Price information */}
            <div className="flex items-center">
              {product.discount_percentage ? (
                <>
                  <span className="text-3xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
                  <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <Badge className="ml-2 bg-primary/10 text-primary border-primary">
                    {product.discount_percentage}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Availability */}
            <div>
              {product.is_available && product.stock_quantity > 0 ? (
                <div className="text-green-600 flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-600 inline-block mr-2"></span>
                  In Stock ({product.stock_quantity} available)
                </div>
              ) : (
                <div className="text-red-500 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Out of Stock
                </div>
              )}

              {product.stock_quantity <= (product.low_stock_threshold || 10) && product.stock_quantity > 0 && (
                <div className="text-amber-500 text-sm mt-1">Low stock - order soon</div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700">{product.description || "No description available."}</p>
            </div>
            
            {/* Quantity selector */}
            <div>
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={product.stock_quantity <= quantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.is_available || product.stock_quantity === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              
              <Button variant="ghost" size="icon" className="ml-auto sm:ml-0">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10" />
        
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetails;
