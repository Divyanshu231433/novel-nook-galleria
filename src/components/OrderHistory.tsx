
import React, { useState } from 'react';
import { useOrders, Order, OrderStatus } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Clock, AlertTriangle, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OrderHistoryProps {
  showCancelOption?: boolean;
}

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 mr-2 text-yellow-500" />;
    case 'processing':
      return <Package className="h-4 w-4 mr-2 text-blue-500" />;
    case 'shipped':
      return <Truck className="h-4 w-4 mr-2 text-indigo-500" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4 mr-2 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 mr-2 text-red-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />;
  }
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ showCancelOption = true }) => {
  const { orders, cancelOrder } = useOrders();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const confirmCancelOrder = () => {
    if (selectedOrderId) {
      cancelOrder(selectedOrderId);
      setCancelDialogOpen(false);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-xl font-medium">No orders yet</h3>
        <p className="mt-2 text-muted-foreground">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Your Orders</h2>
      
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                <CardDescription>
                  Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                </CardDescription>
              </div>
              
              <div className="flex items-center">
                <Badge className={`${getStatusColor(order.status)} font-normal py-1 px-3`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                
                {showCancelOption && (order.status === 'pending' || order.status === 'processing') && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleCancelClick(order.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="items">
                <AccordionTrigger className="px-6 py-4">
                  <span className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} totaling ${order.totalAmount.toFixed(2)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                          <img 
                            src={item.coverImage} 
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {order.shippingAddress && (
                <AccordionItem value="shipping">
                  <AccordionTrigger className="px-6 py-4">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Shipping Information
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="text-sm">
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/10 flex justify-between py-3">
            <span className="text-sm text-muted-foreground">
              Last updated: {format(new Date(order.updatedAt), 'MMM d, yyyy h:mm a')}
            </span>
          </CardFooter>
        </Card>
      ))}
      
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              No, keep order
            </Button>
            <Button variant="destructive" onClick={confirmCancelOrder}>
              Yes, cancel order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderHistory;
