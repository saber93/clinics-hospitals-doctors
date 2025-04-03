
import React from 'react';
import SidebarSectionSkeleton from './SidebarSectionSkeleton';

interface SidebarSkeletonProps {
  sectionCount?: number;
}

const SidebarSkeleton: React.FC<SidebarSkeletonProps> = ({ sectionCount = 5 }) => {
  // Create an array with varying item counts to simulate the real sidebar structure
  const sectionItemCounts = [3, 3, 4, 1, 1];
  
  return (
    <div className="w-full space-y-6 animate-pulse">
      {Array(sectionCount).fill(0).map((_, index) => (
        <SidebarSectionSkeleton 
          key={index} 
          itemCount={sectionItemCounts[index % sectionItemCounts.length]} 
        />
      ))}
    </div>
  );
};

export default SidebarSkeleton;
