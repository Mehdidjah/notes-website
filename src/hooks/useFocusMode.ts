/**
 * CollaboNotes - Focus Mode Hook
 * Author: Mehdi
 */

import { useState, useEffect } from 'react';

export const useFocusMode = () => {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        setIsFocusMode((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleFocusMode = () => setIsFocusMode((prev) => !prev);

  return { isFocusMode, toggleFocusMode };
};
