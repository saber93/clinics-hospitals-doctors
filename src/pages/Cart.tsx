
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, ArrowLeft, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = 'Shopping Cart | Zames';
    return () => {
      document.title = 'Zames';
    };
  }, []);

  const handleCheckout = () => {
    toast({
      title: "Checkout Process",
      description: "Checkout functionality will be implemented soon!",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Button 
              className="mt-6" 
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="outline" size="sm" onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="text-gray-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart."
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear cart
                </Button>
              </div>
              
              {/* Cart Item List */}
              <div className="space-y-4 mt-4">
                {cartItems.map((item) => {
                  const product = item.product;
                  const itemPrice = product.discount_percentage 
                    ? product.price * (1 - product.discount_percentage / 100) 
                    : product.price;
                    
                  return (
                    <div key={product.id} className="flex gap-4 py-4 border-b last:border-b-0">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <Link to={`/product/${product.id}`} className="font-medium hover:text-primary">
                            {product.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {product.category && (
                          <div className="text-sm text-gray-500">{product.category}</div>
                        )}
                        
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="font-medium">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  Need help? <a href="#" className="text-primary hover:underline">Contact support</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
