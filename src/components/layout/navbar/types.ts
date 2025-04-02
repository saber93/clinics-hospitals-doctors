
import { ReactNode } from 'react';

export interface NavLinkType {
  name: string;
  path: string;
  icon?: React.ElementType;
  auth?: boolean;
  role?: string;
  protected?: boolean;
}

export interface AuthButtonsProps {
  session: any;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
  toggleMobileMenu?: () => void;
  handleLogout?: () => void;
  filteredLinks: NavLinkType[];
  session: any;
}

export interface DesktopNavProps {
  filteredLinks: NavLinkType[];
  session: any;
}
