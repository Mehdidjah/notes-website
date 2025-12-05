/**
 * Bookmarks Panel Component
 * Author: Mehdi
 */

import { Bookmark, BookmarkPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEditorStore } from '@/store/editorStore';
import { formatDistanceToNow } from 'date-fns';

interface BookmarksPanelProps {
  onJumpTo?: (position: number) => void;
  onAddBookmark?: () => void;
}

export const BookmarksPanel = ({ onJumpTo, onAddBookmark }: BookmarksPanelProps) => {
  const { bookmarks, removeBookmark } = useEditorStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 relative">
          <Bookmark className="h-4 w-4" />
          <span className="hidden sm:inline">Bookmarks</span>
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              Bookmarks
            </span>
            {onAddBookmark && (
              <Button variant="ghost" size="sm" onClick={onAddBookmark}>
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {bookmarks.length === 0 ? (
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No bookmarks yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add bookmarks to quickly jump to important sections
              </p>
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth group"
              >
                <button
                  onClick={() => onJumpTo?.(bookmark.position)}
                  className="flex-1 text-left"
                >
                  <p className="font-medium text-sm">{bookmark.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                  </p>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
