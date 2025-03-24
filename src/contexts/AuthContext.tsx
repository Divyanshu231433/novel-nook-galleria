
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('bookUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're checking against localStorage
      const users = JSON.parse(localStorage.getItem('bookUsers') || '[]');
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
      
      // Don't store password in the session
      const { password: _, ...userWithoutPassword } = foundUser;
      
      localStorage.setItem('bookUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're storing in localStorage
      const users = JSON.parse(localStorage.getItem('bookUsers') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive"
        });
        return false;
      }
      
      // Create new user
      const newUser = { 
        id: crypto.randomUUID(),
        name, 
        email, 
        password,
        createdAt: new Date().toISOString()
      };
      
      // Add to users list
      users.push(newUser);
      localStorage.setItem('bookUsers', JSON.stringify(users));
      
      // Log user in (without password in session)
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('bookUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      toast({
        title: "Account created",
        description: `Welcome to NovelNook, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "An error occurred during account creation",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('bookUser');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    localStorage.setItem('bookUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Also update in the users array
    const users = JSON.parse(localStorage.getItem('bookUsers') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...data } : u
    );
    localStorage.setItem('bookUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      login, 
      signup, 
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
