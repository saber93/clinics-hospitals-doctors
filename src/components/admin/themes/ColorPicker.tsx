
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { tailwindColors } from '@/utils/tailwind-colors';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex gap-2 items-center">
          <div 
            className="w-8 h-8 rounded border cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: `rgb(var(--${value}))` || value }}
            onClick={() => setIsOpen(true)}
          />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-8 gap-1">
          {Object.entries(tailwindColors).map(([color, shades]) => (
            <React.Fragment key={color}>
              {Object.entries(shades).map(([shade, hex]) => {
                const colorName = `${color}-${shade}`;
                return (
                  <div
                    key={colorName}
                    className={cn(
                      "w-6 h-6 rounded cursor-pointer hover:scale-110 transition-transform",
                      value === colorName && "ring-2 ring-offset-2 ring-black"
                    )}
                    style={{ backgroundColor: hex }}
                    onClick={() => handleColorSelect(colorName)}
                    title={colorName}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
