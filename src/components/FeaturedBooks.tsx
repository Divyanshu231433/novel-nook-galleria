
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/bookData';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import BookCard from './BookCard';

interface FeaturedBooksProps {
  title: string;
  books: Book[];
  viewAllLink?: string;
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ 
  title, 
  books,
  viewAllLink
}) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink">
            {title}
          </h2>
          
          {viewAllLink && (
            <Link 
              to={viewAllLink}
              className="text-bookish-accent hover:text-bookish-accent/80 font-medium text-sm flex items-center gap-1 group"
            >
              View all
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 staggered-fade-in">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
