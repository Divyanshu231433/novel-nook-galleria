
import React from 'react';
import { BookOpen, Mail, MapPin, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-bookish-ink mb-6">
                  About NovelNook
                </h1>
                <p className="text-muted-foreground mb-6">
                  Founded in 2023, NovelNook is more than just an online bookstore. We're a community of passionate readers dedicated to connecting people with stories that inspire, educate, and entertain.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our carefully curated collection spans across genres, ensuring that every reader finds their perfect match. We believe in the transformative power of literature and strive to make quality books accessible to everyone.
                </p>
                <div className="flex items-center gap-4 text-bookish-accent font-medium">
                  <BookOpen className="h-5 w-5" />
                  Sharing stories that matter since 2023
                </div>
              </div>
              
              <div className="relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="NovelNook Bookstore"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -z-10 inset-0 bg-bookish-accent/10 rounded-lg transform translate-x-6 translate-y-6"></div>
              </div>
            </div>
          </section>
          
          {/* Our Mission */}
          <section className="mb-16 py-12 px-6 bg-bookish-muted/30 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              To enrich lives through the joy of reading by providing a thoughtfully curated selection of books that inspire curiosity, foster empathy, and expand horizons.
            </p>
          </section>
          
          {/* Our Team */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-8">
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Emma Thompson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                  bio: "A lifelong reader with a background in publishing, Emma founded NovelNook to share her passion for literature."
                },
                {
                  name: "David Chen",
                  role: "Head Curator",
                  image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                  bio: "With an MA in Literature, David carefully selects each title in our collection based on quality and reader appeal."
                },
                {
                  name: "Sarah Johnson",
                  role: "Community Manager",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                  bio: "Sarah manages our book clubs, author events, and keeps our community of readers engaged and connected."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-bookish-ink">{member.name}</h3>
                    <p className="text-bookish-accent font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Contact Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-bookish-ink mb-6">
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions or feedback? We'd love to hear from you. Reach out to our team using the contact information below or fill out the form.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-bookish-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-muted-foreground">123 Reading Lane, Bookville, BK 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-bookish-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">hello@novelnook.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-bookish-accent mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-medium text-bookish-ink mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  ></textarea>
                </div>
                
                <Button className="bg-bookish-accent hover:bg-bookish-accent/90 text-white w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
