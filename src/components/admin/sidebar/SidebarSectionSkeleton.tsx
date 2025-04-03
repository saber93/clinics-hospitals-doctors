
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SidebarItemSkeleton from './SidebarItemSkeleton';

interface SidebarSectionSkeletonProps {
  itemCount?: number;
}

const SidebarSectionSkeleton: React.FC<SidebarSectionSkeletonProps> = ({ itemCount = 3 }) => {
  return (
    <div className="py-2">
      <Skeleton className="h-4 w-20 px-3 mb-2 rounded" />
      <nav className="space-y-1">
        {Array(itemCount).fill(0).map((_, index) => (
          <SidebarItemSkeleton key={index} />
        ))}
      </nav>
    </div>
  );
};

export default SidebarSectionSkeleton;
