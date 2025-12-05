/**
 * CollaboNotes - Realtime Simulation Hook
 * Author: Mehdi
 * 
 * Simulates realtime collaboration with fake cursors and presence events
 */

import { useState, useEffect, useCallback } from 'react';
import { Cursor, PresenceEvent } from '@/types';
import { MOCK_USERS, CURSOR_COLORS } from '@/mocks/data';

export const useRealtimeSimulation = (documentId: string | null) => {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [presenceEvents, setPresenceEvents] = useState<PresenceEvent[]>([]);

  const addPresenceEvent = useCallback((event: PresenceEvent) => {
    setPresenceEvents(prev => [event, ...prev].slice(0, 5));
  }, []);

  useEffect(() => {
    if (!documentId) return;

    // Simulate random collaborators joining
    const joinInterval = setInterval(() => {
      if (Math.random() > 0.7 && cursors.length < 3) {
        const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
        const alreadyPresent = cursors.some(c => c.userId === randomUser.id);
        
        if (!alreadyPresent) {
          const newCursor: Cursor = {
            userId: randomUser.id,
            userName: randomUser.name,
            color: randomUser.color,
            position: Math.floor(Math.random() * 1000),
          };
          
          setCursors(prev => [...prev, newCursor]);
          
          addPresenceEvent({
            userId: randomUser.id,
            userName: randomUser.name,
            type: 'joined',
            timestamp: new Date(),
          });
        }
      }
    }, 8000);

    // Simulate cursor movements
    const cursorInterval = setInterval(() => {
      setCursors(prev =>
        prev.map(cursor => ({
          ...cursor,
          position: cursor.position + Math.floor(Math.random() * 50 - 25),
        }))
      );
    }, 2000);

    // Simulate typing events
    const typingInterval = setInterval(() => {
      if (cursors.length > 0 && Math.random() > 0.5) {
        const randomCursor = cursors[Math.floor(Math.random() * cursors.length)];
        addPresenceEvent({
          userId: randomCursor.userId,
          userName: randomCursor.userName,
          type: 'typing',
          timestamp: new Date(),
        });
      }
    }, 5000);

    // Simulate users leaving
    const leaveInterval = setInterval(() => {
      if (cursors.length > 0 && Math.random() > 0.8) {
        const leavingCursor = cursors[Math.floor(Math.random() * cursors.length)];
        
        setCursors(prev => prev.filter(c => c.userId !== leavingCursor.userId));
        
        addPresenceEvent({
          userId: leavingCursor.userId,
          userName: leavingCursor.userName,
          type: 'left',
          timestamp: new Date(),
        });
      }
    }, 12000);

    return () => {
      clearInterval(joinInterval);
      clearInterval(cursorInterval);
      clearInterval(typingInterval);
      clearInterval(leaveInterval);
    };
  }, [documentId, cursors, addPresenceEvent]);

  return {
    cursors,
    presenceEvents,
  };
};
