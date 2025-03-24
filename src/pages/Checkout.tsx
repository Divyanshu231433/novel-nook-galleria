
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, CreditCard, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().min(13, "Valid card number is required").max(19),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().min(3, "CVV is required").max(4),
  saveInfo: z.boolean().optional(),
  shippingMethod: z.enum(["standard", "express", "overnight"]),
});

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      saveInfo: false,
      shippingMethod: "standard",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save order in localStorage
      const orders = JSON.parse(localStorage.getItem('bookOrders') || '[]');
      const newOrder = {
        id: crypto.randomUUID(),
        userId: user?.id,
        orderDate: new Date().toISOString(),
        items: items,
        shippingAddress: {
          fullName: values.fullName,
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
        shippingMethod: values.shippingMethod,
        totalItems,
        subtotal: totalPrice,
        tax: totalPrice * 0.1,
        shipping: values.shippingMethod === "standard" ? 0 : 
                  values.shippingMethod === "express" ? 10 : 25,
        total: totalPrice + (totalPrice * 0.1) + 
               (values.shippingMethod === "standard" ? 0 : 
                values.shippingMethod === "express" ? 10 : 25),
        paymentMethod: "Credit Card",
        status: "Confirmed"
      };
      
      orders.push(newOrder);
      localStorage.setItem('bookOrders', JSON.stringify(orders));
      
      // Clear the cart
      clearCart();
      
      // Navigate to thank you page
      navigate('/thank-you', { state: { order: newOrder } });
    } catch (error) {
      console.error('Checkout error:', error);
      setIsSubmitting(false);
    }
  };

  const shippingOptions = [
    { id: "standard", label: "Standard Shipping", description: "Free • 5-7 business days", price: 0 },
    { id: "express", label: "Express Shipping", description: "$10.00 • 2-3 business days", price: 10 },
    { id: "overnight", label: "Overnight Shipping", description: "$25.00 • Next business day", price: 25 }
  ];
  
  const getShippingCost = () => {
    const method = form.watch("shippingMethod");
    return method === "standard" ? 0 : method === "express" ? 10 : 25;
  };
  
  const totalWithShipping = totalPrice + (totalPrice * 0.1) + getShippingCost();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link 
                to="/cart" 
                className="inline-flex items-center text-bookish-accent hover:text-bookish-accent/80"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to cart
              </Link>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-8 flex items-center">
              <Package className="h-6 w-6 mr-3 text-bookish-accent" />
              Checkout
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Shipping Information */}
                      <div>
                        <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Shipping Method */}
                      <div>
                        <h2 className="text-xl font-medium mb-4">Shipping Method</h2>
                        <FormField
                          control={form.control}
                          name="shippingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="space-y-3"
                                >
                                  {shippingOptions.map(option => (
                                    <div
                                      key={option.id}
                                      className={`flex items-start space-x-3 rounded-md border p-3 ${
                                        field.value === option.id ? 'border-bookish-accent bg-bookish-muted/10' : 'border-input'
                                      }`}
                                    >
                                      <RadioGroupItem value={option.id} id={option.id} />
                                      <div className="space-y-1">
                                        <label
                                          htmlFor={option.id}
                                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                          {option.label}
                                        </label>
                                        <p className="text-sm text-muted-foreground">
                                          {option.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      {/* Payment Information */}
                      <div>
                        <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-10" placeholder="4242 4242 4242 4242" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="saveInfo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Save my information for faster checkout
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button 
                          type="submit"
                          className="w-full bg-bookish-accent hover:bg-bookish-accent/90 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Complete Order"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="font-medium text-xl mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
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
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${getShippingCost().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${totalWithShipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-6 text-center text-xs text-muted-foreground">
                    <p>Secure payment processing</p>
                    <p className="mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
