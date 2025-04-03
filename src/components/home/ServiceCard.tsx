
import React from 'react';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.FC;  // For legacy support
  iconName?: string; // New approach using icon name
}

export default function ServiceCard({ title, description, icon: Icon, iconName }: ServiceCardProps) {
  // Use the icon name to get the component if provided
  const LucideIcon = iconName ? (Icons as any)[iconName] : null;
  
  return (
    <div className="h-full p-6 bg-white border rounded-xl shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {LucideIcon ? (
            <LucideIcon className="h-6 w-6" />
          ) : Icon ? (
            <Icon />
          ) : (
            <div className="h-6 w-6" />
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
