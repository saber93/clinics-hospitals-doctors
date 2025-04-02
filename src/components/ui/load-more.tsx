
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export interface LoadMoreProps {
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
  loadingText?: string;
  buttonText?: string;
  className?: string;
}

export function LoadMore({
  hasMore,
  onLoadMore,
  isLoading = false,
  loadingText = 'Loading...',
  buttonText = 'Load More',
  className = '',
}: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <Button 
        onClick={onLoadMore}
        className="px-6 gap-2"
        variant="default"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? loadingText : buttonText}
        {!isLoading && <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
}
