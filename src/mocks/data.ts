/**
 * CollaboNotes - Mock Data
 * Author: Mehdi
 */

import { User, Document } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Mehdi',
    email: 'mehdi@collabonotes.app',
    color: '#00D9FF',
  },
  {
    id: '2',
    name: 'Aymen',
    email: 'aymen@collabonotes.app',
    color: '#FF6B6B',
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@collabonotes.app',
    color: '#4ECDC4',
  },
  {
    id: '4',
    name: 'Alex',
    email: 'alex@collabonotes.app',
    color: '#FFD93D',
  },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Product Requirements Document',
    content: '<h1>Product Requirements</h1><p>This document outlines the core requirements...</p>',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    ownerId: '1',
    collaborators: ['1', '2'],
  },
  {
    id: '2',
    title: 'Meeting Notes - Q1 2024',
    content: '<h1>Q1 Planning Meeting</h1><ul><li>Budget review</li><li>Timeline discussion</li></ul>',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    ownerId: '1',
    collaborators: ['1', '2', '3'],
  },
  {
    id: '3',
    title: 'Architecture Design',
    content: '<h1>System Architecture</h1><p>Overview of the system components...</p>',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    ownerId: '1',
    collaborators: ['1'],
  },
];

export const CURSOR_COLORS = [
  '#00D9FF',
  '#FF6B6B',
  '#4ECDC4',
  '#FFD93D',
  '#A8E6CF',
  '#FF8B94',
  '#C7CEEA',
];
