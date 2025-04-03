
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const BookingsTabs: React.FC<BookingsTabsProps> = ({
  activeTab,
  onTabChange,
  children,
  className
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={cn(className)}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Filter className="h-4 w-4 mr-2" />
          Filtered by {activeTab === 'all' ? 'all statuses' : activeTab}
        </div>
      </div>
      
      <TabsContent value={activeTab}>
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default BookingsTabs;
