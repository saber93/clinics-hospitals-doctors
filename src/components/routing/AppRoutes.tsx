
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Loading from '@/components/ui/Loading';
import NotFound from '@/pages/NotFound';
import AdminDashboardLayout from '@/pages/admin/AdminDashboardLayout';

// Lazy load pages to improve performance
const Home = lazy(() => import('@/pages/Home'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DoctorDashboard = lazy(() => import('@/pages/DoctorDashboard'));
const VendorDashboard = lazy(() => import('@/pages/VendorDashboard'));
const CenterDashboard = lazy(() => import('@/pages/CenterDashboard'));
const ClientDashboard = lazy(() => import('@/pages/ClientDashboard'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const ProductForm = lazy(() => import('@/pages/ProductForm'));
const ProductsManagement = lazy(() => import('@/pages/ProductsManagement'));
const Categories = lazy(() => import('@/pages/Categories'));
const CategoryForm = lazy(() => import('@/pages/CategoryForm'));
const Clinics = lazy(() => import('@/pages/Clinics'));
const Doctors = lazy(() => import('@/pages/Doctors'));
const DoctorDetails = lazy(() => import('@/pages/DoctorDetails'));
const Hospitals = lazy(() => import('@/pages/Hospitals'));
const ClinicDetails = lazy(() => import('@/pages/ClinicDetails'));
const Reservations = lazy(() => import('@/pages/Reservations'));
const MyReservations = lazy(() => import('@/pages/MyReservations'));
const Vouchers = lazy(() => import('@/pages/Vouchers'));
const Offers = lazy(() => import('@/pages/Offers'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const AllBookings = lazy(() => import('@/pages/AllBookings'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const TotalVendors = lazy(() => import('@/pages/TotalVendors'));
const TotalClients = lazy(() => import('@/pages/TotalClients'));
const ChatPage = lazy(() => import('@/pages/ChatPage'));
const ChatSessions = lazy(() => import('@/pages/ChatSessions'));
const ChatSettings = lazy(() => import('@/pages/ChatSettings'));
const SellerVouchers = lazy(() => import('@/pages/VoucherManagement'));
const VoucherForm = lazy(() => import('@/pages/AddVoucher'));
const EditVoucherPage = lazy(() => import('@/pages/EditVoucher'));
const AddProduct = lazy(() => import('@/pages/AddProduct'));
const EditProduct = lazy(() => import('@/pages/EditProduct'));
const Cart = lazy(() => import('@/pages/Cart'));
const Profile = lazy(() => import('@/pages/Profile'));
const ProfileSettings = lazy(() => import('@/pages/ProfileSettings'));

// Admin pages
const BlogsPage = lazy(() => import('@/pages/admin/BlogsPage'));
const BlogFormPage = lazy(() => import('@/pages/admin/BlogFormPage'));
const ServicesPage = lazy(() => import('@/pages/admin/ServicesPage'));
const ServiceFormPage = lazy(() => import('@/pages/admin/ServiceFormPage'));
const ContactMessagesPage = lazy(() => import('@/pages/admin/ContactMessagesPage'));
const AnalyticsPage = lazy(() => import('@/pages/admin/AnalyticsPage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));
const ThemeManagementPage = lazy(() => import('@/pages/admin/ThemeManagementPage'));
const ThemeEditorPage = lazy(() => import('@/pages/admin/ThemeEditorPage'));

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/hospitals" element={<Hospitals />} />
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
    </AuthProvider>
  );
};

export default AppRoutes;
