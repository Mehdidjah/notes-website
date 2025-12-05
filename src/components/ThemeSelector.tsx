/**
 * CollaboNotes - Theme Selector (Accent Colors)
 * Author: Mehdi
 */

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Palette } from 'lucide-react';

const THEME_COLORS = [
  { name: 'Purple', hsl: '262 83% 58%', class: 'bg-purple-600' },
  { name: 'Blue', hsl: '217 91% 60%', class: 'bg-blue-600' },
  { name: 'Cyan', hsl: '189 94% 43%', class: 'bg-cyan-600' },
  { name: 'Green', hsl: '142 76% 36%', class: 'bg-green-600' },
  { name: 'Orange', hsl: '24 95% 53%', class: 'bg-orange-600' },
  { name: 'Pink', hsl: '330 81% 60%', class: 'bg-pink-600' },
];

export const ThemeSelector = () => {
  const handleColorChange = (hsl: string) => {
    document.documentElement.style.setProperty('--primary', hsl);
    document.documentElement.style.setProperty('--accent', hsl);
    document.documentElement.style.setProperty('--ring', hsl);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Choose Accent Color</h4>
          <div className="grid grid-cols-3 gap-2">
            {THEME_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.hsl)}
                className={`${color.class} h-12 rounded-lg transition-smooth hover:scale-105 shadow-soft`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
