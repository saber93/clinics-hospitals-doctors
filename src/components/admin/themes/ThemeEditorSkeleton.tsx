
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ThemeEditorSkeleton: React.FC = () => {
  return (
    <div className="container py-6 space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-md" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  );
};

export default ThemeEditorSkeleton;
