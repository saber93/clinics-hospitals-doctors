
import { Clinic, Category } from "@/types/clinic";

export const categories: Category[] = [
  {
    id: "med-specialties",
    name: "Medical Specialties",
    subCategories: [
      { id: "cardiology", name: "Cardiology" },
      { id: "dermatology", name: "Dermatology" },
      { id: "neurology", name: "Neurology" },
      { id: "orthopedics", name: "Orthopedics" },
      { id: "pediatrics", name: "Pediatrics" }
    ]
  },
  {
    id: "aesthetic-services",
    name: "Aesthetic Services",
    subCategories: [
      { id: "facial", name: "Facial Treatments" },
      { id: "hair", name: "Hair Removal" },
      { id: "body", name: "Body Contouring" },
      { id: "skin", name: "Skin Rejuvenation" }
    ]
  },
  {
    id: "dental-care",
    name: "Dental Care",
    subCategories: [
      { id: "general-dentistry", name: "General Dentistry" },
      { id: "orthodontics", name: "Orthodontics" },
      { id: "cosmetic-dentistry", name: "Cosmetic Dentistry" },
      { id: "pediatric-dentistry", name: "Pediatric Dentistry" }
    ]
  },
  {
    id: "wellness",
    name: "Wellness & Prevention",
    subCategories: [
      { id: "nutrition", name: "Nutrition Counseling" },
      { id: "fitness", name: "Fitness Programs" },
      { id: "mental-health", name: "Mental Health" },
      { id: "holistic", name: "Holistic Medicine" }
    ]
  }
];

export const clinics: Clinic[] = [
  {
    id: "1",
    name: "HealthFirst Medical Center",
    description: "Comprehensive medical care for all your health needs with state-of-the-art equipment and experienced physicians.",
    location: "123 Main Street, New York, NY",
    category: "Medical Specialties",
    subCategory: "Cardiology",
    offerPercentage: 15,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Glow Aesthetics",
    description: "Premium aesthetic services focused on natural-looking results and client satisfaction.",
    location: "456 Park Avenue, New York, NY",
    category: "Aesthetic Services",
    subCategory: "Facial Treatments",
    offerPercentage: 20,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Bright Smile Dental",
    description: "Family-friendly dental practice offering preventive care and cosmetic treatments.",
    location: "789 Broadway, New York, NY",
    category: "Dental Care",
    subCategory: "General Dentistry",
    offerPercentage: 10,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Wellness Harmony Center",
    description: "Holistic approach to wellness combining traditional and alternative therapies.",
    location: "321 Fifth Avenue, New York, NY",
    category: "Wellness & Prevention",
    subCategory: "Holistic Medicine",
    offerPercentage: 25,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Derma Solutions",
    description: "Specialized dermatology clinic offering treatments for all skin conditions and cosmetic procedures.",
    location: "555 Lexington Avenue, New York, NY",
    category: "Medical Specialties",
    subCategory: "Dermatology",
    offerPercentage: 15,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Body Sculpt Studio",
    description: "Non-invasive body contouring treatments with proven results and minimal downtime.",
    location: "888 Madison Avenue, New York, NY",
    category: "Aesthetic Services",
    subCategory: "Body Contouring",
    offerPercentage: 30,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "7",
    name: "Perfect Teeth Orthodontics",
    description: "Modern orthodontic treatments for all ages with flexible payment options.",
    location: "444 Hudson Street, New York, NY",
    category: "Dental Care",
    subCategory: "Orthodontics",
    offerPercentage: 0,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "8",
    name: "MindBody Balance",
    description: "Integrated mental health services focusing on stress reduction and emotional wellbeing.",
    location: "777 West End Avenue, New York, NY",
    category: "Wellness & Prevention",
    subCategory: "Mental Health",
    offerPercentage: 5,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "9",
    name: "HeartCare Specialists",
    description: "Dedicated cardiovascular care with the latest diagnostic and treatment options.",
    location: "222 Central Park West, New York, NY",
    category: "Medical Specialties",
    subCategory: "Cardiology",
    offerPercentage: 0,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "10",
    name: "Advanced Skin Clinic",
    description: "Cutting-edge skin rejuvenation treatments for all skin types and concerns.",
    location: "999 Soho Square, New York, NY",
    category: "Aesthetic Services",
    subCategory: "Skin Rejuvenation",
    offerPercentage: 10,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "11",
    name: "Kiddie Smiles Dentistry",
    description: "Child-friendly dental practice specializing in preventive care and early intervention.",
    location: "333 East Village Road, New York, NY",
    category: "Dental Care",
    subCategory: "Pediatric Dentistry",
    offerPercentage: 15,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "12",
    name: "NutriLife Counseling",
    description: "Personalized nutrition programs designed to improve health and manage chronic conditions.",
    location: "666 Chelsea Lane, New York, NY",
    category: "Wellness & Prevention",
    subCategory: "Nutrition Counseling",
    offerPercentage: 20,
    imageUrl: "/placeholder.svg"
  }
];
