/**
 * Writing Stats Component
 * Author: Mehdi
 */

import { Clock, FileText, Hash } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

export const WritingStats = () => {
  const { wordCount, characterCount, readingTime } = useEditorStore();

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <FileText className="h-3.5 w-3.5" />
        <span>{wordCount.toLocaleString()} words</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Hash className="h-3.5 w-3.5" />
        <span>{characterCount.toLocaleString()} chars</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
};
