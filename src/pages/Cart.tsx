
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-bookish-accent hover:text-bookish-accent/80"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue shopping
              </Link>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-8 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-3 text-bookish-accent" />
              Your Cart {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
            </h1>
            
            {items.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
                <h2 className="text-xl font-medium text-bookish-ink mb-3">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any books to your cart yet.
                </p>
                <Button asChild className="bg-bookish-accent hover:bg-bookish-accent/90 text-white rounded-full px-8">
                  <Link to="/books">Browse Books</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-medium">Cart Items</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearCart}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Clear Cart
                      </Button>
                    </div>
                    
                    <Separator className="mb-6" />
                    
                    <div className="divide-y">
                      {items.map(item => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="font-medium mb-4">Order Summary</h2>
                    
                    <Separator className="mb-6" />
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-medium text-lg mb-6">
                      <span>Total</span>
                      <span>${(totalPrice + (totalPrice * 0.1)).toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full bg-bookish-accent hover:bg-bookish-accent/90 text-white">
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-6 text-center text-xs text-muted-foreground">
                      Secure payment processing by Stripe
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
