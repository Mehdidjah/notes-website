/**
 * CollaboNotes - Presence Panel Component
 * Author: Mehdi
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity } from 'lucide-react';
import { Cursor, PresenceEvent } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface PresencePanelProps {
  cursors: Cursor[];
  events: PresenceEvent[];
}

export const PresencePanel = ({ cursors, events }: PresencePanelProps) => {
  const getEventIcon = (type: PresenceEvent['type']) => {
    return <Activity className="h-4 w-4" />;
  };

  const getEventText = (event: PresenceEvent) => {
    switch (event.type) {
      case 'joined':
        return 'joined the document';
      case 'left':
        return 'left the document';
      case 'typing':
        return 'is typing...';
      case 'idle':
        return 'is idle';
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Online Users */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Online ({cursors.length + 1})</h3>
        </div>
        
        <div className="space-y-2">
          {/* Current user (you) */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: '#00D9FF' }}
            >
              M
            </div>
            <span className="font-medium">You</span>
          </div>

          {/* Other users */}
          {cursors.map((cursor) => (
            <div key={cursor.userId} className="flex items-center gap-3 p-2 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: cursor.color }}
              >
                {cursor.userName.charAt(0).toUpperCase()}
              </div>
              <span>{cursor.userName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {events.map((event, index) => (
              <motion.div
                key={`${event.userId}-${event.timestamp.getTime()}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-start gap-2 text-sm"
              >
                {getEventIcon(event.type)}
                <div className="flex-1">
                  <span className="font-medium">{event.userName}</span>{' '}
                  <span className="text-muted-foreground">{getEventText(event)}</span>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};
