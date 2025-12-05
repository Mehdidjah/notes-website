/**
 * Editor Store - Manages editor preferences and features
 * Author: Mehdi
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamily = 'system' | 'serif' | 'mono' | 'inter' | 'georgia' | 'merriweather';

interface Bookmark {
  id: string;
  position: number;
  label: string;
  createdAt: Date;
}

interface EditorState {
  // Font settings
  fontFamily: FontFamily;
  fontSize: number;
  lineHeight: number;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  
  // Writing stats
  wordCount: number;
  characterCount: number;
  readingTime: number;
  updateStats: (text: string) => void;
  
  // Focus & Zen modes
  isFocusMode: boolean;
  isZenMode: boolean;
  toggleFocusMode: () => void;
  toggleZenMode: () => void;
  
  // Reading mode
  isReadingMode: boolean;
  toggleReadingMode: () => void;
  
  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (position: number, label: string) => void;
  removeBookmark: (id: string) => void;
  
  // Highlighter
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  
  // Quick notes
  quickNotes: string;
  setQuickNotes: (notes: string) => void;
  
  // AI suggestions (mock)
  aiSuggestions: string[];
  generateSuggestions: (context: string) => void;
  clearSuggestions: () => void;
}

const FONT_MAP: Record<FontFamily, string> = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"SF Mono", "Fira Code", "Consolas", monospace',
  inter: '"Inter", -apple-system, sans-serif',
  georgia: 'Georgia, serif',
  merriweather: '"Merriweather", Georgia, serif',
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      // Font settings
      fontFamily: 'system',
      fontSize: 16,
      lineHeight: 1.75,
      setFontFamily: (font) => set({ fontFamily: font }),
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
      
      // Writing stats
      wordCount: 0,
      characterCount: 0,
      readingTime: 0,
      updateStats: (text) => {
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;
        const minutes = Math.ceil(words / 200);
        set({ wordCount: words, characterCount: chars, readingTime: minutes });
      },
      
      // Focus & Zen modes
      isFocusMode: false,
      isZenMode: false,
      toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
      toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),
      
      // Reading mode
      isReadingMode: false,
      toggleReadingMode: () => set((state) => ({ isReadingMode: !state.isReadingMode })),
      
      // Bookmarks
      bookmarks: [],
      addBookmark: (position, label) => {
        const bookmark: Bookmark = {
          id: crypto.randomUUID(),
          position,
          label,
          createdAt: new Date(),
        };
        set((state) => ({ bookmarks: [...state.bookmarks, bookmark] }));
      },
      removeBookmark: (id) => {
        set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) }));
      },
      
      // Highlighter
      highlightColor: '#fef08a',
      setHighlightColor: (color) => set({ highlightColor: color }),
      
      // Quick notes
      quickNotes: '',
      setQuickNotes: (notes) => set({ quickNotes: notes }),
      
      // AI suggestions (mock)
      aiSuggestions: [],
      generateSuggestions: (context) => {
        const mockSuggestions = [
          'Consider adding more context here...',
          'This could be expanded with examples.',
          'Try using more active voice.',
          'Add a transition sentence.',
          'Consider breaking this into smaller paragraphs.',
        ];
        const randomSuggestions = mockSuggestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        set({ aiSuggestions: randomSuggestions });
      },
      clearSuggestions: () => set({ aiSuggestions: [] }),
    }),
    {
      name: 'editor-preferences',
      partialize: (state) => ({
        fontFamily: state.fontFamily,
        fontSize: state.fontSize,
        lineHeight: state.lineHeight,
        highlightColor: state.highlightColor,
        quickNotes: state.quickNotes,
      }),
    }
  )
);

export { FONT_MAP };
