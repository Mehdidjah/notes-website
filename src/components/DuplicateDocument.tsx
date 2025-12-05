/**
 * CollaboNotes - Duplicate Document Feature
 * Author: Mehdi
 */

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useDocumentStore } from '@/store/documentStore';
import type { Document } from '@/types';

interface DuplicateDocumentProps {
  document: Document;
  onDuplicate?: (newDoc: Document) => void;
}

export const DuplicateDocument = ({ document, onDuplicate }: DuplicateDocumentProps) => {
  const { createDocument, updateDocument } = useDocumentStore();

  const handleDuplicate = () => {
    const newDoc = createDocument(`${document.title} (Copy)`);
    
    // Copy content to the new document
    updateDocument(newDoc.id, { content: document.content });
    
    toast.success('Document duplicated');
    onDuplicate?.(newDoc);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDuplicate}
      className="text-muted-foreground hover:text-foreground transition-smooth"
    >
      <Copy className="h-4 w-4 mr-2" />
      Duplicate
    </Button>
  );
};
