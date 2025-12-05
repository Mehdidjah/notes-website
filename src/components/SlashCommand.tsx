/**
 * CollaboNotes - Slash Command Menu (Notion-style)
 * Author: Mehdi
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Image,
  Table,
  AlertCircle,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  action: string;
}

const COMMANDS: CommandItem[] = [
  { icon: <Type className="h-4 w-4" />, label: 'Text', description: 'Plain text paragraph', action: 'paragraph' },
  { icon: <Heading1 className="h-4 w-4" />, label: 'Heading 1', description: 'Large section heading', action: 'h1' },
  { icon: <Heading2 className="h-4 w-4" />, label: 'Heading 2', description: 'Medium section heading', action: 'h2' },
  { icon: <Heading3 className="h-4 w-4" />, label: 'Heading 3', description: 'Small section heading', action: 'h3' },
  { icon: <List className="h-4 w-4" />, label: 'Bullet List', description: 'Unordered list', action: 'bulletList' },
  { icon: <ListOrdered className="h-4 w-4" />, label: 'Numbered List', description: 'Ordered list', action: 'orderedList' },
  { icon: <CheckSquare className="h-4 w-4" />, label: 'To-do List', description: 'Track tasks', action: 'taskList' },
  { icon: <Quote className="h-4 w-4" />, label: 'Quote', description: 'Highlight a quote', action: 'blockquote' },
  { icon: <Code className="h-4 w-4" />, label: 'Code Block', description: 'Capture a code snippet', action: 'codeBlock' },
  { icon: <Minus className="h-4 w-4" />, label: 'Divider', description: 'Visual divider', action: 'horizontalRule' },
  { icon: <AlertCircle className="h-4 w-4" />, label: 'Callout', description: 'Highlight important info', action: 'callout' },
  { icon: <Table className="h-4 w-4" />, label: 'Table', description: 'Add a table', action: 'table' },
];

interface SlashCommandProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onSelect: (action: string) => void;
  onClose: () => void;
  filter?: string;
}

export const SlashCommand = ({ isOpen, position, onSelect, onClose, filter = '' }: SlashCommandProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(filter.toLowerCase()) ||
      cmd.description.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onSelect(filteredCommands[selectedIndex].action);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onSelect, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 w-72 bg-popover border border-border rounded-xl shadow-large overflow-hidden"
          style={{ top: position.top, left: position.left }}
        >
          <div className="p-2 border-b border-border">
            <p className="text-xs text-muted-foreground px-2">Basic blocks</p>
          </div>
          <ScrollArea className="max-h-80">
            <div className="p-1">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No commands found
                </div>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.action}
                    onClick={() => onSelect(cmd.action)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-smooth text-left
                      ${index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >
                    <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-primary/20' : 'bg-muted'}`}>
                      {cmd.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{cmd.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{cmd.description}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
