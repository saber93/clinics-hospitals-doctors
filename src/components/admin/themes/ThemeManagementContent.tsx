
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemePageHeader from './ThemePageHeader';
import ThemeCategoryTabs from './ThemeCategoryTabs';

const ThemeManagementContent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleEditTheme = (entityType: string, id: string) => {
    navigate(`/admin/themes/${entityType}/${id}`);
  };

  return (
    <div className="container py-6">
      <ThemePageHeader 
        title="Theme Management"
        description="Customize the appearance of Clinics, Doctors, and Hospitals by editing their theme settings."
      />
      
      <ThemeCategoryTabs onEditTheme={handleEditTheme} />
    </div>
  );
};

export default ThemeManagementContent;
