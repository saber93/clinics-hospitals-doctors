
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';
import { Service } from '@/types/cms';

export default function ServicesList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
        
      if (error) {
        throw new Error(error.message);
      }
      return data as Service[];
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
        
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  });
  
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
      const { error } = await supabase
        .from('services')
        .update({ is_active: isActive })
        .eq('id', id);
        
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service status updated');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update service status: ${error.message}`);
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, isCurrentlyActive: boolean) => {
    toggleActiveMutation.mutate({ 
      id, 
      isActive: !isCurrentlyActive 
    });
  };
  
  // Dynamically display the icon if it exists in Lucide
  const IconComponent = ({ name }: { name: string }) => {
    const LucideIcon = (Icons as any)[name];
    
    if (LucideIcon) {
      return <LucideIcon className="h-5 w-5" />;
    }
    
    return <span className="text-xs text-muted-foreground">{name}</span>;
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading services: {error.toString()}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button onClick={() => navigate('/admin/services/new')}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Service
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : services && services.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="w-16 text-center">{service.display_order}</TableCell>
                <TableCell className="w-16">
                  <div className="flex justify-center">
                    <IconComponent name={service.icon_name} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>
                  <Switch
                    checked={service.is_active}
                    onCheckedChange={() => handleToggleActive(service.id, service.is_active)}
                  />
                </TableCell>
                <TableCell className="flex justify-end items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/services/${service.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No services found. Create your first service!</p>
        </div>
      )}
    </div>
  );
}
