
import { icons } from 'lucide-react';

// Define a list of commonly used Lucide icons for themes
export const lucideIcons = [
  'activity',
  'heart',
  'smile',
  'star',
  'sun',
  'moon',
  'zap',
  'sparkles',
  'scissors',
  'tooth',
  'stethoscope',
  'pill',
  'medkit',
  'eye',
  'brain',
  'heartPulse',
  'allergens',
  'baby',
  'bath',
  'bedDouble',
  'bone',
  'building',
  'capsule',
  'cigarette',
  'cross',
  'firstAid',
  'fitness',
  'flame',
  'flowerSun',
  'glasses',
  'hand',
  'hospital',
  'spa',
  'stethoscope',
  'thermometer',
  'user',
  'users',
  'vaccine',
  'drop',
];

// Get icon component by name
export const getIconByName = (name: string) => {
  // Default to 'activity' if icon not found
  return icons[name as keyof typeof icons] || icons.activity;
};
