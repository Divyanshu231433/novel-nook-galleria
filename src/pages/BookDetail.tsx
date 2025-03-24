
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ChevronLeft, Star, BookOpen, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedBooks from '@/components/FeaturedBooks';
import { Book, books } from '@/lib/bookData';
import { useCart } from '@/contexts/CartContext';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const { addItem } = useCart();
  
  useEffect(() => {
    // Find the book with the matching ID
    const foundBook = books.find(b => b.id === id);
    if (foundBook) {
      setBook(foundBook);
      
      // Find books in the same category
      const sameCategory = books.filter(b => 
        b.id !== id && b.category === foundBook.category
      ).slice(0, 4);
      
      setRelatedBooks(sameCategory);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading book details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 py-8">
          <div className="mb-8">
            <Link 
              to="/books" 
              className="inline-flex items-center text-bookish-accent hover:text-bookish-accent/80"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to books
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Book Cover */}
            <div className="relative animate-fade-in">
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted shadow-xl">
                <img 
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-bookish-accent/10 to-transparent rounded-lg transform translate-x-4 translate-y-4"></div>
            </div>
            
            {/* Book Details */}
            <div className="animate-slide-in-right">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-bookish-accent/10 text-bookish-accent text-sm font-medium mb-4">
                {book.category}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink">
                {book.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mt-2">
                by <span className="italic">{book.author}</span>
              </p>
              
              <div className="flex items-center mt-4 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating) 
                        ? 'text-bookish-accent fill-bookish-accent' 
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{book.rating.toFixed(1)}</span>
              </div>
              
              <div className="mt-6 text-2xl font-medium">
                ${book.price.toFixed(2)}
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-bookish-accent" />
                  <span>{book.publicationDate}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-bookish-accent" />
                  <span>{book.pages} pages</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-bookish-accent" />
                  <span>~{Math.ceil(book.pages / 30)} hours</span>
                </div>
              </div>
              
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {book.description}
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => addItem(book)}
                  className="flex-1 md:flex-none md:w-auto bg-bookish-accent hover:bg-bookish-accent/90 text-white rounded-full px-8"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" className="flex-1 md:flex-none md:w-auto rounded-full px-8">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div className="mt-20">
              <FeaturedBooks
                title={`More from ${book.category}`}
                books={relatedBooks}
                viewAllLink={`/categories/${book.category.toLowerCase()}`}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
