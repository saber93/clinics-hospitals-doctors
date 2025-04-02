
import React from 'react';
import { 
  CreativeIcon, 
  ProductionIcon, 
  RebrandingIcon, 
  CorporateIcon,
  KpiMarketingIcon,
  ConferenceIcon
} from './ServiceIcons';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.FC;
}

export const services: ServiceItem[] = [
  {
    title: "Strategic Business Development Partnerships",
    description: "read more",
    icon: CreativeIcon,
  },
  {
    title: "Digital Marketing via Social Media",
    description: "read more",
    icon: ProductionIcon,
  },
  {
    title: "Providing the Best Medical and Cosmetic Products and Equipment",
    description: "read more",
    icon: RebrandingIcon,
  },
  {
    title: "Digital Reputation Management for Clinics and Hospitals",
    description: "read more",
    icon: CorporateIcon,
  },
  {
    title: "KPI-Driven Marketing",
    description: "read more",
    icon: KpiMarketingIcon,
  },
  {
    title: "Organizing Medical Conferences and Specialized Events",
    description: "read more",
    icon: ConferenceIcon,
  },
];
