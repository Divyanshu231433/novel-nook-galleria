
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Package, Calendar, ArrowUpRight, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional(),
});

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  
  // Get orders from localStorage
  const [orders, setOrders] = useState(() => {
    const allOrders = JSON.parse(localStorage.getItem('bookOrders') || '[]');
    return allOrders.filter((order: any) => order.userId === user?.id)
      .sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  });
  
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    updateProfile(values);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancelOrder = (orderId: string) => {
    // Get all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('bookOrders') || '[]');
    
    // Update the status of the specific order to cancelled
    const updatedAllOrders = allOrders.map((order: any) => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    
    // Save back to localStorage
    localStorage.setItem('bookOrders', JSON.stringify(updatedAllOrders));
    
    // Update the state
    const updatedOrders = orders.map((order: any) => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    setOrders(updatedOrders);
    
    // Close the dialog
    setOrderToCancel(null);
    
    // Show success message
    toast({
      title: "Order cancelled",
      description: "Your order has been cancelled successfully",
    });
  };

  const canCancelOrder = (status: string) => {
    // Only allow cancellation if order is in pending or processing state
    return ['pending', 'processing'].includes(status);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-8 flex items-center">
              <User className="h-6 w-6 mr-3 text-bookish-accent" />
              My Account
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-medium mb-6">Profile Information</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
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
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                            <p className="text-sm text-muted-foreground">
                              Your email cannot be changed
                            </p>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-bookish-accent hover:bg-bookish-accent/90 text-white"
                      >
                        Update Profile
                      </Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-medium mb-6 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-bookish-accent" />
                    Your Orders
                  </h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6">
                        When you place orders, they will appear here
                      </p>
                      <Button asChild className="bg-bookish-accent hover:bg-bookish-accent/90 text-white">
                        <Link to="/books">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {orders.map((order: any) => (
                        <div key={order.id} className="py-4">
                          <div className="flex flex-wrap justify-between gap-4 mb-4">
                            <div>
                              <p className="font-medium">
                                Order #{order.id.substring(0, 8).toUpperCase()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Placed on {formatDate(order.orderDate)}
                              </p>
                            </div>
                            <div>
                              <span className={`bg-bookish-muted/30 text-bookish-accent px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'cancelled' ? 'bg-red-100 text-red-600' : 
                                order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                ''
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h3 className="text-sm font-medium mb-1">Items</h3>
                              <p className="text-sm text-muted-foreground">
                                {order.totalItems} {order.totalItems === 1 ? 'item' : 'items'}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium mb-1">Total</h3>
                              <p className="text-sm text-muted-foreground">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            {order.items.slice(0, 3).map((item: any) => (
                              <div key={item.id} className="h-16 w-12 bg-bookish-muted rounded-md overflow-hidden">
                                <img 
                                  src={item.coverImage} 
                                  alt={item.title}
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="h-16 w-12 bg-bookish-muted rounded-md flex items-center justify-center text-sm font-medium">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-3">
                            <Link 
                              to="/thank-you" 
                              state={{ order }}
                              className="text-sm text-bookish-accent hover:text-bookish-accent/80 font-medium inline-flex items-center"
                            >
                              View details
                              <ArrowUpRight className="h-4 w-4 ml-1" />
                            </Link>
                            
                            {canCancelOrder(order.status) && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel Order
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center text-red-500">
                                      <AlertTriangle className="h-5 w-5 mr-2" />
                                      Cancel Order
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this order?
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>No, keep order</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleCancelOrder(order.id)}
                                      className="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                      Yes, cancel order
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
