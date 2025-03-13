
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Loading from '@/components/ui/Loading';
import NotFound from '@/pages/NotFound';

// Lazy load pages to improve performance
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const DoctorDashboard = lazy(() => import('@/pages/DoctorDashboard'));
const VendorDashboard = lazy(() => import('@/pages/VendorDashboard'));
const CenterDashboard = lazy(() => import('@/pages/CenterDashboard'));
const ClientDashboard = lazy(() => import('@/pages/ClientDashboard'));
const Products = lazy(() => import('@/pages/Products'));
const ProductForm = lazy(() => import('@/pages/ProductForm'));
const Categories = lazy(() => import('@/pages/Categories'));
const CategoryForm = lazy(() => import('@/pages/CategoryForm'));
const Clinics = lazy(() => import('@/pages/Clinics'));
const ClinicDetails = lazy(() => import('@/pages/ClinicDetails'));
const Reservations = lazy(() => import('@/pages/Reservations'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const AllBookings = lazy(() => import('@/pages/AllBookings'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const TotalVendors = lazy(() => import('@/pages/TotalVendors'));
const TotalClients = lazy(() => import('@/pages/TotalClients'));

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Main public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/clinics" element={<Clinics />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          {/* Protected routes */}
          <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
          <Route path="/categories/:id/edit" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
          <Route path="/all-bookings" element={<ProtectedRoute><AllBookings /></ProtectedRoute>} />
          
          {/* Role-specific dashboard routes */}
          <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/vendor-dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
          <Route path="/center-dashboard" element={<ProtectedRoute><CenterDashboard /></ProtectedRoute>} />
          <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
          
          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/vendors" element={<ProtectedRoute><TotalVendors /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><TotalClients /></ProtectedRoute>} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
