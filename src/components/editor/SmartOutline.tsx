/**
 * CollaboNotes - Smart Document Outline
 * Author: Mehdi
 */

import { List } from 'lucide-react';
import { motion } from 'framer-motion';

interface OutlineItem {
  level: number;
  text: string;
  id: string;
}

export const SmartOutline = () => {
  // Mock outline data
  const outlineItems: OutlineItem[] = [
    { level: 1, text: 'Introduction', id: 'intro' },
    { level: 2, text: 'Background', id: 'background' },
    { level: 2, text: 'Methodology', id: 'method' },
    { level: 1, text: 'Main Content', id: 'main' },
    { level: 2, text: 'Analysis', id: 'analysis' },
    { level: 3, text: 'Data Review', id: 'data' },
    { level: 1, text: 'Conclusion', id: 'conclusion' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 border-l border-border bg-card p-4 overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Outline</h3>
      </div>

      <div className="space-y-1">
        {outlineItems.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left py-1.5 px-2 rounded-md text-sm transition-smooth hover:bg-muted ${
              item.level === 1 ? 'font-semibold' : item.level === 2 ? 'pl-4' : 'pl-6'
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
