
import { NavLinkType } from "@/components/layout/navbar/types";
import { Package, Tag, LayoutDashboard } from "lucide-react";

export const sellerNavLinks: NavLinkType[] = [
  {
    name: "Dashboard",
    path: "/seller-dashboard",
    auth: true,
  },
  {
    name: "Products",
    path: "/products",
    auth: true,
  },
  {
    name: "Vouchers",
    path: "/seller-vouchers",
    auth: true,
  }
];
