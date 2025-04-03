
import React from 'react';

interface ThemePageHeaderProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

const ThemePageHeader: React.FC<ThemePageHeaderProps> = ({ 
  title, 
  description,
  actionButton
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {actionButton && (
        <div>
          {actionButton}
        </div>
      )}
    </div>
  );
};

export default ThemePageHeader;
