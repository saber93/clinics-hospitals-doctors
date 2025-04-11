
import React from 'react';
import { 
  CreativeIcon, 
  ProductionIcon, 
  RebrandingIcon, 
  CorporateIcon,
  KpiMarketingIcon,
  ConferenceIcon,
  HospitalSolutionsIcon,
  MarketingConsultingIcon,
  WebDesignIcon,
  ExhibitionsIcon,
  PRCampaignIcon,
  VideoMarketingIcon,
  MedicalMarketingIcon
} from './ServiceIcons';

export interface ServiceItem {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  icon: React.FC;
}

export const services: ServiceItem[] = [
  {
    title: "Strategic Business Development Partnerships",
    titleAr: "شراكات تطوير الأعمال الاستراتيجية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: CreativeIcon,
  },
  {
    title: "Digital Marketing via Social Media",
    titleAr: "التسويق الرقمي عبر وسائل التواصل الاجتماعي",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: ProductionIcon,
  },
  {
    title: "Providing the Best Medical and Cosmetic Products and Equipment",
    titleAr: "توفير أفضل المنتجات والمعدات الطبية والتجميلية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: RebrandingIcon,
  },
  {
    title: "Digital Reputation Management for Clinics and Hospitals",
    titleAr: "إدارة السمعة الرقمية للعيادات والمستشفيات",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: CorporateIcon,
  },
  {
    title: "KPI-Driven Marketing",
    titleAr: "التسويق المدعوم بمؤشرات الأداء الرئيسية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: KpiMarketingIcon,
  },
  {
    title: "Organizing Medical Conferences and Specialized Events",
    titleAr: "تنظيم المؤتمرات الطبية والفعاليات المتخصصة",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: ConferenceIcon,
  },
  {
    title: "Customized Solutions for Hospitals and Medical Centers",
    titleAr: "حلول مخصصة للمستشفيات والمراكز الطبية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: HospitalSolutionsIcon,
  },
  {
    title: "Marketing Consulting to Enhance Branding and Increase Sales",
    titleAr: "استشارات تسويقية لتعزيز العلامة التجارية وزيادة المبيعات",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: MarketingConsultingIcon,
  },
  {
    title: "Website Design and Development Services",
    titleAr: "خدمات تصميم وتطوير المواقع الإلكترونية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: WebDesignIcon,
  },
  {
    title: "Organizing Medical Exhibitions",
    titleAr: "تنظيم المعارض الطبية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: ExhibitionsIcon,
  },
  {
    title: "Public Relations Campaign Management",
    titleAr: "إدارة حملات العلاقات العامة",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: PRCampaignIcon,
  },
  {
    title: "Video Marketing and Media Production",
    titleAr: "التسويق بالفيديو وإنتاج الوسائط",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: VideoMarketingIcon,
  },
  {
    title: "Marketing and Promotion of Medical Products and Services",
    titleAr: "تسويق وترويج المنتجات والخدمات الطبية",
    description: "read more",
    descriptionAr: "اقرأ المزيد",
    icon: MedicalMarketingIcon,
  },
];
