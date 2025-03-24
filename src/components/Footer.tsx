
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-bookish-accent" />
              <span className="font-serif text-xl font-medium">
                Novel<span className="text-bookish-accent">Nook</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your gateway to worlds crafted with words. Discover handpicked books that inspire, entertain, and transform.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-bookish-muted hover:bg-bookish-muted/80 text-bookish-ink/80 transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-bookish-muted hover:bg-bookish-muted/80 text-bookish-ink/80 transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-bookish-muted hover:bg-bookish-muted/80 text-bookish-ink/80 transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-bookish-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-bookish-accent transition-colors">Books</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-bookish-accent transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-bookish-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-bookish-accent transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-bookish-accent transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-bookish-accent flex-shrink-0 mt-0.5" />
                <span>123 Bookworm Lane, Reading, RG1 2BX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-bookish-accent flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-bookish-accent flex-shrink-0" />
                <span>hello@novelnook.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get special offers, new releases updates, and more.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-bookish-muted/50 border-0 focus-visible:ring-bookish-accent"
              />
              <Button className="bg-bookish-accent hover:bg-bookish-accent/90">
                Join
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NovelNook. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-bookish-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-bookish-accent transition-colors">Terms of Service</Link>
            <Link to="/shipping" className="hover:text-bookish-accent transition-colors">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
