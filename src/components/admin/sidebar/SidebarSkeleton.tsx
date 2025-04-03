
import React from 'react';
import SidebarSectionSkeleton from './SidebarSectionSkeleton';

const SidebarSkeleton: React.FC = () => {
  return (
    <div className="w-full md:w-64 border-r bg-card p-4 space-y-6">
      <SidebarSectionSkeleton itemCount={2} />
      <SidebarSectionSkeleton itemCount={3} />
      <SidebarSectionSkeleton itemCount={4} />
      <SidebarSectionSkeleton itemCount={1} />
      <SidebarSectionSkeleton itemCount={1} />
    </div>
  );
};

export default SidebarSkeleton;
