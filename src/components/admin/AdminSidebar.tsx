
import React, { useState, useEffect } from 'react';
import SidebarSection from './sidebar/SidebarSection';
import SidebarSkeleton from './sidebar/SidebarSkeleton';
import SidebarLoadingIndicator from './sidebar/SidebarLoadingIndicator';
import { getDashboardNavData } from './sidebar/SidebarNavData';
import { NavSection } from './sidebar/SidebarNavData';

const AdminSidebar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [navSections, setNavSections] = useState<NavSection[]>([]);
  
  // Enhanced loading state with data fetching simulation
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        // Simulate network latency for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get the dashboard navigation data
        const data = getDashboardNavData();
        setNavSections(data);
      } catch (error) {
        console.error("Error loading navigation data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNavData();
  }, []);
  
  return (
    <div className="w-full md:w-64 border-r bg-card p-4 space-y-6">
      {loading ? (
        <>
          <SidebarLoadingIndicator />
          <SidebarSkeleton />
        </>
      ) : (
        <div className="animate-in fade-in duration-500">
          {navSections.map((section) => (
            <SidebarSection 
              key={section.title}
              title={section.title} 
              items={section.items} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
