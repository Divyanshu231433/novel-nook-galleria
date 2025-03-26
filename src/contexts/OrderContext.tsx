
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

export interface OrderItem {
  id: string;
  bookId: string;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface OrderContextType {
  orders: Order[];
  allOrders: Order[]; // All orders for admin
  createOrder: (items: OrderItem[], shippingAddress: any) => Promise<Order>;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Load orders from localStorage on initial load
  useEffect(() => {
    const savedOrders = localStorage.getItem('bookOrders');
    if (savedOrders) {
      try {
        const parsedOrders: Order[] = JSON.parse(savedOrders);
        setAllOrders(parsedOrders);
        
        // Filter orders for current user
        if (user) {
          const userOrders = parsedOrders.filter(order => order.userId === user.id);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Failed to parse orders from localStorage', error);
      }
    }
  }, [user]);

  // Create a new order
  const createOrder = async (items: OrderItem[], shippingAddress: any): Promise<Order> => {
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shippingAddress
    };
    
    const updatedOrders = [...allOrders, newOrder];
    
    // Save to localStorage
    localStorage.setItem('bookOrders', JSON.stringify(updatedOrders));
    
    // Update state
    setAllOrders(updatedOrders);
    setOrders(prev => [...prev, newOrder]);
    
    return newOrder;
  };

  // Cancel an order
  const cancelOrder = (orderId: string) => {
    // Find the order
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      toast({
        title: "Error",
        description: "Order not found",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the order can be cancelled (only pending or processing orders)
    const order = allOrders[orderIndex];
    if (order.status !== 'pending' && order.status !== 'processing') {
      toast({
        title: "Cannot cancel order",
        description: `Orders in ${order.status} status cannot be cancelled`,
        variant: "destructive"
      });
      return;
    }
    
    // Update the order status
    const updatedOrder = {
      ...order,
      status: 'cancelled' as OrderStatus,
      updatedAt: new Date().toISOString()
    };
    
    // Create a new array with the updated order
    const updatedAllOrders = [...allOrders];
    updatedAllOrders[orderIndex] = updatedOrder;
    
    // Save to localStorage
    localStorage.setItem('bookOrders', JSON.stringify(updatedAllOrders));
    
    // Update state
    setAllOrders(updatedAllOrders);
    
    if (user && order.userId === user.id) {
      setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
    }
    
    toast({
      title: "Order cancelled",
      description: `Order #${orderId.slice(0, 8)} has been cancelled`,
    });
  };

  // Update order status (admin only)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    // Find the order
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      toast({
        title: "Error",
        description: "Order not found",
        variant: "destructive"
      });
      return;
    }
    
    // Update the order status
    const order = allOrders[orderIndex];
    const updatedOrder = {
      ...order,
      status,
      updatedAt: new Date().toISOString()
    };
    
    // Create a new array with the updated order
    const updatedAllOrders = [...allOrders];
    updatedAllOrders[orderIndex] = updatedOrder;
    
    // Save to localStorage
    localStorage.setItem('bookOrders', JSON.stringify(updatedAllOrders));
    
    // Update state
    setAllOrders(updatedAllOrders);
    
    if (user && order.userId === user.id) {
      setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
    }
    
    toast({
      title: "Order updated",
      description: `Order #${orderId.slice(0, 8)} status changed to ${status}`,
    });
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      allOrders,
      createOrder, 
      cancelOrder,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
