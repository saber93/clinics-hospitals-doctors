
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ServiceHeaderProps {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export default function ServiceHeader({ scrollPrev, scrollNext }: ServiceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Our Services</h2>
        <p className="text-gray-600 max-w-2xl">
          We offer a comprehensive range of marketing services tailored to the unique needs of medical practitioners and healthcare facilities.
        </p>
      </div>
      <div className="flex space-x-2 mt-4 md:mt-0">
        <Button onClick={scrollPrev} variant="outline" size="icon">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button onClick={scrollNext} variant="outline" size="icon">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
