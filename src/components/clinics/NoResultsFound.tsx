
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsFoundProps {
  onClearFilters: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium">No clinics found</h3>
      <p className="text-gray-500 mt-2">Try adjusting your search filters or browse all clinics</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default NoResultsFound;
