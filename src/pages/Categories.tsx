
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, LibraryBig } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Category data - expanded from BookCategories.tsx
const categories = [
  {
    title: "Fiction",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 45,
    slug: "fiction",
    description: "Immerse yourself in imaginative narratives spanning from contemporary fiction to classic literature."
  },
  {
    title: "Self-Help",
    imageUrl: "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 32,
    slug: "self-help",
    description: "Discover resources for personal growth, productivity, mindfulness, and building better habits."
  },
  {
    title: "Thriller",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 28,
    slug: "thriller",
    description: "Experience heart-pounding suspense with our collection of psychological, crime, and action thrillers."
  },
  {
    title: "Science Fiction",
    imageUrl: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 24,
    slug: "sci-fi",
    description: "Explore futuristic worlds, advanced technology, and the possibilities of our universe and beyond."
  },
  {
    title: "Mystery",
    imageUrl: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 19,
    slug: "mystery",
    description: "Engage in puzzling plots filled with clues, suspense, and unexpected twists and turns."
  },
  {
    title: "Biography",
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 22,
    slug: "biography",
    description: "Delve into fascinating life stories of historical figures, celebrities, and extraordinary individuals."
  },
  {
    title: "Fantasy",
    imageUrl: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 31,
    slug: "fantasy",
    description: "Journey through magical worlds full of wonder, mythical creatures, and epic adventures."
  },
  {
    title: "History",
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 26,
    slug: "history",
    description: "Learn about pivotal moments, influential periods, and the evolution of human civilization."
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink mb-4 flex items-center">
              <LibraryBig className="h-8 w-8 mr-3 text-bookish-accent" />
              Book Categories
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Explore our diverse collection organized by genre. Whether you're a fan of thrilling mysteries, enlightening non-fiction, or enchanting fantasies, find your perfect read below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 staggered-fade-in">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover-lift transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/2] relative overflow-hidden">
                  <img 
                    src={category.imageUrl} 
                    alt={category.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl text-white font-serif font-medium">
                        {category.title}
                      </h3>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {category.count} books
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                  <div className="mt-4 text-bookish-accent text-sm font-medium flex items-center group-hover:underline">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Browse Collection
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
