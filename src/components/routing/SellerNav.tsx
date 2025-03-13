
import { NavLinkType } from "@/components/layout/navbar/types";
import { Package, Tag, LayoutDashboard, ShoppingBag } from "lucide-react";

export const sellerNavLinks: NavLinkType[] = [
  {
    name: "Dashboard",
    path: "/seller-dashboard",
    icon: <LayoutDashboard size={16} />,
    auth: true,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBag size={16} />,
    auth: true,
  },
  {
    name: "Vouchers",
    path: "/seller-vouchers",
    icon: <Tag size={16} />,
    auth: true,
  }
];
