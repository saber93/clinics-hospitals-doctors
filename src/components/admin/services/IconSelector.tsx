
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
  
  // Filter icons based on search term
  const filteredIcons = availableIcons.filter(
    (name) => name.toLowerCase().includes(iconSearchTerm.toLowerCase())
  );

  // Get icon component from name
  const getIconComponent = (iconName: string) => {
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[formattedIconName];
    return IconComponent ? <IconComponent className="h-5 w-5 mr-2" /> : null;
  };

  // Format selected value display
  const formatSelectedValue = () => {
    if (!value) return "Select an icon";
    
    return (
      <div className="flex items-center">
        {getIconComponent(value)}
        <span>{value}</span>
      </div>
    );
  };

  return (
    <Popover>
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
          <div className="p-1">
            {filteredIcons.map((iconName) => {
              const formattedName = iconName.toLowerCase();
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  className="w-full justify-start h-9 px-2 mb-1 text-left"
                  onClick={() => {
                    onChange(formattedName);
                    setIconSearchTerm('');
                  }}
                >
                  <div className="flex items-center">
                    {getIconComponent(formattedName)}
                    <span className="text-sm">{iconName}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
