
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgesProps {
  category: string;
  subCategory: string;
}

const CategoryBadges: React.FC<CategoryBadgesProps> = ({ category, subCategory }) => {
  return (
    <>
      <Badge variant="secondary" className="text-xs">{category}</Badge>
      <Badge variant="outline" className="text-xs">{subCategory}</Badge>
    </>
  );
};

export default CategoryBadges;
