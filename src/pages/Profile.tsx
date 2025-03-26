
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User, Key, Edit, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderHistory from '@/components/OrderHistory';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleSaveProfile = () => {
    updateProfile({ name });
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-medium">My Account</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
          
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="orders" className="gap-2">
                <User className="h-4 w-4" />
                My Orders
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <Key className="h-4 w-4" />
                Account Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email address</label>
                    <Input 
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                      className="max-w-md"
                    />
                    <p className="text-sm text-muted-foreground">Your email address cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <div className="flex max-w-md gap-2">
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                      />
                      {isEditing ? (
                        <Button onClick={handleSaveProfile} className="gap-1">
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-1">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 items-start">
                  <h3 className="text-sm font-medium">Account Created</h3>
                  <p className="text-sm text-muted-foreground">
                    You've been a member since {new Date().toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
