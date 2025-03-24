
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpen, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books as allBooks } from '@/lib/bookData';

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Map category slugs to their proper display names
  const categoryDisplayNames: Record<string, string> = {
    'fiction': 'Fiction',
    'self-help': 'Self-Help',
    'thriller': 'Thriller',
    'sci-fi': 'Science Fiction',
    'mystery': 'Mystery',
    'biography': 'Biography',
    'fantasy': 'Fantasy',
    'history': 'History'
  };
  
  const displayName = categoryDisplayNames[slug || ''] || 'Unknown Category';
  
  const { data: filteredBooks } = useQuery({
    queryKey: ['books', 'category', slug],
    queryFn: () => {
      // Filter books by matching the category (case-insensitive)
      return allBooks.filter(book => 
        book.category.toLowerCase() === displayName.toLowerCase() ||
        // Special case for Science Fiction which has a slug of sci-fi
        (slug === 'sci-fi' && book.category === 'Sci-Fi')
      );
    },
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-2 text-muted-foreground"
            onClick={() => navigate('/categories')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
          
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink mb-4 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-bookish-accent" />
              {displayName}
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Explore our collection of {displayName.toLowerCase()} books, carefully curated for your reading pleasure.
            </p>
          </div>
          
          {filteredBooks && filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 staggered-fade-in">
              {filteredBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Grid3X3 className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-xl font-medium">No books found</h3>
              <p className="mt-2 text-muted-foreground">
                We couldn't find any books in this category. Please check back later.
              </p>
              <Button 
                className="mt-6"
                onClick={() => navigate('/books')}
              >
                Browse All Books
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
