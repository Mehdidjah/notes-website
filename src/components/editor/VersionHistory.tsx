/**
 * CollaboNotes - Version History Component
 * Author: Mehdi
 */

import { Clock, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocumentVersion } from '@/types';
import { formatDistanceToNow, format } from 'date-fns';
import { useDocumentStore } from '@/store/documentStore';
import { toast } from 'sonner';

interface VersionHistoryProps {
  versions: DocumentVersion[];
}

export const VersionHistory = ({ versions }: VersionHistoryProps) => {
  const { restoreVersion } = useDocumentStore();

  const handleRestore = (versionId: string) => {
    restoreVersion(versionId);
    toast.success('Version restored!');
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Version History</h3>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No version history yet</p>
          ) : (
            versions.map((version) => (
              <div
                key={version.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {format(version.createdAt, 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(version.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRestore(version.id)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="text-xs text-muted-foreground line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: version.content }}
                />
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
