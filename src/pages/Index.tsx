
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedBooks from '@/components/FeaturedBooks';
import BookCategories from '@/components/BookCategories';
import { books } from '@/lib/bookData';

const featuredBooks = books.filter(book => book.featured);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-bookish-cream to-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center animate-fade-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-bookish-accent/10 text-bookish-accent text-sm font-medium mb-6 max-w-max">
                <BookOpen className="h-4 w-4 mr-1" />
                Special collection
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-bookish-ink">
                Discover Books That Speak to Your Soul
              </h1>
              
              <p className="mt-6 md:text-lg text-muted-foreground max-w-xl">
                Curated collection of thoughtfully selected books that inspire, entertain, and transform. Begin your literary journey today.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-bookish-accent hover:bg-bookish-accent/90 text-white rounded-full px-6">
                  <Link to="/books">
                    Explore Books
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="rounded-full group">
                  <Link to="/categories">
                    Browse Categories
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                {books.slice(0, 6).map((book, index) => (
                  <div 
                    key={book.id}
                    className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover-lift"
                    style={{ 
                      zIndex: 6 - index,
                      transformOrigin: 'center',
                      transform: `rotate(${index % 2 === 0 ? '2' : '-2'}deg) translateY(${index * 5}px)`
                    }}
                  >
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-bookish-accent/10 to-bookish-cream rounded-lg transform translate-x-6 translate-y-6"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <FeaturedBooks 
        title="Featured Books" 
        books={featuredBooks} 
        viewAllLink="/books"
      />
      
      {/* Book Categories Section */}
      <BookCategories />
      
      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-bookish-accent font-medium mb-4">Our Community</p>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-12">
              What Our Readers Say
            </h2>
            
            <blockquote className="relative text-xl md:text-2xl italic font-serif text-bookish-ink/80 animate-fade-in">
              <span className="font-serif text-6xl text-bookish-accent absolute -top-8 -left-8 opacity-20">"</span>
              NovelNook has transformed my reading experience. Their curated collection introduced me to authors I'd never discovered otherwise. Each book feels thoughtfully selected.
              <span className="font-serif text-6xl text-bookish-accent absolute -bottom-8 -right-4 opacity-20">"</span>
            </blockquote>
            
            <div className="mt-8 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Sarah Johnson"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-muted-foreground text-sm">Avid Reader</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-bookish-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our newsletter to receive updates on new releases, reading lists, and exclusive offers.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              />
              <Button className="bg-bookish-accent hover:bg-bookish-accent/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
