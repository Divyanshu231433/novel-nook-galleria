
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books as allBooks, categories } from '@/lib/bookData';
import { useToast } from "@/components/ui/use-toast";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const { data: books } = useQuery({
    queryKey: ['books', searchTerm, selectedCategory, sortOrder],
    queryFn: () => {
      // Step 1: Filter by search term
      let filteredBooks = [...allBooks];
      if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Step 2: Filter by category
      if (selectedCategory !== 'All') {
        filteredBooks = filteredBooks.filter(book => 
          book.category === selectedCategory
        );
      }
      
      // Step 3: Sort the results
      switch (sortOrder) {
        case 'newest':
          // Sort by publication date (newest first)
          return filteredBooks.sort((a, b) => 
            new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
          );
        case 'price-low':
          // Sort by price (low to high)
          return filteredBooks.sort((a, b) => a.price - b.price);
        case 'price-high':
          // Sort by price (high to low)
          return filteredBooks.sort((a, b) => b.price - a.price);
        case 'popular':
          // Sort by rating (highest first)
          return filteredBooks.sort((a, b) => b.rating - a.rating);
        default:
          return filteredBooks;
      }
    },
    initialData: allBooks,
  });

  useEffect(() => {
    if (searchTerm.length > 0 || selectedCategory !== 'All') {
      const count = books.length;
      toast({
        title: `${count} ${count === 1 ? 'book' : 'books'} found`,
        description: `For your search "${searchTerm}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`,
      });
    }
  }, [books, searchTerm, selectedCategory, toast]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOrder('newest');
    setShowFilters(false);
  };

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
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 flex gap-3">
              <Button 
                variant={showFilters ? "default" : "outline"} 
                className="flex-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {showFilters && '(Active)'}
              </Button>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-8 p-4 border rounded-lg bg-muted/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Filter Books</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="mb-2"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 staggered-fade-in">
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>
          
          {books.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No books found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
              <Button 
                onClick={clearFilters} 
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
