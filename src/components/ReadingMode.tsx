/**
 * Reading Mode Toggle Component
 * Author: Mehdi
 */

import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ReadingModeToggle = () => {
  const { isReadingMode, toggleReadingMode } = useEditorStore();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isReadingMode ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleReadingMode}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isReadingMode ? 'Exit Reading' : 'Reading Mode'}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle distraction-free reading mode</p>
      </TooltipContent>
    </Tooltip>
  );
};
