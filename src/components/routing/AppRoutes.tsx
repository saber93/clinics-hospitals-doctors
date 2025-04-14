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

// Error boundary component to catch lazy loading errors
class LazyLoadErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="container mx-auto p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load this page. Please try refreshing the browser.
              <br />
              <code className="text-xs bg-gray-100 p-1 rounded mt-2 block">
                {this.state.error?.message || "Unknown error"}
              </code>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load pages with explicit loading chunks to improve performance
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/Home'));
const Auth = lazy(() => import(/* webpackChunkName: "auth" */ '@/pages/Auth'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard'));
const DoctorDashboard = lazy(() => import(/* webpackChunkName: "doctor-dashboard" */ '@/pages/DoctorDashboard'));
const VendorDashboard = lazy(() => import(/* webpackChunkName: "vendor-dashboard" */ '@/pages/VendorDashboard'));
const CenterDashboard = lazy(() => import(/* webpackChunkName: "center-dashboard" */ '@/pages/CenterDashboard'));
const ClientDashboard = lazy(() => import(/* webpackChunkName: "client-dashboard" */ '@/pages/ClientDashboard'));
const Products = lazy(() => import(/* webpackChunkName: "products" */ '@/pages/Products'));
const ProductDetails = lazy(() => import(/* webpackChunkName: "product-details" */ '@/pages/ProductDetails'));
const ProductForm = lazy(() => import(/* webpackChunkName: "product-form" */ '@/pages/ProductForm'));
const ProductsManagement = lazy(() => import(/* webpackChunkName: "products-management" */ '@/pages/ProductsManagement'));
const Categories = lazy(() => import(/* webpackChunkName: "categories" */ '@/pages/Categories'));
const CategoryForm = lazy(() => import(/* webpackChunkName: "category-form" */ '@/pages/CategoryForm'));
const Clinics = lazy(() => import(/* webpackChunkName: "clinics" */ '@/pages/Clinics'));
const Doctors = lazy(() => import(/* webpackChunkName: "doctors" */ '@/pages/Doctors'));
const DoctorDetails = lazy(() => import(/* webpackChunkName: "doctor-details" */ '@/pages/DoctorDetails'));
const Hospitals = lazy(() => {
  console.log("Lazy loading Hospitals component");
  return import(/* webpackChunkName: "hospitals" */ '@/pages/Hospitals')
    .catch(error => {
      console.error("Error loading Hospitals module:", error);
      throw error;
    });
});
const ClinicDetails = lazy(() => import(/* webpackChunkName: "clinic-details" */ '@/pages/ClinicDetails'));
const Reservations = lazy(() => import(/* webpackChunkName: "reservations" */ '@/pages/Reservations'));
const MyReservations = lazy(() => import(/* webpackChunkName: "my-reservations" */ '@/pages/MyReservations'));
const Vouchers = lazy(() => import(/* webpackChunkName: "vouchers" */ '@/pages/Vouchers'));
const Offers = lazy(() => import(/* webpackChunkName: "offers" */ '@/pages/Offers'));
const About = lazy(() => import(/* webpackChunkName: "about" */ '@/pages/About'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ '@/pages/Contact'));
const AllBookings = lazy(() => import(/* webpackChunkName: "all-bookings" */ '@/pages/AllBookings'));
const AdminDashboard = lazy(() => import(/* webpackChunkName: "admin-dashboard" */ '@/pages/AdminDashboard'));
const TotalVendors = lazy(() => import(/* webpackChunkName: "total-vendors" */ '@/pages/TotalVendors'));
const TotalClients = lazy(() => import(/* webpackChunkName: "total-clients" */ '@/pages/TotalClients'));
const ChatPage = lazy(() => import(/* webpackChunkName: "chat-page" */ '@/pages/ChatPage'));
const ChatSessions = lazy(() => import(/* webpackChunkName: "chat-sessions" */ '@/pages/ChatSessions'));
const ChatSettings = lazy(() => import(/* webpackChunkName: "chat-settings" */ '@/pages/ChatSettings'));
const SellerVouchers = lazy(() => import(/* webpackChunkName: "seller-vouchers" */ '@/pages/VoucherManagement'));
const VoucherForm = lazy(() => import(/* webpackChunkName: "voucher-form" */ '@/pages/AddVoucher'));
const EditVoucherPage = lazy(() => import(/* webpackChunkName: "edit-voucher" */ '@/pages/EditVoucher'));
const AddProduct = lazy(() => import(/* webpackChunkName: "add-product" */ '@/pages/AddProduct'));
const EditProduct = lazy(() => import(/* webpackChunkName: "edit-product" */ '@/pages/EditProduct'));
const Cart = lazy(() => import(/* webpackChunkName: "cart" */ '@/pages/Cart'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/Profile'));
const ProfileSettings = lazy(() => import(/* webpackChunkName: "profile-settings" */ '@/pages/ProfileSettings'));

// Admin pages
const BlogsPage = lazy(() => import(/* webpackChunkName: "blogs-page" */ '@/pages/admin/BlogsPage'));
const BlogFormPage = lazy(() => import(/* webpackChunkName: "blog-form" */ '@/pages/admin/BlogFormPage'));
const ServicesPage = lazy(() => import(/* webpackChunkName: "services-page" */ '@/pages/admin/ServicesPage'));
const ServiceFormPage = lazy(() => import(/* webpackChunkName: "service-form" */ '@/pages/admin/ServiceFormPage'));
const ContactMessagesPage = lazy(() => import(/* webpackChunkName: "contact-messages" */ '@/pages/admin/ContactMessagesPage'));
const AnalyticsPage = lazy(() => import(/* webpackChunkName: "analytics" */ '@/pages/admin/AnalyticsPage'));
const SettingsPage = lazy(() => import(/* webpackChunkName: "settings" */ '@/pages/admin/SettingsPage'));
const ThemeManagementPage = lazy(() => import(/* webpackChunkName: "theme-management" */ '@/pages/admin/ThemeManagementPage'));
const ThemeEditorPage = lazy(() => import(/* webpackChunkName: "theme-editor" */ '@/pages/admin/ThemeEditorPage'));

const AppRoutes = () => {
  return (
    <AuthProvider>
      <GlobalLoadingIndicator />
      <LazyLoadErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clinics/:id" element={<ClinicDetails />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/hospitals" element={
              <LazyLoadErrorBoundary
                fallback={
                  <div className="min-h-screen bg-gray-50 p-6">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error Loading Hospitals</AlertTitle>
                      <AlertDescription>
                        There was a problem loading the hospitals page. Please try refreshing the browser.
                      </AlertDescription>
                    </Alert>
                  </div>
                }
              >
                <Hospitals />
              </LazyLoadErrorBoundary>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            
            <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Navigate to="/auth?mode=login" replace /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Navigate to="/auth?mode=register" replace /></PublicRoute>} />
            
            <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
            <Route path="/my-reservations" element={<ProtectedRoute><MyReservations /></ProtectedRoute>} />
            <Route path="/vouchers" element={<ProtectedRoute><Vouchers /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            <Route path="/products-management" element={<ProtectedRoute><ProductsManagement /></ProtectedRoute>} />
            
            <Route path="/seller-vouchers" element={<ProtectedRoute><SellerVouchers /></ProtectedRoute>} />
            <Route path="/seller-vouchers/new" element={<ProtectedRoute><VoucherForm /></ProtectedRoute>} />
            <Route path="/seller-vouchers/:id/edit" element={<ProtectedRoute><EditVoucherPage /></ProtectedRoute>} />
            <Route path="/add-voucher" element={<ProtectedRoute><VoucherForm /></ProtectedRoute>} />
            
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
            <Route path="/categories/:id/edit" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
            
            <Route path="/all-bookings" element={<ProtectedRoute><AllBookings /></ProtectedRoute>} />
            
            <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/vendor-dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="/center-dashboard" element={<ProtectedRoute><CenterDashboard /></ProtectedRoute>} />
            <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            
            <Route path="/chats/:chatId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/chats" element={<ProtectedRoute><ChatSessions /></ProtectedRoute>} />
            <Route path="/chat-sessions" element={<ProtectedRoute><ChatSessions /></ProtectedRoute>} />
            <Route path="/chat-settings" element={<ProtectedRoute><ChatSettings /></ProtectedRoute>} />
            
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout></ProtectedRoute>} />
            <Route path="/vendors" element={<ProtectedRoute><AdminDashboardLayout><TotalVendors /></AdminDashboardLayout></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute><AdminDashboardLayout><TotalClients /></AdminDashboardLayout></ProtectedRoute>} />
            <Route path="/admin/themes" element={<ProtectedRoute><ThemeManagementPage /></ProtectedRoute>} />
            <Route path="/admin/themes/:entityType/:id" element={<ProtectedRoute><ThemeEditorPage /></ProtectedRoute>} />
            
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardLayout><Outlet /></AdminDashboardLayout></ProtectedRoute>}>
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="blogs/new" element={<BlogFormPage />} />
              <Route path="blogs/:id" element={<BlogFormPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/new" element={<ServiceFormPage />} />
              <Route path="services/:id" element={<ServiceFormPage />} />
              <Route path="contact-messages" element={<ContactMessagesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LazyLoadErrorBoundary>
    </AuthProvider>
  );
};

export default AppRoutes;
