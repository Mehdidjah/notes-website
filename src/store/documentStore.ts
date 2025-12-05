/**
 * CollaboNotes - Document Store
 * Author: Mehdi
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document, DocumentVersion, SaveStatus } from '@/types';
import { MOCK_DOCUMENTS } from '@/mocks/data';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  versions: DocumentVersion[];
  saveStatus: SaveStatus;
  
  loadDocuments: () => void;
  createDocument: (title: string) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (doc: Document | null) => void;
  saveDocument: (id: string, content: string) => Promise<void>;
  createVersion: (documentId: string, content: string, userId: string) => void;
  restoreVersion: (versionId: string) => void;
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: [],
      currentDocument: null,
      versions: [],
      saveStatus: 'saved',

      loadDocuments: () => {
        const stored = get().documents;
        if (stored.length === 0) {
          set({ documents: MOCK_DOCUMENTS });
        }
      },

      createDocument: (title: string) => {
        const newDoc: Document = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          content: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: '1',
          collaborators: ['1'],
        };
        
        set((state) => ({
          documents: [newDoc, ...state.documents],
        }));
        
        return newDoc;
      },

      updateDocument: (id: string, updates: Partial<Document>) => {
        set((state) => ({
          documents: state.documents.map(doc =>
            doc.id === id
              ? { ...doc, ...updates, updatedAt: new Date() }
              : doc
          ),
        }));
      },

      deleteDocument: (id: string) => {
        set((state) => ({
          documents: state.documents.filter(doc => doc.id !== id),
        }));
      },

      setCurrentDocument: (doc: Document | null) => {
        set({ currentDocument: doc });
      },

      saveDocument: async (id: string, content: string) => {
        set({ saveStatus: 'saving' });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        get().updateDocument(id, { content });
        
        set({ saveStatus: 'saved' });
      },

      createVersion: (documentId: string, content: string, userId: string) => {
        const newVersion: DocumentVersion = {
          id: Math.random().toString(36).substr(2, 9),
          documentId,
          content,
          createdAt: new Date(),
          createdBy: userId,
        };
        
        set((state) => ({
          versions: [newVersion, ...state.versions],
        }));
      },

      restoreVersion: (versionId: string) => {
        const version = get().versions.find(v => v.id === versionId);
        if (version && get().currentDocument) {
          get().updateDocument(get().currentDocument!.id, {
            content: version.content,
          });
          set({ currentDocument: { ...get().currentDocument!, content: version.content } });
        }
      },
    }),
    {
      name: 'collabonotes-documents',
    }
  )
);
