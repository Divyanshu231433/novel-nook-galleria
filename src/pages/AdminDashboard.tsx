
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Filter, 
  X, 
  ArrowUpRight, 
  LogOut,
  CheckCircle2,
  Truck,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Order = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  orderDate: string;
  total: number;
  totalItems: number;
  status: string;
  items: any[];
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod?: string;
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const ordersPerPage = 10;

  useEffect(() => {
    // Fetch all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('bookOrders') || '[]');
    setOrders(allOrders);
    setFilteredOrders(allOrders);
  }, []);

  useEffect(() => {
    let result = [...orders];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) || 
        order.userName?.toLowerCase().includes(query) ||
        order.userEmail?.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply sorting
    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    } else if (sortOrder === 'highest') {
      result.sort((a, b) => b.total - a.total);
    } else if (sortOrder === 'lowest') {
      result.sort((a, b) => a.total - b.total);
    }
    
    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter, sortOrder]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('bookOrders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId.substring(0, 8).toUpperCase()} is now ${newStatus}`,
    });
    
    setEditingOrder(null);
  };

  const startOrder = (currentPage - 1) * ordersPerPage;
  const endOrder = startOrder + ordersPerPage;
  const pageOrders = filteredOrders.slice(startOrder, endOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'processing':
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'shipped':
        return <Truck className="h-4 w-4 mr-1" />;
      case 'delivered':
        return <ShoppingBag className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <X className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-bookish-accent" />
            <h1 className="text-xl font-bold">Order Management</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link to="/">Store Front</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="text-red-500 border-red-200">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Package className="h-5 w-5 mr-2 text-bookish-accent" />
              All Orders ({filteredOrders.length})
            </h2>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageOrders.length > 0 ? (
                  pageOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{order.id.substring(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.userName || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{order.userEmail || 'N/A'}</div>
                      </TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>{order.totalItems}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">Update</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Update Order Status</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Change the status for order #{order.id.substring(0, 8).toUpperCase()}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="py-4">
                                <RadioGroup
                                  value={newStatus || order.status}
                                  onValueChange={setNewStatus}
                                  className="grid grid-cols-1 gap-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pending" id="pending" />
                                    <label
                                      htmlFor="pending"
                                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                                      Pending
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="processing" id="processing" />
                                    <label
                                      htmlFor="processing"
                                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" />
                                      Processing
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="shipped" id="shipped" />
                                    <label
                                      htmlFor="shipped"
                                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      <Truck className="h-4 w-4 mr-2 text-indigo-500" />
                                      Shipped
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="delivered" id="delivered" />
                                    <label
                                      htmlFor="delivered"
                                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      <ShoppingBag className="h-4 w-4 mr-2 text-green-500" />
                                      Delivered
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cancelled" id="cancelled" />
                                    <label
                                      htmlFor="cancelled"
                                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      <X className="h-4 w-4 mr-2 text-red-500" />
                                      Cancelled
                                    </label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setNewStatus('')}>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleStatusChange(order.id, newStatus || order.status)}
                                >
                                  Update Status
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          
                          <Button size="sm" variant="ghost" asChild>
                            <Link 
                              to="/thank-you" 
                              state={{ order }}
                              className="inline-flex items-center"
                            >
                              Details
                              <ArrowUpRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredOrders.length > ordersPerPage && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
