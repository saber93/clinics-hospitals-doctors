
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogFormActionsProps {
  isEditMode: boolean;
  isPending: boolean;
}

export default function BlogFormActions({ isEditMode, isPending }: BlogFormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="flex justify-between px-0">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate('/admin/blogs')}
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
        {isEditMode ? 'Update Blog' : 'Create Blog'}
      </Button>
    </CardFooter>
  );
}
