
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as LucideIcons from 'lucide-react';

interface IconSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
  availableIcons: string[];
}

export function IconSelector({ value, onChange, availableIcons }: IconSelectorProps) {
  const [iconSearchTerm, setIconSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  
  // Filter icons based on search term
  const filteredIcons = availableIcons.filter(
    (name) => name.toLowerCase().includes(iconSearchTerm.toLowerCase())
  );

  // Get icon component from name
  const getIconComponent = (iconName: string) => {
    // Format icon name to PascalCase for Lucide
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[formattedIconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  // Format selected value display
  const formatSelectedValue = () => {
    if (!value) return "Select an icon";
    
    return (
      <div className="flex items-center">
        {getIconComponent(value)}
        <span className="ml-2">{value}</span>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          role="combobox"
        >
          <div className="flex items-center justify-start w-full">
            {formatSelectedValue()}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-2 border-b">
          <div className="flex items-center gap-2 mb-1">
            <Search className="h-4 w-4 opacity-50 flex-shrink-0" />
            <Input
              placeholder="Search icons..."
              value={iconSearchTerm}
              onChange={(e) => setIconSearchTerm(e.target.value)}
              className="h-9 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-2 gap-1 p-2">
            {filteredIcons.length === 0 ? (
              <div className="col-span-2 p-4 text-center text-muted-foreground">
                No icons found
              </div>
            ) : (
              filteredIcons.map((iconName) => {
                return (
                  <Button
                    key={iconName}
                    variant="ghost"
                    className="flex items-center justify-start h-10 px-2 py-1 text-left"
                    onClick={() => {
                      onChange(iconName.toLowerCase());
                      setIconSearchTerm('');
                      setOpen(false);
                    }}
                  >
                    <div className="mr-2">
                      {getIconComponent(iconName)}
                    </div>
                    <span className="text-sm truncate">{iconName}</span>
                  </Button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
