import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  imageHeight?: string;
  showBadges?: boolean;
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className,
  imageHeight = 'h-48',
  showBadges = true,
  lines = 3,
}) => {
  return (
    <div className={cn('bg-card rounded-lg shadow-md overflow-hidden', className)}>
      {/* Image skeleton */}
      <Skeleton className={cn('w-full', imageHeight)} />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Location/subtitle */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Description lines */}
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn('h-3', i === lines - 1 ? 'w-3/4' : 'w-full')} 
          />
        ))}
        
        {/* Badges */}
        {showBadges && (
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export const DoctorCardSkeleton: React.FC = () => (
  <div className="bg-card rounded-lg shadow-md p-6">
    <Skeleton className="w-full h-64 rounded-lg mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-3" />
    <div className="flex items-center gap-2 mb-3">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-4" />
        ))}
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-4/5 mb-4" />
    <div className="flex gap-2">
      <Skeleton className="h-7 w-20 rounded-full" />
      <Skeleton className="h-7 w-24 rounded-full" />
    </div>
  </div>
);

export const ClinicCardSkeleton: React.FC = () => (
  <div className="bg-card rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48">
      <Skeleton className="w-full h-full" />
      <div className="absolute top-2 left-2">
        <Skeleton className="h-6 w-16 rounded" />
      </div>
      <div className="absolute top-2 right-2">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
);
