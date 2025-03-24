
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  
  // If no order data, redirect to home
  React.useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null; // Will redirect in the useEffect
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getEstimatedDelivery = () => {
    const orderDate = new Date(order.orderDate);
    let days = 0;
    
    switch (order.shippingMethod) {
      case 'overnight':
        days = 1;
        break;
      case 'express':
        days = 3;
        break;
      default: // standard
        days = 7;
        break;
    }
    
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return formatDate(deliveryDate.toISOString());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink mb-4">
                Thank You for Your Order!
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Your order has been received and is now being processed.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium text-lg flex items-center">
                  <Package className="h-5 w-5 mr-2 text-bookish-accent" />
                  Order Details
                </h2>
                <span className="bg-bookish-muted/30 text-bookish-accent px-3 py-1 rounded-full text-sm font-medium">
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Number</h3>
                  <p className="font-medium">{order.id.substring(0, 8).toUpperCase()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Order Date</h3>
                  <p className="font-medium">{formatDate(order.orderDate)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Est. Delivery Date</h3>
                  <p className="font-medium">{getEstimatedDelivery()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Shipping Method</h3>
                  <p className="font-medium capitalize">
                    {order.shippingMethod.replace('-', ' ')} Shipping
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Shipping Address</h3>
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="space-y-4 mb-6">
                <h3 className="font-medium mb-4">Order Items</h3>
                
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-12 bg-bookish-muted rounded-md flex-shrink-0 overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={item.title}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-6" />
              
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pt-2 font-medium text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild className="bg-bookish-accent hover:bg-bookish-accent/90 text-white">
                <Link to="/books">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/profile">
                  View Your Orders
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
