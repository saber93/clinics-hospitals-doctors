
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Search, Edit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface EntityListProps {
  entityType: 'clinics' | 'doctors' | 'hospitals';
  title: string;
  onEditTheme: (id: string) => void;
}

const EntityList: React.FC<EntityListProps> = ({ entityType, title, onEditTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: entities, isLoading } = useQuery({
    queryKey: [`${entityType}`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(entityType)
        .select('*')
        .order('name');
      
      if (error) {
        console.error(`Error fetching ${entityType}:`, error);
        throw error;
      }
      
      return data || [];
    }
  });

  const filteredEntities = entities?.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>{entityType === 'doctors' ? 'Specialty' : 'Category'}</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Theme Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-9 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredEntities?.length ? (
              // Data state
              filteredEntities.map((entity) => (
                <TableRow key={entity.id}>
                  <TableCell className="font-medium">{entity.name}</TableCell>
                  <TableCell>
                    {entityType === 'doctors' 
                      ? entity.specialty || 'N/A' 
                      : entity.category || 'N/A'}
                  </TableCell>
                  <TableCell>{entity.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      entity.theme ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {entity.theme ? 'Customized' : 'Default'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEditTheme(entity.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit Theme
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty state
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No {title.toLowerCase()} found. {searchTerm && "Try adjusting your search."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EntityList;
