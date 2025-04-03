
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

type RouteConfig = {
  [key: string]: {
    label: string;
    parent?: string;
  }
};

const AdminBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Define route configurations
  const routeConfig: RouteConfig = {
    'admin-dashboard': { label: 'Dashboard' },
    'admin': { label: 'Admin' },
    'themes': { label: 'Theme Management', parent: 'admin' },
    'blogs': { label: 'Blog Management', parent: 'admin' },
    'services': { label: 'Services', parent: 'admin' },
    'analytics': { label: 'Analytics', parent: 'admin' },
    'settings': { label: 'Settings', parent: 'admin' },
    'contact-messages': { label: 'Contact Messages', parent: 'admin' },
    'clinics': { label: 'Clinics', parent: 'themes' },
    'doctors': { label: 'Doctors', parent: 'themes' },
    'hospitals': { label: 'Hospitals', parent: 'themes' },
    'vendors': { label: 'Vendors' },
    'clients': { label: 'Clients' }
  };

  // Helper function to build breadcrumb items
  const buildBreadcrumbItems = () => {
    const breadcrumbItems: Array<{path: string, label: string, isActive: boolean}> = [];
    let currentPath = '';

    // Always add home
    breadcrumbItems.push({
      path: '/',
      label: 'Home',
      isActive: false
    });

    // Add path segments
    for (let i = 0; i < pathnames.length; i++) {
      const name = pathnames[i];
      currentPath += `/${name}`;
      
      // If we have a config for this route
      if (routeConfig[name]) {
        breadcrumbItems.push({
          path: currentPath,
          label: routeConfig[name].label,
          isActive: i === pathnames.length - 1
        });
      } else if (name.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
        // It's a UUID, so it's likely an entity ID
        breadcrumbItems.push({
          path: currentPath,
          label: 'Detail',
          isActive: i === pathnames.length - 1
        });
      } else {
        // For routes without explicit config
        breadcrumbItems.push({
          path: currentPath,
          label: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
          isActive: i === pathnames.length - 1
        });
      }
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = buildBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs on homepage
  }

  return (
    <Breadcrumb className="px-6 py-2 bg-white border-b">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {index === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center">
                    <Home className="h-4 w-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : index === breadcrumbItems.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
