
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  title: string;
  imageUrl: string;
  count: number;
  slug: string;
}

const categories: CategoryProps[] = [
  {
    title: "Fiction",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 45,
    slug: "fiction"
  },
  {
    title: "Self-Help",
    imageUrl: "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 32,
    slug: "self-help"
  },
  {
    title: "Thriller",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 28,
    slug: "thriller"
  },
  {
    title: "Science Fiction",
    imageUrl: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    count: 24,
    slug: "sci-fi"
  }
];

const BookCategories: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-bookish-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink text-center mb-8">
          Explore Categories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 staggered-fade-in">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/2] lg:aspect-[3/4]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
              <img 
                src={category.imageUrl} 
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-xl md:text-2xl text-white font-serif font-medium">
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {category.count} books
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookCategories;
