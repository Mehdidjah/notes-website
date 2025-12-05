/**
 * Font Selector Component
 * Author: Mehdi
 */

import { Type, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { useEditorStore, FontFamily, FONT_MAP } from '@/store/editorStore';

const fonts: { value: FontFamily; label: string; preview: string }[] = [
  { value: 'system', label: 'System Default', preview: 'Aa' },
  { value: 'serif', label: 'Serif', preview: 'Aa' },
  { value: 'mono', label: 'Monospace', preview: 'Aa' },
  { value: 'inter', label: 'Inter', preview: 'Aa' },
  { value: 'georgia', label: 'Georgia', preview: 'Aa' },
  { value: 'merriweather', label: 'Merriweather', preview: 'Aa' },
];

export const FontSelector = () => {
  const { fontFamily, fontSize, lineHeight, setFontFamily, setFontSize, setLineHeight } = useEditorStore();

  const currentFont = fonts.find((f) => f.value === fontFamily) || fonts[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Type className="h-4 w-4" />
          <span className="hidden sm:inline">{currentFont.label}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Font Family</DropdownMenuLabel>
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() => setFontFamily(font.value)}
            className="flex items-center justify-between"
          >
            <span style={{ fontFamily: FONT_MAP[font.value] }}>{font.label}</span>
            {fontFamily === font.value && (
              <span className="text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <div className="p-3 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Font Size</span>
              <span className="font-medium">{fontSize}px</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={([v]) => setFontSize(v)}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Line Height</span>
              <span className="font-medium">{lineHeight.toFixed(2)}</span>
            </div>
            <Slider
              value={[lineHeight * 100]}
              onValueChange={([v]) => setLineHeight(v / 100)}
              min={120}
              max={200}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
