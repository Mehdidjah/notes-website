/**
 * Highlight Colors Component
 * Author: Mehdi
 */

import { Highlighter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEditorStore } from '@/store/editorStore';

const highlightColors = [
  { name: 'Yellow', value: '#fef08a' },
  { name: 'Green', value: '#bbf7d0' },
  { name: 'Blue', value: '#bfdbfe' },
  { name: 'Pink', value: '#fbcfe8' },
  { name: 'Purple', value: '#ddd6fe' },
  { name: 'Orange', value: '#fed7aa' },
  { name: 'Cyan', value: '#a5f3fc' },
  { name: 'Red', value: '#fecaca' },
];

export const HighlightColors = () => {
  const { highlightColor, setHighlightColor } = useEditorStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Highlighter className="h-4 w-4" style={{ color: highlightColor }} />
          <span className="hidden sm:inline">Highlight</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <p className="text-sm font-medium mb-3">Choose highlight color</p>
        <div className="grid grid-cols-4 gap-2">
          {highlightColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setHighlightColor(color.value)}
              className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
              style={{
                backgroundColor: color.value,
                borderColor: highlightColor === color.value ? 'hsl(var(--primary))' : 'transparent',
              }}
              title={color.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
