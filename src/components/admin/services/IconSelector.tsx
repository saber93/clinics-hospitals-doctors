
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          role="combobox"
        >
          <div className="flex items-center">
            {value && (
              <span className="mr-2 flex items-center gap-2">
                {value}
              </span>
            )}
            {!value && "Select an icon"}
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
        <ScrollArea className="h-[300px] p-2">
          <div className="grid grid-cols-4 gap-2">
            {filteredIcons.map((iconName) => (
              <Button
                key={iconName}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center justify-center h-20 py-2 gap-1 text-xs"
                onClick={() => {
                  onChange(iconName);
                  setIconSearchTerm('');
                }}
              >
                <span className="text-xs text-center truncate max-w-full">{iconName}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
