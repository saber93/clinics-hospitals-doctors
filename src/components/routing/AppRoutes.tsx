
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import Loading from '@/components/ui/Loading';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Products = lazy(() => import('@/pages/Products'));
const ProductForm = lazy(() => import('@/pages/ProductForm'));
const Categories = lazy(() => import('@/pages/Categories'));
const CategoryForm = lazy(() => import('@/pages/CategoryForm'));
const Clinics = lazy(() => import('@/pages/Clinics'));
const ClinicDetails = lazy(() => import('@/pages/ClinicDetails'));
const Reservations = lazy(() => import('@/pages/Reservations'));
import AllBookings from "@/pages/AllBookings";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
          <Route path="/categories/:id/edit" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
          <Route path="/all-bookings" element={<ProtectedRoute><AllBookings /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
