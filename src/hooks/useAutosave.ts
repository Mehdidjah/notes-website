/**
 * CollaboNotes - Autosave Hook
 * Author: Mehdi
 */

import { useEffect, useRef } from 'react';
import { useDocumentStore } from '@/store/documentStore';

export const useAutosave = (
  documentId: string | null,
  content: string,
  delay: number = 3000
) => {
  const { saveDocument } = useDocumentStore();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!documentId) return;

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for autosave
    timeoutRef.current = setTimeout(() => {
      saveDocument(documentId, content);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, documentId, delay, saveDocument]);
};
