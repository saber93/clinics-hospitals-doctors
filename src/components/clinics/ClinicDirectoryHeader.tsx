
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ClinicDirectoryHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
}

const ClinicDirectoryHeader: React.FC<ClinicDirectoryHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isLoading
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      <div className="md:w-1/4">
        <h1 className="text-3xl font-bold tracking-tight">Clinic Directory</h1>
        <p className="text-muted-foreground">Discover clinics and their special offers</p>
      </div>
      
      <div className="md:w-3/4 px-0">
        {!isLoading && (
          <div className="relative w-full flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search clinics..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="pl-10" 
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8" 
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicDirectoryHeader;
