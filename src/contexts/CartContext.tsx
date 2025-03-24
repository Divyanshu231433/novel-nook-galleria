
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartContextType, CartItem } from '@/lib/bookData';
import { toast } from '@/components/ui/use-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('bookCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('bookCart', JSON.stringify(items));
    } else {
      localStorage.removeItem('bookCart');
    }
    
    // Calculate totals
    setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
    setTotalPrice(items.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [items]);

  const addItem = (book: Book) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        toast({
          title: "Added to cart",
          description: `${book.title} quantity updated to ${existingItem.quantity + 1}`,
        });
        
        return prevItems.map(item => 
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart`,
      });
      
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const book = prevItems.find(item => item.id === id);
      if (book) {
        toast({
          title: "Removed from cart",
          description: `${book.title} has been removed from your cart`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
