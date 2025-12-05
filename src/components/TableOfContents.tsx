/**
 * CollaboNotes - Floating Table of Contents (Notion-style)
 * Author: Mehdi
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  onNavigate?: (id: string) => void;
}

export const TableOfContents = ({ content, onNavigate }: TableOfContentsProps) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3');
    
    const tocItems: TocItem[] = [];
    headings.forEach((heading, index) => {
      tocItems.push({
        id: `toc-${index}`,
        text: heading.textContent || `Heading ${index + 1}`,
        level: parseInt(heading.tagName.charAt(1)),
      });
    });
    
    setItems(tocItems);
  }, [content]);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/3 z-40 w-56"
    >
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-medium overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-muted transition-smooth"
        >
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">On this page</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-2 pt-0 space-y-0.5 max-h-64 overflow-y-auto scrollbar-thin">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveId(item.id);
                      onNavigate?.(item.id);
                    }}
                    style={{ paddingLeft: (item.level - 1) * 12 + 8 }}
                    className={`w-full text-left py-1.5 pr-2 rounded-md text-sm transition-smooth truncate
                      ${activeId === item.id 
                        ? 'text-primary font-medium bg-primary/5' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
