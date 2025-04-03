
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceFormActionsProps {
  isEditMode: boolean;
  isPending: boolean;
}

export default function ServiceFormActions({ isEditMode, isPending }: ServiceFormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate('/admin/services')}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isPending}
      >
        {isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isEditMode ? 'Update Service' : 'Create Service'}
      </Button>
    </div>
  );
}
