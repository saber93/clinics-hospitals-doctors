
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Loading from '@/components/ui/Loading';
import GlobalLoadingIndicator from '@/components/ui/GlobalLoadingIndicator';
import NotFound from '@/pages/NotFound';
import AdminDashboardLayout from '@/pages/admin/AdminDashboardLayout';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LazyLoadErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface LazyLoadErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class LazyLoadErrorBoundary extends React.Component<LazyLoadErrorBoundaryProps, LazyLoadErrorBoundaryState> {
  constructor(props: LazyLoadErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): LazyLoadErrorBoundaryState {
    console.error("Error captured in LazyLoadErrorBoundary:", error.message);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy loading error caught:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Show a toast notification
    toast.error("Error loading component", {
      description: "Please try refreshing the page",
      duration: 8000
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    
    // Force refresh the page to reload all chunks
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="container mx-auto p-4 my-8">
          <Alert variant="destructive" className="border border-destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Error Loading Page</AlertTitle>
            <AlertDescription>
              <p className="mb-4">Failed to load this page. This might be due to network issues or a problem with the application.</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button onClick={this.handleRetry} variant="default" size="lg" className="w-full sm:w-auto">
                  Refresh Page
                </Button>
                <Button 
                  onClick={() => window.history.back()} 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Go Back
                </Button>
              </div>
              <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                <code className="text-xs break-all whitespace-pre-wrap">
                  {this.state.error?.message || "Unknown error"}
                </code>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

// Improve the lazy loading function to add better error logging
const loadComponent = (componentPath: string) => {
  return lazy(() => {
    console.log(`Loading component: ${componentPath}`);
    return import(`@/pages/${componentPath}`)
      .catch(error => {
        console.error(`Error loading component ${componentPath}:`, error);
        console.error(`Stack trace:`, error.stack);
        
        // Show toast for component loading errors
        toast.error(`Failed to load: ${componentPath}`, {
          description: "Please try refreshing the page",
          duration: 5000
        });
        
        throw error; // Re-throw to be caught by error boundary
      });
  });
};

const Home = loadComponent('Home');
const Auth = loadComponent('Auth');
const Dashboard = loadComponent('Dashboard');
const DoctorDashboard = loadComponent('DoctorDashboard');
const VendorDashboard = loadComponent('VendorDashboard');
const CenterDashboard = loadComponent('CenterDashboard');
const ClientDashboard = loadComponent('ClientDashboard');
const Products = loadComponent('Products');
const ProductDetails = loadComponent('ProductDetails');
const ProductForm = loadComponent('ProductForm');
const ProductsManagement = loadComponent('ProductsManagement');
const Categories = loadComponent('Categories');
const CategoryForm = loadComponent('CategoryForm');
const Clinics = loadComponent('Clinics');
const Doctors = loadComponent('Doctors');
const DoctorDetails = loadComponent('DoctorDetails');
const Hospitals = loadComponent('Hospitals');
const ClinicDetails = loadComponent('ClinicDetails');
const Reservations = loadComponent('Reservations');
const MyReservations = loadComponent('MyReservations');
const Vouchers = loadComponent('Vouchers');
const Offers = loadComponent('Offers');
const About = loadComponent('About');
const Contact = loadComponent('Contact');
const AllBookings = loadComponent('AllBookings');
const AdminDashboard = loadComponent('AdminDashboard');
const TotalVendors = loadComponent('TotalVendors');
const TotalClients = loadComponent('TotalClients');
const ChatPage = loadComponent('ChatPage');
const ChatSessions = loadComponent('ChatSessions');
const ChatSettings = loadComponent('ChatSettings');
const SellerVouchers = loadComponent('VoucherManagement');
const VoucherForm = loadComponent('AddVoucher');
const EditVoucherPage = loadComponent('EditVoucher');
const AddProduct = loadComponent('AddProduct');
const EditProduct = loadComponent('EditProduct');
const Cart = loadComponent('Cart');
const Profile = loadComponent('Profile');
const ProfileSettings = loadComponent('ProfileSettings');

const BlogsPage = loadComponent('admin/BlogsPage');
const BlogFormPage = loadComponent('admin/BlogFormPage');
const ServicesPage = loadComponent('admin/ServicesPage');
const ServiceFormPage = loadComponent('admin/ServiceFormPage');
const ContactMessagesPage = loadComponent('admin/ContactMessagesPage');
const AnalyticsPage = loadComponent('admin/AnalyticsPage');
const SettingsPage = loadComponent('admin/SettingsPage');
const ThemeManagementPage = loadComponent('admin/ThemeManagementPage');
const ThemeEditorPage = loadComponent('admin/ThemeEditorPage');

const DefaultErrorFallback = (
  <div className="min-h-screen bg-gray-50 p-6">
    <Alert variant="destructive" className="border border-destructive max-w-2xl mx-auto">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-lg font-semibold">Error Loading Page</AlertTitle>
      <AlertDescription>
        <p className="mb-4">There was a problem loading this page. Please try refreshing the browser.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button onClick={() => window.location.reload()} variant="default" size="lg" className="w-full sm:w-auto">
            Refresh Page
          </Button>
          <Button 
            onClick={() => window.history.back()} 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  </div>
);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <GlobalLoadingIndicator />
      <LazyLoadErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Home />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/about" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <About />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/contact" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Contact />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/clinics/:id" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <ClinicDetails />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/clinics" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Clinics />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/doctors" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Doctors />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/doctors/:id" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <DoctorDetails />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/hospitals" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Hospitals />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/cart" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Cart />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/offers" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Offers />
              </LazyLoadErrorBoundary>
            } />
            
            <Route path="/auth" element={
              <PublicRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Auth />
                </LazyLoadErrorBoundary>
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute><Navigate to="/auth?mode=login" replace /></PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute><Navigate to="/auth?mode=register" replace /></PublicRoute>
            } />
            
            <Route path="/reservations" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Reservations />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/my-reservations" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <MyReservations />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/vouchers" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Vouchers />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Dashboard />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Profile />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ProfileSettings />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <Products />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/product/:id" element={
              <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                <ProductDetails />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/products/new" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ProductForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/products/:id/edit" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ProductForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/add-product" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AddProduct />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/edit-product/:id" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <EditProduct />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/products-management" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ProductsManagement />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/seller-vouchers" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <SellerVouchers />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/seller-vouchers/new" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <VoucherForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/seller-vouchers/:id/edit" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <EditVoucherPage />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/add-voucher" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <VoucherForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/categories" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <Categories />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/categories/new" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <CategoryForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/categories/:id/edit" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <CategoryForm />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/all-bookings" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AllBookings />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <DoctorDashboard />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/vendor-dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <VendorDashboard />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/center-dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <CenterDashboard />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/client-dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ClientDashboard />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/chats/:chatId" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ChatPage />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/chats" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ChatSessions />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/chat-sessions" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ChatSessions />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/chat-settings" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ChatSettings />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AdminDashboardLayout>
                    <AdminDashboard />
                  </AdminDashboardLayout>
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/vendors" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AdminDashboardLayout>
                    <TotalVendors />
                  </AdminDashboardLayout>
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/clients" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AdminDashboardLayout>
                    <TotalClients />
                  </AdminDashboardLayout>
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/admin/themes" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ThemeManagementPage />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/admin/themes/:entityType/:id" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ThemeEditorPage />
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AdminDashboardLayout>
                    <Outlet />
                  </AdminDashboardLayout>
                </LazyLoadErrorBoundary>
              </ProtectedRoute>
            }>
              <Route path="analytics" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <AnalyticsPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="blogs" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <BlogsPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="blogs/new" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <BlogFormPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="blogs/:id" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <BlogFormPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="services" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ServicesPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="services/new" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ServiceFormPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="services/:id" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ServiceFormPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="contact-messages" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <ContactMessagesPage />
                </LazyLoadErrorBoundary>
              } />
              <Route path="settings" element={
                <LazyLoadErrorBoundary fallback={DefaultErrorFallback}>
                  <SettingsPage />
                </LazyLoadErrorBoundary>
              } />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LazyLoadErrorBoundary>
    </AuthProvider>
  );
};

export default AppRoutes;
