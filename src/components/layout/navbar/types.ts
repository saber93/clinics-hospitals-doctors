
import { ReactNode } from 'react';

export interface NavLinkType {
  name: string;
  path: string;
  icon?: ReactNode;
  auth?: boolean;
  role?: string;
  protected?: boolean;
}

export interface AuthButtonsProps {
  session: any;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogout?: () => void;
  filteredLinks: NavLinkType[];
  session: any;
}

export interface DesktopNavProps {
  filteredLinks: NavLinkType[];
  session: any;
}
