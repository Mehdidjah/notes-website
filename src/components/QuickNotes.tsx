/**
 * Quick Notes / Scratchpad Component
 * Author: Mehdi
 */

import { StickyNote, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEditorStore } from '@/store/editorStore';

export const QuickNotes = () => {
  const { quickNotes, setQuickNotes } = useEditorStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 relative">
          <StickyNote className="h-4 w-4" />
          <span className="hidden sm:inline">Notes</span>
          {quickNotes && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            Quick Notes
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Jot down quick thoughts, reminders, or ideas while writing.
          </p>
          <Textarea
            value={quickNotes}
            onChange={(e) => setQuickNotes(e.target.value)}
            placeholder="Type your notes here..."
            className="min-h-[300px] resize-none"
          />
          {quickNotes && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuickNotes('')}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Clear notes
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
