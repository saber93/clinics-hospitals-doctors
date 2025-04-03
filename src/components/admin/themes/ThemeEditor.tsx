
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpecialtyTheme } from '@/utils/clinics/specialtyThemes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lucideIcons } from '@/utils/clinics/iconOptions';
import ColorPicker from './ColorPicker';
import * as LucideIcons from 'lucide-react';

interface ThemeEditorProps {
  theme: SpecialtyTheme;
  onChange: (updatedTheme: SpecialtyTheme) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onChange }) => {
  const handleColorChange = (field: keyof SpecialtyTheme, value: string) => {
    onChange({
      ...theme,
      [field]: value
    });
  };

  // Helper function to render icon in dropdown item
  const getIconComponent = (iconName: string) => {
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[formattedIconName];
    return IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : null;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Colors Section */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>Customize the color scheme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primary Color */}
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="mt-1">
              <ColorPicker 
                value={theme.primaryColor}
                onChange={(value) => handleColorChange('primaryColor', value)}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Use Tailwind color names (e.g., 'blue-500', 'emerald-400')
            </p>
          </div>
          
          {/* Secondary Color */}
          <div>
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="mt-1">
              <ColorPicker 
                value={theme.secondaryColor}
                onChange={(value) => handleColorChange('secondaryColor', value)}
              />
            </div>
          </div>
          
          {/* Accent Color */}
          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="mt-1">
              <ColorPicker 
                value={theme.accentColor}
                onChange={(value) => handleColorChange('accentColor', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Style Section */}
      <Card>
        <CardHeader>
          <CardTitle>Style</CardTitle>
          <CardDescription>Customize visual appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Gradient Style */}
          <div>
            <Label htmlFor="gradientStyle">Gradient Style</Label>
            <Input
              id="gradientStyle"
              value={theme.gradientStyle}
              onChange={(e) => handleColorChange('gradientStyle', e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use Tailwind gradient classes (e.g., 'bg-gradient-to-r from-blue-500 to-teal-400')
            </p>
          </div>
          
          {/* Card Style */}
          <div>
            <Label htmlFor="cardStyle">Card Style</Label>
            <Input
              id="cardStyle"
              value={theme.cardStyle}
              onChange={(e) => handleColorChange('cardStyle', e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use Tailwind border and background classes
            </p>
          </div>
          
          {/* Icon */}
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Select 
              value={theme.icon}
              onValueChange={(value) => handleColorChange('icon', value)}
            >
              <SelectTrigger id="icon" className="mt-1">
                <SelectValue>
                  {theme.icon && (
                    <div className="flex items-center">
                      {getIconComponent(theme.icon)}
                      <span>{theme.icon}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {lucideIcons.map((iconName) => (
                  <SelectItem 
                    key={iconName.toLowerCase()} 
                    value={iconName.toLowerCase()}
                    className="flex items-center"
                  >
                    <div className="flex items-center">
                      {getIconComponent(iconName.toLowerCase())}
                      <span>{iconName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Select an icon for your theme
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
