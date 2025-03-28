
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <BookOpen className="h-6 w-6 text-bookish-accent transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-serif text-xl font-medium tracking-tight">
              Novel<span className="text-bookish-accent">Nook</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-sm font-medium">Home</Link>
            <Link to="/books" className="nav-link text-sm font-medium">Books</Link>
            <Link to="/categories" className="nav-link text-sm font-medium">Categories</Link>
            <Link to="/about" className="nav-link text-sm font-medium">About</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="h-10 w-10 rounded-full flex items-center justify-center text-bookish-ink/80 hover:text-bookish-accent hover:bg-bookish-muted/50 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="h-10 w-10 rounded-full flex items-center justify-center text-bookish-ink/80 hover:text-bookish-accent hover:bg-bookish-muted/50 transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 bg-bookish-accent text-white text-xs h-5 w-5 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bookish-muted">
                      <User className="h-4 w-4 text-bookish-accent" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="cursor-pointer">Cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-lg font-medium hover:text-bookish-accent transition-colors">Home</Link>
                  <Link to="/books" className="text-lg font-medium hover:text-bookish-accent transition-colors">Books</Link>
                  <Link to="/categories" className="text-lg font-medium hover:text-bookish-accent transition-colors">Categories</Link>
                  <Link to="/about" className="text-lg font-medium hover:text-bookish-accent transition-colors">About</Link>
                  
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="text-lg font-medium hover:text-bookish-accent transition-colors">Profile</Link>
                      <button 
                        onClick={handleLogout} 
                        className="text-lg font-medium text-left hover:text-bookish-accent transition-colors"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-lg font-medium hover:text-bookish-accent transition-colors">Sign In</Link>
                      <Link to="/signup" className="text-lg font-medium hover:text-bookish-accent transition-colors">Sign Up</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative">
            <Input 
              type="search"
              placeholder="Search for books, authors..." 
              className="w-full pr-10 focus-visible:ring-bookish-accent"
            />
            <X 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-bookish-accent"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
