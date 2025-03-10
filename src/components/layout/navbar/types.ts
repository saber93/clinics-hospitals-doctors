
import { ReactNode } from 'react';

export interface NavLinkType {
  name: string;
  path: string;
  icon?: ReactNode;
  auth?: boolean;
}
