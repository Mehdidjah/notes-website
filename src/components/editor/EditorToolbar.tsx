/**
 * CollaboNotes - Editor Toolbar Component
 * Author: Mehdi
 */

import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface EditorToolbarProps {
  editor: Editor | null;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const buttons = [
    {
      icon: Undo,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
    },
    {
      icon: Redo,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
    },
    { type: 'separator' },
    {
      icon: Bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      icon: Italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      icon: Underline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    },
    { type: 'separator' },
    {
      icon: Heading1,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: Heading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    { type: 'separator' },
    {
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    { type: 'separator' },
    {
      icon: LinkIcon,
      onClick: () => {
        const url = window.prompt('Enter URL:');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: editor.isActive('link'),
    },
  ];

  return (
    <div className="flex items-center gap-1 p-2 bg-muted/30 border-b border-border">
      {buttons.map((button, index) =>
        button.type === 'separator' ? (
          <Separator key={index} orientation="vertical" className="h-6 mx-1" />
        ) : (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={button.onClick}
            disabled={button.disabled}
            className={button.isActive ? 'bg-muted' : ''}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        )
      )}
    </div>
  );
};
