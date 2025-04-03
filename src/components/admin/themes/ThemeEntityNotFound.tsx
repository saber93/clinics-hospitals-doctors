
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ThemeEntityNotFoundProps {
  entityType?: string;
}

const ThemeEntityNotFound: React.FC<ThemeEntityNotFoundProps> = ({ entityType }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-6">
      <Button onClick={() => navigate('/admin/themes')} variant="ghost">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Theme Management
      </Button>
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Entity not found</h2>
          <p className="text-muted-foreground">The requested {entityType} could not be found.</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeEntityNotFound;
