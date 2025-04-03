
// Define the theme structure for each specialty
export type SpecialtyTheme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientStyle: string;
  icon: string;
  cardStyle: string;
};

// Default theme as fallback
const defaultTheme: SpecialtyTheme = {
  primaryColor: 'primary',
  secondaryColor: 'secondary',
  accentColor: 'accent',
  gradientStyle: 'bg-gradient-to-r from-mint-500 to-mint-400',
  icon: 'activity',
  cardStyle: 'border-mint-500'
};

// Specialty-specific themes
const specialtyThemes: Record<string, SpecialtyTheme> = {
  'Dermatology': {
    primaryColor: 'mint-500',
    secondaryColor: 'mint-400',
    accentColor: 'mint-300',
    gradientStyle: 'bg-gradient-to-r from-mint-500 to-mint-400',
    icon: 'activity',
    cardStyle: 'border-mint-500 bg-mint-50/30'
  },
  'Plastic Surgery': {
    primaryColor: 'rose-500',
    secondaryColor: 'rose-400',
    accentColor: 'rose-300',
    gradientStyle: 'bg-gradient-to-r from-rose-500 to-pink-500',
    icon: 'scissors',
    cardStyle: 'border-rose-500 bg-rose-50/30'
  },
  'Dental': {
    primaryColor: 'sky-500',
    secondaryColor: 'sky-400',
    accentColor: 'sky-300',
    gradientStyle: 'bg-gradient-to-r from-sky-500 to-blue-500',
    icon: 'tooth',
    cardStyle: 'border-sky-500 bg-sky-50/30'
  },
  'Ophthalmologist': {
    primaryColor: 'violet-500',
    secondaryColor: 'violet-400',
    accentColor: 'violet-300',
    gradientStyle: 'bg-gradient-to-r from-violet-500 to-purple-500',
    icon: 'eye',
    cardStyle: 'border-violet-500 bg-violet-50/30'
  },
  'Med Spa': {
    primaryColor: 'amber-500',
    secondaryColor: 'amber-400',
    accentColor: 'amber-300',
    gradientStyle: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    icon: 'sparkles',
    cardStyle: 'border-amber-500 bg-amber-50/30'
  },
  'Skin Clinic': {
    primaryColor: 'emerald-500',
    secondaryColor: 'emerald-400',
    accentColor: 'emerald-300',
    gradientStyle: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    icon: 'heart',
    cardStyle: 'border-emerald-500 bg-emerald-50/30'
  },
  'Beauty Clinic': {
    primaryColor: 'pink-500',
    secondaryColor: 'pink-400',
    accentColor: 'pink-300',
    gradientStyle: 'bg-gradient-to-r from-pink-500 to-rose-400',
    icon: 'sparkles',
    cardStyle: 'border-pink-500 bg-pink-50/30'
  },
  'Aesthetics': {
    primaryColor: 'indigo-500',
    secondaryColor: 'indigo-400',
    accentColor: 'indigo-300',
    gradientStyle: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    icon: 'star',
    cardStyle: 'border-indigo-500 bg-indigo-50/30'
  },
  'Laser Clinic': {
    primaryColor: 'red-500',
    secondaryColor: 'red-400',
    accentColor: 'red-300',
    gradientStyle: 'bg-gradient-to-r from-red-500 to-orange-500',
    icon: 'zap',
    cardStyle: 'border-red-500 bg-red-50/30'
  }
};

// Function to determine theme based on category and subcategory
export const getSpecialtyTheme = (category?: string, subCategory?: string): SpecialtyTheme => {
  if (!category) return defaultTheme;
  
  // Try to match by category first
  const theme = specialtyThemes[category];
  
  // If no theme for category, try subcategory
  if (!theme && subCategory && specialtyThemes[subCategory]) {
    return specialtyThemes[subCategory];
  }
  
  // Return found theme or default
  return theme || defaultTheme;
};
