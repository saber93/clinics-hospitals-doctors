
import { NavLinkType } from "@/components/layout/navbar/types";
import { Package, Tag, LayoutDashboard, ShoppingBag } from "lucide-react";

export const sellerNavLinks: NavLinkType[] = [
  {
    name: "Dashboard",
    path: "/seller-dashboard",
    icon: LayoutDashboard,
    auth: true,
  },
  {
    name: "Products",
    path: "/products",
    icon: ShoppingBag,
    auth: true,
  },
  {
    name: "Vouchers",
    path: "/seller-vouchers",
    icon: Tag,
    auth: true,
  }
];
