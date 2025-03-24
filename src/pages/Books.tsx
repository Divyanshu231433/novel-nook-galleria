
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books as allBooks } from '@/lib/bookData';

const Books = () => {
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: () => Promise.resolve(allBooks),
    initialData: allBooks,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink mb-4 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-bookish-accent" />
              Browse Our Collection
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Discover our curated selection of books spanning various genres. From timeless classics to contemporary bestsellers, find your next literary adventure.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by title, author, or genre..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 flex gap-3">
              <Button variant="outline" className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <select className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 staggered-fade-in">
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
