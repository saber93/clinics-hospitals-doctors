
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarItemSkeleton: React.FC = () => (
  <div className="flex items-center px-3 py-2">
    <Skeleton className="h-4 w-4 mr-3 rounded" />
    <Skeleton className="h-4 w-24 rounded" />
  </div>
);

export default SidebarItemSkeleton;
