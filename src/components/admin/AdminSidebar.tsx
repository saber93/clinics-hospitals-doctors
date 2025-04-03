
import React, { useState, useEffect } from 'react';
import SidebarSection from './sidebar/SidebarSection';
import SidebarSkeleton from './sidebar/SidebarSkeleton';
import { getDashboardNavData } from './sidebar/SidebarNavData';

const AdminSidebar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <SidebarSkeleton />;
  }
  
  const navSections = getDashboardNavData();

  return (
    <div className="w-full md:w-64 border-r bg-card p-4 space-y-6">
      {navSections.map((section) => (
        <SidebarSection 
          key={section.title}
          title={section.title} 
          items={section.items} 
        />
      ))}
    </div>
  );
};

export default AdminSidebar;
