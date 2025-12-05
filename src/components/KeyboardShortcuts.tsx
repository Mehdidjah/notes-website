/**
 * Keyboard Shortcuts Panel
 * Author: Mehdi
 */

import { Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const shortcuts = [
  { category: 'General', items: [
    { keys: ['⌘', 'K'], description: 'Open command palette' },
    { keys: ['⌘', 'S'], description: 'Save document' },
    { keys: ['⌘', 'Shift', 'F'], description: 'Toggle focus mode' },
    { keys: ['⌘', 'Shift', 'Z'], description: 'Toggle zen mode' },
  ]},
  { category: 'Formatting', items: [
    { keys: ['⌘', 'B'], description: 'Bold text' },
    { keys: ['⌘', 'I'], description: 'Italic text' },
    { keys: ['⌘', 'U'], description: 'Underline text' },
    { keys: ['⌘', 'Shift', 'H'], description: 'Highlight text' },
  ]},
  { category: 'Structure', items: [
    { keys: ['⌘', '1'], description: 'Heading 1' },
    { keys: ['⌘', '2'], description: 'Heading 2' },
    { keys: ['⌘', 'Shift', '8'], description: 'Bullet list' },
    { keys: ['⌘', 'Shift', '7'], description: 'Numbered list' },
  ]},
  { category: 'Navigation', items: [
    { keys: ['⌘', '↑'], description: 'Go to start' },
    { keys: ['⌘', '↓'], description: 'Go to end' },
    { keys: ['⌘', 'G'], description: 'Go to bookmark' },
  ]},
];

export const KeyboardShortcuts = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="font-semibold text-primary mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, i) => (
                        <kbd
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-background border border-border rounded shadow-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
