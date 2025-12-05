/**
 * CollaboNotes - Document Emoji Icon Picker (Notion-style)
 * Author: Mehdi
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const EMOJI_CATEGORIES = {
  'Recent': ['📝', '📄', '📋', '✏️', '📌', '🎯', '💡', '🚀'],
  'Documents': ['📝', '📄', '📋', '📑', '📓', '📕', '📗', '📘', '📙', '📚', '📖', '🗂️'],
  'Work': ['💼', '🎯', '📊', '📈', '💡', '⚡', '🔧', '⚙️', '🛠️', '📐', '✅', '❌'],
  'Nature': ['🌟', '⭐', '🌙', '☀️', '🌈', '🔥', '💧', '🌿', '🌸', '🍀', '🌻', '🌺'],
  'Symbols': ['❤️', '💜', '💙', '💚', '💛', '🧡', '🤍', '🖤', '💯', '✨', '💫', '🎉'],
};

interface EmojiPickerProps {
  emoji?: string | null;
  onChange?: (emoji: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const EmojiPicker = ({ emoji, onChange, size = 'lg' }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'text-2xl h-10 w-10',
    md: 'text-4xl h-14 w-14',
    lg: 'text-6xl h-20 w-20',
  };

  const handleSelect = (selectedEmoji: string) => {
    onChange?.(selectedEmoji);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onChange?.(null);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {emoji ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${sizeClasses[size]} flex items-center justify-center rounded-xl hover:bg-muted transition-smooth`}
          >
            {emoji}
          </motion.button>
        ) : (
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Smile className="h-4 w-4 mr-2" />
            Add icon
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium">Pick an icon</span>
          {emoji && (
            <Button variant="ghost" size="sm" onClick={handleRemove} className="h-7 text-xs">
              <X className="h-3 w-3 mr-1" />
              Remove
            </Button>
          )}
        </div>
        <ScrollArea className="h-64">
          <div className="p-3 space-y-4">
            {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
              <div key={category}>
                <p className="text-xs font-medium text-muted-foreground mb-2">{category}</p>
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((e, i) => (
                    <motion.button
                      key={`${category}-${i}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSelect(e)}
                      className="p-1.5 text-xl rounded-lg hover:bg-muted transition-colors"
                    >
                      {e}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
