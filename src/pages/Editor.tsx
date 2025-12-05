/**
 * CollaboNotes - Editor Page with All Features
 * Author: Mehdi
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TipTapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  ArrowLeft,
  Save,
  Users,
  Clock,
  Share2,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { PresencePanel } from '@/components/editor/PresencePanel';
import { VersionHistory } from '@/components/editor/VersionHistory';
import { FontSelector } from '@/components/FontSelector';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { DocumentTemplates } from '@/components/DocumentTemplates';
import { ExportOptions } from '@/components/ExportOptions';
import { QuickNotes } from '@/components/QuickNotes';
import { HighlightColors } from '@/components/HighlightColors';
import { BookmarksPanel } from '@/components/BookmarksPanel';
import { AISuggestions } from '@/components/AISuggestions';
import { ReadingModeToggle } from '@/components/ReadingMode';
import { WordCounter } from '@/components/WordCounter';
import { FocusMode } from '@/components/FocusMode';
import { FavoriteToggle } from '@/components/FavoriteToggle';
import { DuplicateDocument } from '@/components/DuplicateDocument';
import { CoverImage } from '@/components/CoverImage';
import { EmojiPicker } from '@/components/EmojiPicker';
import { useAuthStore } from '@/store/authStore';
import { useDocumentStore } from '@/store/documentStore';
import { useEditorStore, FONT_MAP } from '@/store/editorStore';
import { useRealtimeSimulation } from '@/hooks/useRealtimeSimulation';
import { useAutosave } from '@/hooks/useAutosave';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const {
    documents,
    currentDocument,
    setCurrentDocument,
    updateDocument,
    saveStatus,
    versions,
    createVersion,
  } = useDocumentStore();

  const { fontFamily, fontSize, lineHeight, isReadingMode, isFocusMode, toggleFocusMode } = useEditorStore();

  const [title, setTitle] = useState('');
  const [showPresence, setShowPresence] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [documentEmoji, setDocumentEmoji] = useState<string | null>('📄');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cursors, presenceEvents } = useRealtimeSimulation(id || null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TipTapLink.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing something amazing...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[calc(100vh-280px)] px-12 py-8',
        style: `font-family: ${FONT_MAP[fontFamily] || FONT_MAP.system}; font-size: ${fontSize}px; line-height: ${lineHeight};`,
      },
    },
  });

  // Update editor style when font settings change
  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: 'prose prose-lg max-w-none focus:outline-none min-h-[calc(100vh-280px)] px-12 py-8',
            style: `font-family: ${FONT_MAP[fontFamily] || FONT_MAP.system}; font-size: ${fontSize}px; line-height: ${lineHeight};`,
          },
        },
      });
    }
  }, [fontFamily, fontSize, lineHeight, editor]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      const doc = documents.find(d => d.id === id);
      if (doc) {
        setCurrentDocument(doc);
        setTitle(doc.title);
        if (editor) {
          editor.commands.setContent(doc.content);
        }
      } else {
        navigate('/dashboard');
      }
    }

    requestAnimationFrame(() => setIsLoaded(true));
  }, [id, documents, isAuthenticated, navigate, setCurrentDocument, editor]);

  // Autosave
  useAutosave(id || null, editor?.getHTML() || '');

  // Save version every 30 seconds
  useEffect(() => {
    if (!id || !editor) return;

    const interval = setInterval(() => {
      const content = editor.getHTML();
      createVersion(id, content, user?.id || '1');
    }, 30000);

    return () => clearInterval(interval);
  }, [id, editor, createVersion, user]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (id) {
      updateDocument(id, { title: newTitle });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Share link copied to clipboard!');
  };

  const handleApplyTemplate = (content: string) => {
    if (editor) {
      editor.commands.setContent(content);
      toast.success('Template applied!');
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saved':
        return 'Saved';
      case 'saving':
        return 'Saving...';
      case 'unsaved':
        return 'Unsaved changes';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saved':
        return 'text-green-600';
      case 'saving':
        return 'text-amber-600';
      case 'unsaved':
        return 'text-destructive';
    }
  };

  const content = editor?.getHTML() || '';
  const currentDoc = currentDocument || { id: id || '', title, content, createdAt: new Date(), updatedAt: new Date(), ownerId: user?.id || '', collaborators: [] };

  // Reading Mode
  if (isReadingMode) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-8 py-16">
          <div className="mb-8">
            <ReadingModeToggle />
          </div>
          <h1 className="text-4xl font-bold mb-8 text-foreground">{title}</h1>
          <div 
            className="prose prose-lg max-w-none text-foreground"
            style={{ fontFamily: FONT_MAP[fontFamily], fontSize: `${fontSize}px`, lineHeight }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <FocusMode isActive={isFocusMode} onToggle={toggleFocusMode}>
        <EditorContent editor={editor} />
      </FocusMode>

      {!isFocusMode && (
        <div 
          className={`min-h-screen bg-background flex flex-col transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Cover Image */}
          {coverImage && (
            <div 
              className="h-48 w-full bg-cover bg-center transition-all duration-300"
              style={{ background: coverImage }}
            />
          )}

          {/* Top Bar */}
          <div className="h-14 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
            <div className="flex items-center gap-3 flex-1">
              <Link to="/dashboard">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Back to Dashboard</TooltipContent>
                </Tooltip>
              </Link>

              <EmojiPicker emoji={documentEmoji} onChange={setDocumentEmoji} size="sm" />

              <Input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 max-w-md bg-transparent"
                placeholder="Untitled Document"
              />

              <FavoriteToggle isFavorite={isFavorite} onChange={setIsFavorite} />
            </div>

            <div className="flex items-center gap-1">
              <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${getSaveStatusColor()} bg-muted/50`}>
                <Save className="h-3 w-3" />
                <span>{getSaveStatusText()}</span>
              </div>

              <Separator orientation="vertical" className="h-6 mx-2" />

              {/* Feature Buttons */}
              <FontSelector />
              <DocumentTemplates onSelectTemplate={handleApplyTemplate} />
              <CoverImage cover={coverImage} onChange={setCoverImage} />
              <HighlightColors />
              <ExportOptions documentTitle={title} content={content} />
              <BookmarksPanel />
              <QuickNotes />
              <KeyboardShortcuts />
              
              <Separator orientation="vertical" className="h-6 mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { setShowVersions(!showVersions); if (showPresence) setShowPresence(false); }}
                    className={`h-9 w-9 ${showVersions ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Version History</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { setShowPresence(!showPresence); if (showVersions) setShowVersions(false); }}
                    className={`h-9 w-9 ${showPresence ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Collaborators</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleShare} className="h-9 w-9">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>

              <DuplicateDocument document={currentDoc} />

              <Separator orientation="vertical" className="h-6 mx-2" />

              <ReadingModeToggle />
              <ThemeToggle />

              <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-medium ml-2">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <EditorToolbar editor={editor} />

              {/* Word Counter Bar */}
              <div className="px-4 py-2 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                <WordCounter content={content} />
                <div className="flex items-center gap-2">
                  <AISuggestions />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFocusMode}
                    className="text-xs gap-1.5"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Focus Mode
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin bg-card/50">
                <div className="max-w-4xl mx-auto">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            {/* Presence Panel */}
            {showPresence && (
              <div 
                className="border-l border-border animate-slide-in-right"
                style={{ transform: 'translateZ(0)' }}
              >
                <PresencePanel cursors={cursors} events={presenceEvents} />
              </div>
            )}

            {/* Version History Panel */}
            {showVersions && (
              <div 
                className="border-l border-border animate-slide-in-right"
                style={{ transform: 'translateZ(0)' }}
              >
                <VersionHistory versions={versions.filter(v => v.documentId === id)} />
              </div>
            )}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default Editor;
