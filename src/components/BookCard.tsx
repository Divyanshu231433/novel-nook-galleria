
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/bookData';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to book detail
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `"${book.title}" has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      duration: 2000,
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to book detail
    addItem(book);
    
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
      duration: 2000,
    });
  };
  
  return (
    <div 
      className="group rounded-lg overflow-hidden hover-lift book-card-enter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        <img
          src={book.coverImage}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 right-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-bookish-ink hover:text-bookish-accent'}`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            className="w-full bg-bookish-accent hover:bg-bookish-accent/90 text-white flex items-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/books/${book.id}`} className="inline-block">
              <h3 className="book-title text-lg font-medium line-clamp-1 group-hover:text-bookish-accent transition-colors">{book.title}</h3>
            </Link>
            <p className="text-muted-foreground text-sm mt-1">{book.author}</p>
          </div>
          <div className="flex items-center space-x-1 bg-bookish-accent/10 px-2 py-1 rounded text-bookish-accent">
            <Star className="h-3.5 w-3.5 fill-bookish-accent" />
            <span className="text-xs font-medium">{book.rating}</span>
          </div>
        </div>
        <div className="mt-3 font-medium">${book.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default BookCard;
