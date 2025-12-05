/**
 * CollaboNotes - Word Counter with Live Updates
 * Author: Mehdi
 */

import { motion } from 'framer-motion';
import { Hash, Clock, FileText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WordCounterProps {
  content: string;
  showReadingTime?: boolean;
}

export const WordCounter = ({ content, showReadingTime = true }: WordCounterProps) => {
  // Strip HTML tags for accurate counting
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  
  const wordCount = textContent ? textContent.split(/\s+/).filter(word => word.length > 0).length : 0;
  const charCount = textContent.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-4 text-xs text-muted-foreground"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 hover:text-foreground transition-smooth cursor-default">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-medium tabular-nums">{wordCount.toLocaleString()}</span>
            <span>words</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Word count</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 hover:text-foreground transition-smooth cursor-default">
            <Hash className="h-3.5 w-3.5" />
            <span className="font-medium tabular-nums">{charCount.toLocaleString()}</span>
            <span>chars</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Character count</p>
        </TooltipContent>
      </Tooltip>

      {showReadingTime && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-smooth cursor-default">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium tabular-nums">{readingTime}</span>
              <span>min read</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Estimated reading time</p>
          </TooltipContent>
        </Tooltip>
      )}
    </motion.div>
  );
};
