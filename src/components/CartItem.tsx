
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/lib/bookData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-start space-x-4 py-6 animate-slide-up">
      <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Link to={`/books/${item.id}`}>
          <img 
            src={item.coverImage} 
            alt={item.title} 
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link 
            to={`/books/${item.id}`}
            className="text-bookish-ink font-medium hover:text-bookish-accent line-clamp-1"
          >
            {item.title}
          </Link>
          <p className="text-bookish-ink font-medium ml-4">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        
        <p className="text-muted-foreground text-sm">{item.author}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none border-r"
              onClick={decreaseQuantity}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none border-l"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-destructive h-8"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
