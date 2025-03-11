
import { Route } from "react-router-dom";
import SellerDashboard from "@/pages/SellerDashboard";
import ProductsManagement from "@/pages/ProductsManagement";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import VoucherManagement from "@/pages/VoucherManagement";
import AddVoucher from "@/pages/AddVoucher";
import EditVoucher from "@/pages/EditVoucher";

export const SellerRoutes = () => {
  return (
    <>
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/products" element={<ProductsManagement />} />
      <Route path="/products/new" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/seller-vouchers" element={<VoucherManagement />} />
      <Route path="/seller-vouchers/new" element={<AddVoucher />} />
      <Route path="/seller-vouchers/edit/:id" element={<EditVoucher />} />
    </>
  );
};
