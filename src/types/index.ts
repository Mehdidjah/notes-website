/**
 * CollaboNotes - Type Definitions
 * Author: Mehdi
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  collaborators: string[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Cursor {
  userId: string;
  userName: string;
  color: string;
  position: number;
}

export interface PresenceEvent {
  userId: string;
  userName: string;
  type: 'joined' | 'left' | 'typing' | 'idle';
  timestamp: Date;
}

export type SaveStatus = 'saved' | 'saving' | 'unsaved';
